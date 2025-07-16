import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_MANTENIMIENTO } from '@graphql/mutations';
import { OBTENER_APLICACIONES_MANTENIMIENTO } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { GetMantenimientoDelete, Mantenimiento } from '@interfaces/mantenimientos/mantenimiento';
import { IRootState } from '@interfaces/store';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    mantenimiento: Mantenimiento | undefined;
    handleClose: () => void;
}

const MantenimientoDelete: React.FC<Props> = ({ mantenimiento, handleClose }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarMantenimiento] = useMutation<GetMantenimientoDelete>(ELIMINAR_MANTENIMIENTO);
    const { setInfoMessage, setShowMessage, setMessageType } = useContext(CultivosContext);
    const { idMaquinaria } = useAppSelector((state: IRootState) => state.maquinariaReducer.maquinaria);

    const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { data } = await eliminarMantenimiento({
                variables: {
                    idMantenimiento: mantenimiento?.idMantenimiento
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_MANTENIMIENTO, variables: { maquinariaId: idMaquinaria } }]
            });

            if (data?.eliminarMantenimiento) {
                setMessageType('success');
                setInfoMessage('El mantenimiento se eliminó exitosamente.');
                setShowMessage(true);
                setSubmitting(false);
                handleClose();
                return;
            }

            setMessageType('error');
            setInfoMessage('No se pudo eliminar el mantenimiento, intente nuevamente en un momento.');
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
                    ¿Realmente desea eliminar el mantenimiento?
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

export default MantenimientoDelete;
