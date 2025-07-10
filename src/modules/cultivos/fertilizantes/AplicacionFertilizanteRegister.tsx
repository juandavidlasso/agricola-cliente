import React, { useContext, useState } from 'react';
import { Button, Grid2, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ApolloError, useMutation } from '@apollo/client';
import {
    ACTUALIZAR_APLICACION_FERTILIZANTE,
    REGISTRAR_APLICACION_FERTILIZANTE,
    REGISTRAR_APLICACIONES_FERTILIZANTES
} from '@graphql/mutations';
import {
    FormDataAplicacionFertilizante,
    GetAplicacionFertilizanteRegister,
    GetAplicacionFertilizanteUpdate
} from '@interfaces/cultivos/fertilizantes/aplicacion';
import { OBTENER_APLICACIONES_FERTILIZANTES, OBTENER_APLICACIONES_FERTILIZANTES_CORTE } from '@graphql/queries';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import {
    AplicacionesFertilizantes,
    GetAplicacionesFertilizantesRegister
} from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

const schema = yup.object({
    tipo: yup.string().required('El tipo de aplicación es requerido.'),
    fecha: yup.string().required('La fecha es requerida.')
});

interface Props {
    handleClose: () => void;
    formType: 'delete' | 'update' | 'create';
    aplicacionFertilizante: AplicacionesFertilizantes;
}

const AplicacionFertilizanteRegister: React.FC<Props> = ({ handleClose, formType, aplicacionFertilizante }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const [agregarAplicacionFertilizante] = useMutation<GetAplicacionFertilizanteRegister>(REGISTRAR_APLICACION_FERTILIZANTE);
    const [agregarAplicacionesFertilizantes] = useMutation<GetAplicacionesFertilizantesRegister>(
        REGISTRAR_APLICACIONES_FERTILIZANTES
    );
    const [actualizarAplicacionFertilizante] = useMutation<GetAplicacionFertilizanteUpdate>(ACTUALIZAR_APLICACION_FERTILIZANTE);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
    } = useForm<FormDataAplicacionFertilizante>({
        resolver: yupResolver(schema),
        defaultValues: {
            fecha: formType === 'create' ? '' : dayjs(aplicacionFertilizante?.aplicacionFertilizante?.fecha).format('YYYY-MM-DD'),
            tipo: formType === 'create' ? '' : aplicacionFertilizante?.aplicacionFertilizante?.tipo
        }
    });

    const submitAplicacionHerbicida = async (dataForm: FormDataAplicacionFertilizante) => {
        setSubmitting(true);
        try {
            if (formType === 'create') {
                const { data } = await agregarAplicacionFertilizante({
                    variables: {
                        createAplicacionFertilizanteInput: {
                            tipo: dataForm.tipo,
                            fecha: dataForm.fecha
                        }
                    }
                });

                const { data: result } = await agregarAplicacionesFertilizantes({
                    variables: {
                        createAplicacionesFertilizanteInput: [
                            {
                                corte_id: id_corte,
                                apfe_id: data?.agregarAplicacionFertilizante?.id_apfe
                            }
                        ]
                    },
                    refetchQueries: [
                        { query: OBTENER_APLICACIONES_FERTILIZANTES },
                        { query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE, variables: { corteId: id_corte } }
                    ]
                });

                if (result?.agregarAplicacionesFertilizantes?.length !== 0) {
                    setMessageType('success');
                    setInfoMessage(`La aplicación se registro exitosamente.`);
                    setShowMessage(true);
                } else {
                    setMessageType('error');
                    setInfoMessage(`La aplicación ya esta aplicada en el corte seleccionado.`);
                    setShowMessage(true);
                }
                handleClose();
                return;
            } else {
                await actualizarAplicacionFertilizante({
                    variables: {
                        updateAplicacionFertilizanteInput: {
                            id_apfe: aplicacionFertilizante?.aplicacionFertilizante?.id_apfe,
                            tipo: dataForm.tipo,
                            fecha: dataForm.fecha,
                            duplicate: false // formType === 'duplicar'
                        }
                    },
                    refetchQueries: [
                        { query: OBTENER_APLICACIONES_FERTILIZANTES },
                        { query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE, variables: { corteId: id_corte } }
                    ]
                });
            }

            setMessageType('success');
            setInfoMessage('La aplicación se actualizo exitosamente.');
            setShowMessage(true);
            handleClose();
        } catch (error) {
            if (error instanceof ApolloError) {
                setMessageType('error');
                setInfoMessage(error.message.replace('Error:', ''));
                setShowMessage(true);
                setSubmitting(false);
                return;
            }
            setMessageType('error');
            setInfoMessage(error as string);
            setShowMessage(true);
            setSubmitting(false);
            return;
        }
    };

    return (
        <form onSubmit={handleSubmit(submitAplicacionHerbicida)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12} mt={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha aplicación fertilizante"
                            onChange={(value) => {
                                const newValue = dayjs(value as any).format('YYYY-MM-DD');
                                setValue('fecha', newValue);
                            }}
                            format="DD/MM/YYYY"
                            defaultValue={
                                formType === 'create'
                                    ? undefined
                                    : dayjs(aplicacionFertilizante?.aplicacionFertilizante?.fecha, 'YYYY-MM-DD')
                            }
                        />
                        {!!errors.fecha && (
                            <Typography
                                sx={{
                                    color: '#d32f2f',
                                    fontSize: '0.75rem',
                                    lineHeight: 1.66,
                                    textAlign: 'left',
                                    mt: '4px',
                                    mr: '14px',
                                    mb: 0,
                                    ml: '14px'
                                }}
                            >
                                {errors.fecha.message}
                            </Typography>
                        )}
                    </LocalizationProvider>
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Tipo Aplicación"
                        {...register('tipo')}
                        error={!!errors.tipo}
                        helperText={errors.tipo?.message}
                        sx={{ mb: 2 }}
                    />
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="center" gap={3}>
                    <Button color="primary" variant="contained" type="submit" disabled={submitting}>
                        {submitting ? <Loading /> : formType === 'create' ? 'Registrar' : 'Actualizar'}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            reset();
                            handleClose();
                        }}
                    >
                        Cancelar
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default AplicacionFertilizanteRegister;
