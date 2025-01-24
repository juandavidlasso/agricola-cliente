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
import { ACTUALIZAR_APLICACION_FERTILIZANTE, REGISTRAR_APLICACION_FERTILIZANTE } from '@graphql/mutations';
import {
    FormDataAplicacionFertilizante,
    GetAplicacionFertilizanteRegister,
    GetAplicacionFertilizanteUpdate
} from '@interfaces/cultivos/fertilizantes/aplicacion';
import { OBTENER_APLICACIONES_FERTILIZANTES } from '@graphql/queries';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const schema = yup.object({
    tipo: yup.string().required('El tipo de aplicación es requerido.'),
    fecha: yup.string().required('La fecha es requerida.')
});

interface Props {}

const AplicacionFertilizanteRegister: React.FC<Props> = ({}) => {
    const { aplicacionFertilizanteEdit, formType, setOpenModal, setMessageType, setInfoMessage, setShowMessage } =
        useContext(CultivosContext);
    const [agregarAplicacionFertilizante] = useMutation<GetAplicacionFertilizanteRegister>(REGISTRAR_APLICACION_FERTILIZANTE);
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
            fecha: formType === 'update' ? dayjs(aplicacionFertilizanteEdit?.fecha).format('YYYY-MM-DD') : '',
            tipo: formType === 'update' ? aplicacionFertilizanteEdit?.tipo : ''
        }
    });

    const submitAplicacionHerbicida = async (data: FormDataAplicacionFertilizante) => {
        setSubmitting(true);
        try {
            if (formType === 'create') {
                await agregarAplicacionFertilizante({
                    variables: {
                        createAplicacionFertilizanteInput: {
                            tipo: data.tipo,
                            fecha: data.fecha
                        }
                    },
                    refetchQueries: [{ query: OBTENER_APLICACIONES_FERTILIZANTES }]
                });
            } else {
                await actualizarAplicacionFertilizante({
                    variables: {
                        updateAplicacionFertilizanteInput: {
                            id_apfe: aplicacionFertilizanteEdit?.id_apfe,
                            tipo: data.tipo,
                            fecha: data.fecha
                        }
                    },
                    refetchQueries: [{ query: OBTENER_APLICACIONES_FERTILIZANTES }]
                });
            }

            setMessageType('success');
            setInfoMessage(`La aplicación se ${formType === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
            setShowMessage(true);
            setOpenModal(false);
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
                                formType === 'update' ? dayjs(aplicacionFertilizanteEdit?.fecha, 'YYYY-MM-DD') : undefined
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
                            setOpenModal(false);
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
