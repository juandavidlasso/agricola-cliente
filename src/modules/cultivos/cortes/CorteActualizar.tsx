import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormUpdateCorte, GetActualizarCorteResponse, GetRegisterCorte } from '@interfaces/cultivos/cortes';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import Loading from '@components/Loading';
import { ACTUALIZAR_CORTE, REGISTRAR_CORTE } from '@graphql/mutations';
import useAppDispatch from '@hooks/useAppDispatch';
import { saveCorte } from '@store/cultivos/actions';
import { OBTENER_CORTE, OBTENER_CORTE_ACTUAL, OBTENER_CORTES_POR_SUERTE, OBTENER_CORTES_RENOVADOS } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const CorteActualizar: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const {
        corte: { id_corte, numero, fecha_inicio, fecha_siembra },
        suerte
    } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const { formType, setOpenModalForms, setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { handleSubmit, reset, register, setValue } = useForm<FormUpdateCorte>({
        defaultValues: {
            numero: formType === 'create' ? 0 : numero,
            fecha_inicio: formType === 'create' ? '' : dayjs(fecha_inicio).format('YYYY-MM-DD'),
            fecha_siembra: formType === 'create' ? '' : dayjs(fecha_siembra).format('YYYY-MM-DD')
        }
    });
    const [agregarCorte] = useMutation<GetRegisterCorte>(REGISTRAR_CORTE);
    const [actualizarCorte] = useMutation<GetActualizarCorteResponse>(ACTUALIZAR_CORTE);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitForm = async (formData: FormUpdateCorte) => {
        setSubmitting(true);
        const { fecha_inicio, fecha_siembra } = formData;
        const newFechaInicio = dayjs(fecha_inicio).format('YYYY-MM-DD');
        const newFechaSiembra = dayjs(fecha_siembra).format('YYYY-MM-DD');

        try {
            if (formType === 'create') {
                await agregarCorte({
                    variables: {
                        createCorteInput: {
                            numero: Number(formData.numero),
                            fecha_inicio: newFechaInicio,
                            fecha_siembra: newFechaSiembra,
                            activo: true,
                            estado: true,
                            suerte_id: suerte.id_suerte
                        }
                    },
                    refetchQueries: [
                        { query: OBTENER_CORTES_POR_SUERTE, variables: { idSuerte: suerte.id_suerte } },
                        { query: OBTENER_CORTES_RENOVADOS, variables: { nombre: suerte.nombre } },
                        { query: OBTENER_CORTE_ACTUAL, variables: { idSuerte: suerte.id_suerte } }
                    ]
                });
            } else {
                const { data } = await actualizarCorte({
                    variables: {
                        updateCorteInput: {
                            id_corte,
                            fecha_inicio: newFechaInicio,
                            fecha_siembra: newFechaSiembra
                        }
                    },
                    refetchQueries: [{ query: OBTENER_CORTE, variables: { idCorte: id_corte } }]
                });
                dispatch(saveCorte(data?.actualizarCorte!));
            }

            setMessageType('success');
            setInfoMessage(`El corte se ${formType === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
            setShowMessage(true);
            setOpenModalForms(false);
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
                <Grid2 size={12}>
                    <TextField fullWidth label="Número" {...register('numero')} disabled={formType === 'update'} sx={{ mt: 1 }} />
                </Grid2>
                <Grid2 size={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha de inicio"
                            onChange={(value) => {
                                const newValue = dayjs(value as any).format('YYYY-MM-DD');
                                setValue('fecha_inicio', newValue);
                            }}
                            format="DD/MM/YYYY"
                            defaultValue={formType === 'update' ? dayjs(fecha_inicio, 'YYYY-MM-DD') : undefined}
                        />
                    </LocalizationProvider>
                </Grid2>
                <Grid2 size={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha de siembra"
                            onChange={(value) => {
                                const newValue = dayjs(value as any).format('YYYY-MM-DD');
                                setValue('fecha_siembra', newValue);
                            }}
                            format="DD/MM/YYYY"
                            defaultValue={formType === 'update' ? dayjs(fecha_siembra, 'YYYY-MM-DD') : undefined}
                            sx={{ mb: 2 }}
                        />
                    </LocalizationProvider>
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
                            setOpenModalForms(false);
                        }}
                    >
                        Cancelar
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default CorteActualizar;
