import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { Button, Grid2, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Loading from '@components/Loading';
import { ACTUALIZAR_APLICACION_PLAGA } from '@graphql/mutations';
import { OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS } from '@graphql/queries';
import { AplicacionPlaga, GetAplicacionPlagaUpdate } from '@interfaces/cultivos/plagas/aplicacion';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    handleClose: () => void;
    aplicacionPlaga: AplicacionPlaga | undefined;
}

const AplicacionPlagaActualizar: React.FC<Props> = ({ aplicacionPlaga, handleClose }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errorForm, setErrorForm] = useState<boolean>(false);
    const [fecha, setFecha] = useState<string>('');
    const [actualizarAplicacionPlagas] = useMutation<GetAplicacionPlagaUpdate>(ACTUALIZAR_APLICACION_PLAGA);
    const submitUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await actualizarAplicacionPlagas({
                variables: {
                    updateAplicacionPlagasInput: {
                        id_apla: aplicacionPlaga?.id_apla,
                        fecha,
                        corte_id: aplicacionPlaga?.corte_id,
                        tablon_id: aplicacionPlaga?.tablon_id,
                        trapl_id: aplicacionPlaga?.trapl_id
                    }
                },
                refetchQueries: [
                    { query: OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS, variables: { idCorte: aplicacionPlaga?.corte_id } }
                ]
            });
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
        <Grid2 container>
            <Grid2 size={12} mb={3} textAlign={'center'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Fecha"
                        onChange={(value) => {
                            const newValue = dayjs(value as any).format('YYYY-MM-DD');
                            setFecha(newValue);
                            setErrorForm(false);
                        }}
                        format="DD/MM/YYYY"
                        defaultValue={dayjs(aplicacionPlaga?.fecha, 'YYYY-MM-DD')}
                    />
                    {errorForm && (
                        <Typography
                            sx={{
                                color: '#d32f2f',
                                fontSize: '0.75rem',
                                lineHeight: 1.66,
                                textAlign: 'center',
                                mt: '4px',
                                mb: 0
                            }}
                        >
                            Debe ingresar la fecha
                        </Typography>
                    )}
                </LocalizationProvider>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" color="primary" onClick={submitUpdate}>
                    {submitting ? <Loading /> : 'Actualizar'}
                </Button>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" color="primary" onClick={handleClose}>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default AplicacionPlagaActualizar;
