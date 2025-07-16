import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_TABLON } from '@graphql/mutations';
import { GetEliminarTablon } from '@interfaces/cultivos/tablones';
import { OBTENER_AREA_SUERTE, OBTENER_TABLONES_CORTE, OBTENER_TABLONES_SUERTE } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    handleClose: () => void;
}

const TablonEliminar: React.FC<Props> = ({ handleClose }) => {
    const { id_tablon, corte_id, numero, area } = useAppSelector((state: IRootState) => state.cultivosReducer.tablon);
    const { id_suerte } = useAppSelector((state: IRootState) => state.cultivosReducer.suerte);
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarTablon] = useMutation<GetEliminarTablon>(ELIMINAR_TABLON);

    const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { data } = await eliminarTablon({
                variables: {
                    idTablon: id_tablon
                },
                refetchQueries: [
                    { query: OBTENER_TABLONES_CORTE, variables: { idCorte: corte_id } },
                    { query: OBTENER_AREA_SUERTE, variables: { idSuerte: id_suerte } },
                    { query: OBTENER_TABLONES_SUERTE, variables: { idSuerte: id_suerte } }
                ]
            });

            if (data?.eliminarTablon) {
                setMessageType('success');
                setInfoMessage('El tablón se eliminó exitosamente.');
                setShowMessage(true);
                setSubmitting(false);
                handleClose();
                return;
            }

            setMessageType('error');
            setInfoMessage('No se pudo eliminar el tablón, intente nuevamente en un momento.');
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
                    ¿Realmente desea eliminar el tablón?
                </Typography>
                <Typography color="text.primary">Esta acción eliminará el tablón y los datos no se podrán recuperar.</Typography>
                <Typography color="text.primary" className="!font-bold !text-center" mt={2}>
                    Tablón {numero} - Área {area}
                </Typography>
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

export default TablonEliminar;
