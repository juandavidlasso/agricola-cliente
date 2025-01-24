import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_APLICACIONES_HERBICIDAS } from '@graphql/mutations';
import { OBTENER_APLICACIONES_HERBICIDAS_CORTE } from '@graphql/queries';
import {
    AplicacionesHerbicidas,
    GetDeleteAplicacionesHerbicidasResponse
} from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';
import { InformationContext } from 'src/context/cultivos/information/InformationContext';

interface Props {
    handleClose: () => void;
    data?: AplicacionesHerbicidas;
}

const AplicacionesHerbicidasDelete: React.FC<Props> = ({ handleClose, data }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(InformationContext);
    const [eliminarAplicacionesHerbicidasService] =
        useMutation<GetDeleteAplicacionesHerbicidasResponse>(ELIMINAR_APLICACIONES_HERBICIDAS);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitDelete = async () => {
        try {
            await eliminarAplicacionesHerbicidasService({
                variables: {
                    idAplicacionesHerbicidas: data?.id_aplicaciones_herbicidas
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_HERBICIDAS_CORTE, variables: { corteId: data?.corte_id } }]
            });
            setMessageType('success');
            setInfoMessage('La herbicida se eliminó exitosamente del corte.');
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
                <Typography>Desea eliminar la aplicación de este corte?</Typography>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" color="error" onClick={submitDelete}>
                    {submitting ? <Loading /> : 'Eliminar'}
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

export default AplicacionesHerbicidasDelete;
