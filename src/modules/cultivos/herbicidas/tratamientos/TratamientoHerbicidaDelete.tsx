import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_TRATAMIENTO_HERBICIDA } from '@graphql/mutations';
import { OBTENER_APLICACIONES_HERBICIDAS, OBTENER_APLICACIONES_HERBICIDAS_CORTE } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { TratamientoHerbicidas } from '@interfaces/cultivos/herbicidas/tratamientos';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {
    tratamientoHerbicida: TratamientoHerbicidas;
    handleClose: () => void;
}

const TratamientoHerbicidaDelete: React.FC<Props> = ({ tratamientoHerbicida, handleClose }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarTratamientoHerbicida] = useMutation<boolean>(ELIMINAR_TRATAMIENTO_HERBICIDA);
    const submitDelete = async () => {
        try {
            await eliminarTratamientoHerbicida({
                variables: {
                    idTrahe: tratamientoHerbicida?.id_trahe
                },
                refetchQueries: [
                    { query: OBTENER_APLICACIONES_HERBICIDAS },
                    { query: OBTENER_APLICACIONES_HERBICIDAS_CORTE, variables: { corteId: id_corte } }
                ]
            });
            setMessageType('success');
            setInfoMessage('El tratamiento se eliminó exitosamente.');
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
            <Grid2 size={12} m={1} mb={3}>
                <Typography>Desea eliminar el tratamiento?</Typography>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'} p={2}>
                <Button variant="contained" color="error" onClick={submitDelete} fullWidth>
                    {submitting ? <Loading /> : 'Eliminar'}
                </Button>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'} p={2}>
                <Button variant="contained" color="primary" onClick={handleClose} fullWidth>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default TratamientoHerbicidaDelete;
