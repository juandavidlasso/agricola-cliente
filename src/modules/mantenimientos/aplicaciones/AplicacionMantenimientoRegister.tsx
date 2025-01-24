import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Button, Grid2, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
    FormDataAplicacionMantenimiento,
    GetAplicacionMantenimientoRegister,
    GetAplicacionMantenimientoUpdate
} from '@interfaces/mantenimientos/aplicaciones';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { MaquinariaContext } from 'src/context/maquinaria/MaquinariaContext';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { ACTUALIZAR_APLICACION_MANTENIMIENTO, REGISTRAR_APLICACION_MANTENIMIENTO } from '@graphql/mutations';
import Loading from '@components/Loading';
import { OBTENER_APLICACIONES_MANTENIMIENTO } from '@graphql/queries';

const schema = yup.object({
    fecha: yup.string().required('La fecha es requerida.'),
    nombre: yup.string().required('El nombre es requerido.'),
    maquinariaId: yup.number().required()
});

interface Props {}

const AplicacionMantenimientoRegister: React.FC<Props> = ({}) => {
    const { setOpenModal, type, aplicacionMantenimientoEdit } = useContext(MaquinariaContext);
    const { setShowMessage, setInfoMessage, setMessageType } = useContext(CultivosContext);
    const { idMaquinaria } = useAppSelector((state: IRootState) => state.maquinariaReducer.maquinaria);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<FormDataAplicacionMantenimiento>({
        resolver: yupResolver(schema),
        defaultValues: {
            fecha: type === 'update' ? aplicacionMantenimientoEdit?.fecha : '',
            nombre: type === 'update' ? aplicacionMantenimientoEdit?.nombre : '',
            maquinariaId: idMaquinaria
        }
    });
    const [agregarAplicacionMantenimiento] = useMutation<GetAplicacionMantenimientoRegister>(REGISTRAR_APLICACION_MANTENIMIENTO);
    const [actualizarAplicacionMantenimiento] = useMutation<GetAplicacionMantenimientoUpdate>(
        ACTUALIZAR_APLICACION_MANTENIMIENTO
    );
    //
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitAplicacionMantenimiento = async (dataForm: FormDataAplicacionMantenimiento) => {
        setSubmitting(true);

        try {
            if (type === 'create') {
                await agregarAplicacionMantenimiento({
                    variables: {
                        createAplicacionMantenimientoInput: dataForm
                    },
                    refetchQueries: [{ query: OBTENER_APLICACIONES_MANTENIMIENTO, variables: { maquinariaId: idMaquinaria } }]
                });
            } else {
                await actualizarAplicacionMantenimiento({
                    variables: {
                        updateAplicacionMantenimientoInput: {
                            ...dataForm,
                            idApMant: aplicacionMantenimientoEdit?.idApMant
                        }
                    },
                    refetchQueries: [{ query: OBTENER_APLICACIONES_MANTENIMIENTO, variables: { maquinariaId: idMaquinaria } }]
                });
            }

            setMessageType('success');
            setInfoMessage(`La aplicación se ${type === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
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
        <form className="mt-5" onSubmit={handleSubmit(submitAplicacionMantenimiento)} style={{ height: '90%' }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha"
                            onChange={(value) => {
                                const newValue = dayjs(value as any).format('YYYY-MM-DD');
                                setValue('fecha', newValue);
                            }}
                            format="DD/MM/YYYY"
                            defaultValue={type === 'update' ? dayjs(aplicacionMantenimientoEdit?.fecha, 'YYYY-MM-DD') : undefined}
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
                        {...register('nombre')}
                        label="Nombre"
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message}
                    />
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="center" gap={4} mt={3} mb={2}>
                    <Button
                        disabled={submitting}
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
                    >
                        {submitting ? <Loading /> : type === 'create' ? 'Registrar' : 'Actualizar'}
                    </Button>
                    <Button
                        onClick={() => {
                            reset();
                            setOpenModal(false);
                        }}
                        color="primary"
                        variant="contained"
                        sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
                    >
                        Cancelar
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default AplicacionMantenimientoRegister;
