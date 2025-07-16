import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { ELIMINAR_RIEGO } from '@graphql/mutations';
import { OBTENER_RIEGOS_CORTE } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { Riego } from '@interfaces/cultivos/riegos';

interface Props {
    riego: Riego | undefined;
    handleClose: () => void;
}

const RiegoDelete: React.FC<Props> = ({ riego, handleClose }) => {
    const { corte } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarRiego] = useMutation<boolean>(ELIMINAR_RIEGO);
    const submitDelete = async () => {
        try {
            await eliminarRiego({
                variables: {
                    idRiego: riego?.id_riego
                },
                refetchQueries: [{ query: OBTENER_RIEGOS_CORTE, variables: { corteId: corte.id_corte } }]
            });
            setMessageType('success');
            setInfoMessage('El riego se eliminó exitosamente.');
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
                <Typography>Desea eliminar el riego?</Typography>
                <Typography className="!text-red-500">
                    Esta acción eliminará el riego y todas sus aplicaciones asociadas en los tablones
                </Typography>
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

export default RiegoDelete;
