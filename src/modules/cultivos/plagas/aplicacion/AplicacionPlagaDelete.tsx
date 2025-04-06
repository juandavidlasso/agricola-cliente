import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_APLICACION_PLAGA } from '@graphql/mutations';
import { OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const AplicacionPlagaDelete: React.FC<Props> = ({}) => {
    const { aplicacionPlagaEdit, setMessageType, setInfoMessage, setShowMessage, setOpenModalForms } =
        useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarAplicacionPlagas] = useMutation<boolean>(ELIMINAR_APLICACION_PLAGA);
    const submitDelete = async () => {
        try {
            await eliminarAplicacionPlagas({
                variables: {
                    idApla: aplicacionPlagaEdit?.id_apla
                },
                refetchQueries: [
                    { query: OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS, variables: { idCorte: aplicacionPlagaEdit?.corte_id } }
                ]
            });
            setMessageType('success');
            setInfoMessage('La aplicación se eliminó exitosamente.');
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
        <Grid2 container>
            <Grid2 size={12} m={1} mb={3}>
                <Typography>Desea eliminar la aplicación del tablón?</Typography>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" color="error" onClick={submitDelete}>
                    {submitting ? <Loading /> : 'Eliminar'}
                </Button>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" color="primary" onClick={() => setOpenModalForms(false)}>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default AplicacionPlagaDelete;
