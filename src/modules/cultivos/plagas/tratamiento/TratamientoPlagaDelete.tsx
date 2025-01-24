import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_TRATAMIENTO_PLAGAS } from '@graphql/mutations';
import { OBTENER_TRATAMIENTO_PLAGAS } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const TratamientoPlagaDelete: React.FC<Props> = ({}) => {
    const { tratamientoPlagaEdit, setMessageType, setInfoMessage, setShowMessage, setOpenModal } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarTratamientoPlagas] = useMutation<boolean>(ELIMINAR_TRATAMIENTO_PLAGAS);
    const submitDelete = async () => {
        try {
            await eliminarTratamientoPlagas({
                variables: {
                    idTrapl: tratamientoPlagaEdit?.id_trapl
                },
                refetchQueries: [{ query: OBTENER_TRATAMIENTO_PLAGAS }]
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
                <Typography className="!text-red-500">
                    Esta acción eliminará el tratamiento y todas sus aplicaciones asociadas en los tablones
                </Typography>
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

export default TratamientoPlagaDelete;
