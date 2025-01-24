import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import { ELIMINAR_APLICACION_LLUVIA } from '@graphql/mutations';
import { OBTENER_PLUVIOMETROS_Y_LLUVIAS } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import Loading from '@components/Loading';

interface Props {}

const AplicacionLluviaDelete: React.FC<Props> = ({}) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { aplicacionLluviaEdit, setOpenModal } = useContext(PluviometroContext);
    const { setMessageType, setShowMessage, setInfoMessage } = useContext(CultivosContext);
    const [eliminarAplicacionLluvia] = useMutation<boolean>(ELIMINAR_APLICACION_LLUVIA);

    const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await eliminarAplicacionLluvia({
                variables: {
                    idAplicacionLluvia: aplicacionLluviaEdit?.id_aplicacion_lluvia
                },
                refetchQueries: [{ query: OBTENER_PLUVIOMETROS_Y_LLUVIAS }]
            });

            setMessageType('success');
            setInfoMessage('La lluvia se eliminó exitosamente.');
            setShowMessage(true);
            setSubmitting(false);
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
                <Typography>Desea eliminar la lluvia?</Typography>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" color="error" onClick={submitForm}>
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

export default AplicacionLluviaDelete;
