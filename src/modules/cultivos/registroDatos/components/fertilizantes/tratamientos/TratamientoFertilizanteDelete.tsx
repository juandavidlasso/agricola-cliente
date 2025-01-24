import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_TRATAMIENTO_FERTILIZANTE } from '@graphql/mutations';
import { OBTENER_APLICACIONES_FERTILIZANTES } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const TratamientoFertilizanteDelete: React.FC<Props> = ({}) => {
    const { tratamientoFertilizanteEdit, setOpenModal, setMessageType, setInfoMessage, setShowMessage } =
        useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarTratamientoFertilizante] = useMutation<boolean>(ELIMINAR_TRATAMIENTO_FERTILIZANTE);
    const submitDelete = async () => {
        try {
            await eliminarTratamientoFertilizante({
                variables: {
                    idTrafe: tratamientoFertilizanteEdit?.id_trafe
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_FERTILIZANTES }]
            });
            setMessageType('success');
            setInfoMessage('El tratamiento se eliminó exitosamente.');
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
                <Typography>Desea eliminar el tratamiento?</Typography>
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

export default TratamientoFertilizanteDelete;
