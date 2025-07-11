import React, { useContext, useState } from 'react';
import { Button, Grid2, Typography } from '@mui/material';
import { ApolloError, useMutation } from '@apollo/client';
import Loading from '@components/Loading';
import { ELIMINAR_APLICACIONES_HERBICIDAS } from '@graphql/mutations';
import { OBTENER_APLICACIONES_HERBICIDAS_CORTE } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import {
    AplicacionesHerbicidas,
    GetDeleteAplicacionesHerbicidasResponse
} from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';

interface Props {
    aplicacionHerbicida: AplicacionesHerbicidas;
    handleClose: () => void;
}

const AplicacionHerbicidaDelete: React.FC<Props> = ({ aplicacionHerbicida, handleClose }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarAplicacionesHerbicidas] =
        useMutation<GetDeleteAplicacionesHerbicidasResponse>(ELIMINAR_APLICACIONES_HERBICIDAS);

    const submitDelete = async () => {
        try {
            await eliminarAplicacionesHerbicidas({
                variables: {
                    idAplicacionesHerbicidas: aplicacionHerbicida?.id_aplicaciones_herbicidas
                },
                refetchQueries: [
                    {
                        query: OBTENER_APLICACIONES_HERBICIDAS_CORTE,
                        variables: { corteId: aplicacionHerbicida?.corte_id }
                    }
                ]
            });
            setMessageType('success');
            setInfoMessage('La aplicación se eliminó exitosamente.');
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
                <Typography>Desea eliminar la aplicación?</Typography>
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

export default AplicacionHerbicidaDelete;
