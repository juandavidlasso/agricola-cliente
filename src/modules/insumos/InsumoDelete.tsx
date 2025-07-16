import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_INSUMO } from '@graphql/mutations';
import { OBTENER_INSUMOS } from '@graphql/queries';
import { GetDeleteInsumo, Insumo } from '@interfaces/insumos';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    insumo: Insumo | undefined;
    handleClose: () => void;
}

const InsumoDelete: React.FC<Props> = ({ insumo, handleClose }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarInsumo] = useMutation<GetDeleteInsumo>(ELIMINAR_INSUMO);
    const { setInfoMessage, setShowMessage, setMessageType } = useContext(CultivosContext);

    const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { data } = await eliminarInsumo({
                variables: {
                    idInsumo: insumo?.idInsumo
                },
                refetchQueries: [{ query: OBTENER_INSUMOS }]
            });

            if (data?.eliminarInsumo) {
                setMessageType('success');
                setInfoMessage('El insumo se eliminó exitosamente.');
                setShowMessage(true);
                setSubmitting(false);
                handleClose();
                return;
            }

            setMessageType('error');
            setInfoMessage('No se pudo eliminar el insumo, intente nuevamente en un momento.');
            setShowMessage(true);
            setSubmitting(false);
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
        <Grid2 container spacing={2}>
            <Grid2 size={12} marginBottom={3}>
                <Typography color="text.primary" sx={{ marginBottom: 1 }}>
                    ¿Realmente desea eliminar el insumo?
                </Typography>
                <Typography color="text.primary">Esta acción eliminará el insumo y las aplicaciones asociadas</Typography>
            </Grid2>
            <Grid2 size={12} display="flex" justifyContent="center" gap={4}>
                <Button
                    disabled={submitting}
                    type="submit"
                    color="error"
                    variant="contained"
                    sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
                    onClick={(e) => submitForm(e)}
                >
                    {submitting ? <Loading /> : 'Eliminar'}
                </Button>
                <Button onClick={handleClose} color="primary" variant="contained" sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default InsumoDelete;
