import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import { ELIMINAR_APLICACIONES_FERTILIZANTES } from '@graphql/mutations';
import { OBTENER_APLICACIONES_FERTILIZANTES_CORTE } from '@graphql/queries';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import {
    AplicacionesFertilizantes,
    GetDeleteAplicacionesFertilizantesResponse
} from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';

interface Props {
    handleClose: () => void;
    aplicacionFertilizante: AplicacionesFertilizantes;
}

const AplicacionFertilizanteDelete: React.FC<Props> = ({ handleClose, aplicacionFertilizante }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarAplicacionesFertilizantes] = useMutation<GetDeleteAplicacionesFertilizantesResponse>(
        ELIMINAR_APLICACIONES_FERTILIZANTES
    );
    const submitDelete = async () => {
        try {
            await eliminarAplicacionesFertilizantes({
                variables: {
                    idAplicacionesFertilizantes: aplicacionFertilizante?.id_aplicaciones_fertilizantes
                },
                refetchQueries: [
                    {
                        query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE,
                        variables: { corteId: aplicacionFertilizante?.corte_id }
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

export default AplicacionFertilizanteDelete;
