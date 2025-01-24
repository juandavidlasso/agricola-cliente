import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_INSUMO } from '@graphql/mutations';
import { OBTENER_INSUMOS } from '@graphql/queries';
import { MaquinariaContext } from 'src/context/maquinaria/MaquinariaContext';
import { GetDeleteInsumo } from '@interfaces/insumos';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const InsumoDelete: React.FC<Props> = ({}) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarInsumo] = useMutation<GetDeleteInsumo>(ELIMINAR_INSUMO);
    const { insumoEdit, setOpenModal } = useContext(MaquinariaContext);
    const { setInfoMessage, setShowMessage, setMessageType } = useContext(CultivosContext);

    const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { data } = await eliminarInsumo({
                variables: {
                    idInsumo: insumoEdit?.idInsumo
                },
                refetchQueries: [{ query: OBTENER_INSUMOS }]
            });

            if (data?.eliminarInsumo) {
                setMessageType('success');
                setInfoMessage('El insumo se eliminó exitosamente.');
                setShowMessage(true);
                setSubmitting(false);
                setOpenModal(false);
                return;
            }

            setMessageType('error');
            setInfoMessage('No se pudo eliminar el insumo, intente nuevamente en un momento.');
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
                <Button
                    onClick={() => setOpenModal(false)}
                    color="primary"
                    variant="contained"
                    sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
                >
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default InsumoDelete;
