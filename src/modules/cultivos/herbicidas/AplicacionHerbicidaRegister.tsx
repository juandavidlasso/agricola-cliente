import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    FormDataAplicacionHerbicidas,
    GetAplicacionHerbicidaRegister,
    GetAplicacionHerbicidaUpdate
} from '@interfaces/cultivos/herbicidas/aplicacion';
import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ApolloError, useMutation } from '@apollo/client';
import {
    ACTUALIZAR_APLICACION_HERBICIDA,
    REGISTAR_APLICACION_HERBICIDA,
    REGISTRAR_APLICACIONES_HERBICIDAS
} from '@graphql/mutations';
import { OBTENER_APLICACIONES_HERBICIDAS, OBTENER_APLICACIONES_HERBICIDAS_CORTE } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import {
    AplicacionesHerbicidas,
    GetRegistrarAplicacionesHerbicidas
} from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

const schema = yup.object({
    tipo: yup.string().required('El tipo de aplicación es requerido.'),
    fecha: yup.string().required('La fecha es requerida.')
});

interface Props {
    aplicacionesHerbicida: AplicacionesHerbicidas;
    handleClose: () => void;
    formType: 'delete' | 'update' | 'create';
}

const AplicacionHerbicidaRegister: React.FC<Props> = ({ aplicacionesHerbicida, handleClose, formType }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const [agregarAplicacionHerbicida] = useMutation<GetAplicacionHerbicidaRegister>(REGISTAR_APLICACION_HERBICIDA);
    const [actualizarAplicacionHerbicida] = useMutation<GetAplicacionHerbicidaUpdate>(ACTUALIZAR_APLICACION_HERBICIDA);
    const [agregarAplicacionesHerbicidas] = useMutation<GetRegistrarAplicacionesHerbicidas>(REGISTRAR_APLICACIONES_HERBICIDAS);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const {
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        control
    } = useForm<FormDataAplicacionHerbicidas>({
        resolver: yupResolver(schema),
        defaultValues: {
            fecha: formType === 'create' ? '' : dayjs(aplicacionesHerbicida?.aplicacionHerbicida?.fecha).format('YYYY-MM-DD'),
            tipo: formType === 'create' ? '' : aplicacionesHerbicida?.aplicacionHerbicida?.tipo
        }
    });

    const submitAplicacionHerbicida = async (dataForm: FormDataAplicacionHerbicidas) => {
        setSubmitting(true);
        try {
            if (formType === 'create') {
                const { data } = await agregarAplicacionHerbicida({
                    variables: {
                        createAplicacionHerbicidaInput: {
                            tipo: dataForm.tipo,
                            fecha: dataForm.fecha
                        }
                    }
                });

                const result = await agregarAplicacionesHerbicidas({
                    variables: {
                        createAplicacionesHerbicidaInput: [
                            {
                                aphe_id: data?.agregarAplicacionHerbicida?.id_aphe,
                                corte_id: id_corte
                            }
                        ]
                    },
                    refetchQueries: [
                        { query: OBTENER_APLICACIONES_HERBICIDAS },
                        { query: OBTENER_APLICACIONES_HERBICIDAS_CORTE, variables: { corteId: id_corte } }
                    ]
                });

                if (result?.data?.agregarAplicacionesHerbicidas.length !== 0) {
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
                await actualizarAplicacionHerbicida({
                    variables: {
                        updateAplicacionHerbicidaInput: {
                            id_aphe: aplicacionesHerbicida?.aplicacionHerbicida?.id_aphe,
                            tipo: dataForm.tipo,
                            fecha: dataForm.fecha,
                            duplicate: false // formType === 'duplicar'
                        }
                    },
                    refetchQueries: [
                        { query: OBTENER_APLICACIONES_HERBICIDAS },
                        { query: OBTENER_APLICACIONES_HERBICIDAS_CORTE, variables: { corteId: id_corte } }
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
                            label="Fecha aplicación herbicida"
                            onChange={(value) => {
                                const newValue = dayjs(value as any).format('YYYY-MM-DD');
                                setValue('fecha', newValue);
                            }}
                            format="DD/MM/YYYY"
                            defaultValue={
                                formType === 'create'
                                    ? undefined
                                    : dayjs(aplicacionesHerbicida?.aplicacionHerbicida?.fecha, 'YYYY-MM-DD')
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
                    <FormControl fullWidth>
                        <InputLabel id="tipoApliHer">Tipo de aplicación</InputLabel>
                        <Controller
                            name="tipo"
                            control={control}
                            rules={{ required: 'El tipo de aplicación es requerido.' }}
                            render={({ field }) => (
                                <Select {...field} label="Tipo de aplicación">
                                    <MenuItem value={''}></MenuItem>
                                    <MenuItem value={'PRE-EMERGENTE'}>PRE-EMERGENTE</MenuItem>
                                    <MenuItem value={'POST-EMERGENTE'}>POST-EMERGENTE</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
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

export default AplicacionHerbicidaRegister;
