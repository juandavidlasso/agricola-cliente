import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import { ELIMINAR_APLICACION_FERTILIZANTE, ELIMINAR_APLICACIONES_FERTILIZANTES } from '@graphql/mutations';
import { OBTENER_APLICACIONES_FERTILIZANTES, OBTENER_APLICACIONES_FERTILIZANTES_CORTE } from '@graphql/queries';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import {
    AplicacionesFertilizantes,
    GetDeleteAplicacionesFertilizantesResponse,
    GetDeleteAplicacionFertilizanteResponse
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
    const [eliminarAplicacionFertilizante] =
        useMutation<GetDeleteAplicacionFertilizanteResponse>(ELIMINAR_APLICACION_FERTILIZANTE);

    const submitDelete = async () => {
        try {
            if (aplicacionFertilizante?.apfe_id !== 0) {
                const { data } = await eliminarAplicacionesFertilizantes({
                    variables: {
                        idAplicacionesFertilizantes: aplicacionFertilizante?.id_aplicaciones_fertilizantes
                    },
                    refetchQueries: [
                        {
                            query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE,
                            variables: { corteId: aplicacionFertilizante?.corte_id }
                        },
                        { query: OBTENER_APLICACIONES_FERTILIZANTES }
                    ]
                });
                if (data?.eliminarAplicacionesFertilizantes) {
                    setMessageType('success');
                    setInfoMessage('La aplicación se eliminó exitosamente.');
                    setShowMessage(true);
                    handleClose();
                    return;
                }
            } else {
                const { data } = await eliminarAplicacionFertilizante({
                    variables: {
                        idApfe: aplicacionFertilizante?.aplicacionFertilizante?.id_apfe
                    },
                    refetchQueries: [{ query: OBTENER_APLICACIONES_FERTILIZANTES }]
                });
                if (data?.eliminarAplicacionFertilizante) {
                    setMessageType('success');
                    setInfoMessage('La aplicación se eliminó exitosamente.');
                    setShowMessage(true);
                    handleClose();
                    return;
                }
            }
            setMessageType('error');
            setInfoMessage('La aplicación no se pudo eliminar. Intente de nuevo en unos minutos.');
            setShowMessage(true);
            handleClose();
            return;
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
