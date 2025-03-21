import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { AplicacionLabores, GetDeleteAplicacionLaboresResponse } from '@interfaces/cultivos/labores';
import { ELIMINAR_APLICACION_LABOR } from '@graphql/mutations';
import { OBTENER_APLICACIONES_LABORES } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    handleClose: () => void;
    data?: AplicacionLabores;
}

const AplicacionLaborDelete: React.FC<Props> = ({ handleClose, data }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [eliminarAplicacionLabores] = useMutation<GetDeleteAplicacionLaboresResponse>(ELIMINAR_APLICACION_LABOR);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitDelete = async () => {
        try {
            await eliminarAplicacionLabores({
                variables: {
                    idAplicacionLabores: data?.id_aplicacion_labores
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_LABORES, variables: { corteId: data?.corte_id } }]
            });
            setMessageType('success');
            setInfoMessage('La labor se eliminó exitosamente del corte.');
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
                <Typography>Desea eliminar la labor de este corte?</Typography>
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

export default AplicacionLaborDelete;
