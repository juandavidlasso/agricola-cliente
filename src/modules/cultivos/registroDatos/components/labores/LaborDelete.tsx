import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_LABOR } from '@graphql/mutations';
import { OBTENER_LABORES } from '@graphql/queries';
import { Labores } from '@interfaces/cultivos/labores';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const LaborDelete: React.FC<Props> = ({}) => {
    const { editLabor, setOpenModal, setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarLabor] = useMutation<boolean>(ELIMINAR_LABOR);
    const submitDelete = async () => {
        try {
            await eliminarLabor({
                variables: {
                    idLabor: editLabor?.id_labor
                },
                refetchQueries: [{ query: OBTENER_LABORES }]
            });
            setMessageType('success');
            setInfoMessage('La labor se eliminó exitosamente.');
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
                <Typography>Desea eliminar la labor?</Typography>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" color="error" onClick={submitDelete}>
                    {submitting ? <Loading /> : 'Eliminar'}
                </Button>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" color="primary" onClick={() => setOpenModal(false)}>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default LaborDelete;
