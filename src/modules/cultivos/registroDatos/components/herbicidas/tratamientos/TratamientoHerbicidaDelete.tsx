import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_TRATAMIENTO_HERBICIDA } from '@graphql/mutations';
import { OBTENER_APLICACIONES_HERBICIDAS } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const TratamientoHerbicidaDelete: React.FC<Props> = ({}) => {
    const { tratamientoHerbicidaEdit, setOpenModalForms, setMessageType, setInfoMessage, setShowMessage } =
        useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarTratamientoHerbicida] = useMutation<boolean>(ELIMINAR_TRATAMIENTO_HERBICIDA);
    const submitDelete = async () => {
        try {
            await eliminarTratamientoHerbicida({
                variables: {
                    idTrahe: tratamientoHerbicidaEdit?.id_trahe
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_HERBICIDAS }]
            });
            setMessageType('success');
            setInfoMessage('El tratamiento se eliminó exitosamente.');
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
                <Typography>Desea eliminar el tratamiento?</Typography>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'} p={2}>
                <Button variant="contained" color="error" onClick={submitDelete} fullWidth>
                    {submitting ? <Loading /> : 'Eliminar'}
                </Button>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'} p={2}>
                <Button variant="contained" color="primary" onClick={() => setOpenModalForms(false)} fullWidth>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default TratamientoHerbicidaDelete;
