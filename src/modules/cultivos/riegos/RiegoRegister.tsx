import React, { useContext, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { Button, Grid2, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { FormDataRiego, GetRiegoMayorResponse, GetRiegoRegister, GetRiegoUpdate } from '@interfaces/cultivos/riegos';
import { ACTUALIZAR_RIEGO, REGISTRAR_RIEGO } from '@graphql/mutations';
import { OBTENER_RIEGO_MAYOR, OBTENER_RIEGOS_CORTE } from '@graphql/queries';
import Alert from '@components/Alert';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

const schema = yup.object({
    fecha: yup.string().required('La fecha es requerida')
});

interface Props {
    handleClose: () => void;
}

const RiegoRegister: React.FC<Props> = ({ handleClose }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { corte } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const { formType, riegoEdit, setOpenModal, setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { data, loading, error, refetch } = useQuery<GetRiegoMayorResponse>(OBTENER_RIEGO_MAYOR, {
        variables: { corteId: corte.id_corte }
    });
    const {
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<FormDataRiego>({
        resolver: yupResolver(schema),
        defaultValues: {
            fecha: formType === 'update' ? dayjs(riegoEdit?.fecha).format('YYYY-MM-DD') : ''
        }
    });
    useEffect(() => {
        refetch();
    }, []);
    const [agregarRiego] = useMutation<GetRiegoRegister>(REGISTRAR_RIEGO);
    const [actualizarRiego] = useMutation<GetRiegoUpdate>(ACTUALIZAR_RIEGO);
    if (loading) return <Loading />;
    if (error) return <Alert message={error.message} />;

    const submitForm = async (formData: FormDataRiego) => {
        setSubmitting(true);

        try {
            if (formType === 'create') {
                await agregarRiego({
                    variables: {
                        createRiegoInput: {
                            fecha: formData.fecha,
                            corte_id: corte.id_corte,
                            num_riego: data?.obtenerRiegosMayor! + 1
                        }
                    },
                    refetchQueries: [{ query: OBTENER_RIEGOS_CORTE, variables: { corteId: corte.id_corte } }]
                });
            } else {
                await actualizarRiego({
                    variables: {
                        updateRiegoInput: {
                            id_riego: riegoEdit?.id_riego,
                            fecha: formData.fecha,
                            corte_id: riegoEdit?.corte_id,
                            num_riego: riegoEdit?.num_riego
                        }
                    },
                    refetchQueries: [{ query: OBTENER_RIEGOS_CORTE, variables: { corteId: riegoEdit?.corte_id } }]
                });
            }

            setMessageType('success');
            setInfoMessage(`El riego se ${formType === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
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
        <form onSubmit={handleSubmit(submitForm)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12} mt={2} mb={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha"
                            onChange={(value) => {
                                const newValue = dayjs(value as any).format('YYYY-MM-DD');
                                setValue('fecha', newValue);
                            }}
                            format="DD/MM/YYYY"
                            defaultValue={formType === 'update' ? dayjs(riegoEdit?.fecha, 'YYYY-MM-DD') : undefined}
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
                <Grid2 size={12} display="flex" justifyContent="center" gap={3}>
                    <Button color="primary" variant="contained" type="submit" disabled={submitting}>
                        {submitting ? <Loading /> : formType === 'create' ? 'Registrar' : 'Actualizar'}
                    </Button>
                    {formType === 'update' && (
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
                    )}
                </Grid2>
            </Grid2>
        </form>
    );
};

export default RiegoRegister;
