import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { InformationContext } from 'src/context/cultivos/information/InformationContext';
import { ELIMINAR_APLICACIONES_FERTILIZANTES } from '@graphql/mutations';
import {
    AplicacionesFertilizantes,
    GetDeleteAplicacionesFertilizantesResponse
} from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';
import { OBTENER_APLICACIONES_FERTILIZANTES_CORTE } from '@graphql/queries';

interface Props {
    handleClose: () => void;
    data?: AplicacionesFertilizantes;
}

const AplicacionesFertilizantesDelete: React.FC<Props> = ({ handleClose, data }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(InformationContext);
    const [eliminarAplicacionesFertilizantes] = useMutation<GetDeleteAplicacionesFertilizantesResponse>(
        ELIMINAR_APLICACIONES_FERTILIZANTES
    );
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitDelete = async () => {
        try {
            await eliminarAplicacionesFertilizantes({
                variables: {
                    idAplicacionesFertilizantes: data?.id_aplicaciones_fertilizantes
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE, variables: { corteId: data?.corte_id } }]
            });
            setMessageType('success');
            setInfoMessage('El fertilizante se eliminó exitosamente del corte.');
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

export default AplicacionesFertilizantesDelete;
