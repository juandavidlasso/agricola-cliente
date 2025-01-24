import React, { useContext, useState } from 'react';
import { Button, TextField, Typography, Grid2 } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ApolloError, useMutation } from '@apollo/client';
import { FormDataLabores, GetRegisterLabor, Labores } from '@interfaces/cultivos/labores';
import Loading from '@components/Loading';
import { ACTUALIZAR_LABOR, REGISTRAR_LABOR } from '@graphql/mutations';
import { OBTENER_LABORES } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const schema = yup.object({
    fecha: yup.string().required('La fecha es requerida'),
    actividad: yup.string().required('La actividad es requerida'),
    equipo: yup.string().optional(),
    pases: yup
        .number()
        .optional()
        .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    aplico: yup.string().optional(),
    costo: yup
        .number()
        .optional()
        .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    nota: yup.string().optional()
});

interface Props {}

const LaborRegister: React.FC<Props> = ({}) => {
    const { editLabor, formType, setInfoMessage, setShowMessage, setMessageType, setOpenModal } = useContext(CultivosContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
    } = useForm<FormDataLabores>({
        resolver: yupResolver(schema),
        defaultValues: {
            ...editLabor,
            fecha: dayjs(editLabor?.fecha).format('YYYY-MM-DD')
        }
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [agregarLabor] = useMutation<GetRegisterLabor>(REGISTRAR_LABOR);
    const [actualizarLabor] = useMutation<GetRegisterLabor>(ACTUALIZAR_LABOR);

    const submitForm = async (formData: FormDataLabores) => {
        setSubmitting(true);

        try {
            if (formType === 'create') {
                await agregarLabor({
                    variables: {
                        createLaboresInput: formData
                    },
                    refetchQueries: [{ query: OBTENER_LABORES }]
                });
            } else {
                await actualizarLabor({
                    variables: {
                        updateLaboresInput: {
                            ...formData,
                            id_labor: editLabor?.id_labor,
                            estado: null
                        }
                    },
                    refetchQueries: [{ query: OBTENER_LABORES }]
                });
            }

            setMessageType('success');
            setInfoMessage(`La labor se ${formType === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
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
        <form onSubmit={handleSubmit(submitForm)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12} mt={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha"
                            onChange={(value) => {
                                const newValue = dayjs(value as any).format('YYYY-MM-DD');
                                setValue('fecha', newValue);
                            }}
                            format="DD/MM/YYYY"
                            defaultValue={formType === 'update' ? dayjs(editLabor?.fecha, 'YYYY-MM-DD') : undefined}
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
                        label="Labor"
                        {...register('actividad')}
                        error={!!errors.actividad}
                        helperText={errors.actividad?.message}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField fullWidth size="small" type="text" label="Equipo" {...register('equipo')} />
                </Grid2>
                <Grid2 size={12}>
                    <TextField fullWidth size="small" type="number" label="Número de pases" {...register('pases')} />
                </Grid2>
                <Grid2 size={12}>
                    <TextField fullWidth size="small" type="text" label="Realizado por" {...register('aplico')} />
                </Grid2>
                <Grid2 size={12}>
                    <TextField fullWidth size="small" type="number" label="Costo" {...register('costo')} />
                </Grid2>
                <Grid2 size={12}>
                    <TextField fullWidth size="small" type="text" label="Nota" {...register('nota')} />
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

export default LaborRegister;
