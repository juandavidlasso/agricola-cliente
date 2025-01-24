import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import { ELIMINAR_APLICACION_FERTILIZANTE } from '@graphql/mutations';
import { OBTENER_APLICACIONES_FERTILIZANTES } from '@graphql/queries';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const AplicacionFertilizanteDelete: React.FC<Props> = ({}) => {
    const { aplicacionFertilizanteEdit, setOpenModal, setMessageType, setInfoMessage, setShowMessage } =
        useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarAplicacionFertilizante] = useMutation<boolean>(ELIMINAR_APLICACION_FERTILIZANTE);
    const submitDelete = async () => {
        try {
            await eliminarAplicacionFertilizante({
                variables: {
                    idApfe: aplicacionFertilizanteEdit?.id_apfe
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_FERTILIZANTES }]
            });
            setMessageType('success');
            setInfoMessage('La aplicación se eliminó exitosamente.');
            setShowMessage(true);
            setOpenModal(false);
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
                <Button variant="contained" color="primary" onClick={() => setOpenModal(false)} fullWidth>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default AplicacionFertilizanteDelete;
