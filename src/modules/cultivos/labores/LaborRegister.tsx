import React, { useContext, useState } from 'react';
import { Button, TextField, Typography, Grid2 } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import {
    AplicacionLabores,
    FormDataLabores,
    GetLaborResponse,
    GetRegisterAplicacionLabor,
    GetRegisterLabor
} from '@interfaces/cultivos/labores';
import Loading from '@components/Loading';
import { ACTUALIZAR_LABOR, REGISTRAR_LABOR, REGISTRAR_LABORES_CORTES } from '@graphql/mutations';
import { OBTENER_APLICACIONES_LABORES, OBTENER_LABOR, OBTENER_LABORES } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

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

interface Props {
    formType: 'create' | 'update' | 'delete';
    labor: AplicacionLabores | undefined;
    onClose: () => void;
}

const LaborRegister: React.FC<Props> = ({ formType, labor, onClose }) => {
    const { data, loading, error } = useQuery<GetLaborResponse>(OBTENER_LABOR, {
        variables: { laborId: labor?.labor_id },
        skip: formType === 'update' ? false : true
    });
    const { setInfoMessage, setShowMessage, setMessageType } = useContext(CultivosContext);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
    } = useForm<FormDataLabores>({
        resolver: yupResolver(schema),
        defaultValues: {
            fecha: dayjs(data?.obtenerLabor?.fecha).format('YYYY-MM-DD'),
            actividad: formType === 'create' ? '' : data?.obtenerLabor?.actividad,
            aplico: formType === 'create' ? '' : data?.obtenerLabor?.aplico,
            costo: formType === 'create' ? undefined : data?.obtenerLabor?.costo,
            equipo: formType === 'create' ? '' : data?.obtenerLabor?.equipo,
            estado: formType === 'create' ? '' : data?.obtenerLabor?.estado,
            nota: formType === 'create' ? '' : data?.obtenerLabor?.nota,
            pases: formType === 'create' ? undefined : data?.obtenerLabor?.pases
        }
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [agregarLabor] = useMutation<GetRegisterLabor>(REGISTRAR_LABOR);
    const [actualizarLabor] = useMutation<GetRegisterLabor>(ACTUALIZAR_LABOR);
    const [agregarAplicacionLabores] = useMutation<GetRegisterAplicacionLabor>(REGISTRAR_LABORES_CORTES);
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);

    const submitForm = async (formData: FormDataLabores) => {
        setSubmitting(true);
        const { id_labor, ...newObject } = formData as any;

        try {
            if (formType === 'create') {
                const { data } = await agregarLabor({
                    variables: {
                        createLaboresInput: formType === 'create' ? formData : newObject
                    },
                    refetchQueries: [{ query: OBTENER_LABORES }]
                });
                await agregarAplicacionLabores({
                    variables: {
                        createAplicacionLaboresInput: [
                            {
                                corte_id: id_corte,
                                labor_id: data?.agregarLabor?.id_labor
                            }
                        ]
                    },
                    refetchQueries: [{ query: OBTENER_APLICACIONES_LABORES, variables: { corteId: id_corte } }]
                });
            } else {
                await actualizarLabor({
                    variables: {
                        updateLaboresInput: {
                            ...formData,
                            id_labor: labor?.labor_id,
                            estado: null
                        }
                    },
                    refetchQueries: [{ query: OBTENER_LABORES }]
                });
            }

            setMessageType('success');
            setInfoMessage(`La labor se ${formType === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
            setShowMessage(true);
            onClose();
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
                            defaultValue={formType === 'update' ? dayjs(data?.obtenerLabor?.fecha, 'YYYY-MM-DD') : undefined}
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
                            onClose();
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
