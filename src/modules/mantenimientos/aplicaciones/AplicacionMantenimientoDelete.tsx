import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_APLICACION_MANTENIMIENTO } from '@graphql/mutations';
import { GetAplicacionMantenimientoDelete } from '@interfaces/mantenimientos/aplicaciones';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { MaquinariaContext } from 'src/context/maquinaria/MaquinariaContext';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { OBTENER_APLICACIONES_MANTENIMIENTO } from '@graphql/queries';

interface Props {}

const AplicacionMantenimientoDelete: React.FC<Props> = ({}) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarAplicacionMantenimiento] = useMutation<GetAplicacionMantenimientoDelete>(ELIMINAR_APLICACION_MANTENIMIENTO);
    const { aplicacionMantenimientoEdit, setOpenModal } = useContext(MaquinariaContext);
    const { setInfoMessage, setShowMessage, setMessageType } = useContext(CultivosContext);
    const { idMaquinaria } = useAppSelector((state: IRootState) => state.maquinariaReducer.maquinaria);

    const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { data } = await eliminarAplicacionMantenimiento({
                variables: {
                    idApMant: aplicacionMantenimientoEdit?.idApMant
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_MANTENIMIENTO, variables: { maquinariaId: idMaquinaria } }]
            });

            if (data?.eliminarAplicacionMantenimiento) {
                setMessageType('success');
                setInfoMessage('La aplicación se eliminó exitosamente.');
                setShowMessage(true);
                setSubmitting(false);
                setOpenModal(false);
                return;
            }

            setMessageType('error');
            setInfoMessage('No se pudo eliminar la aplicación, intente nuevamente en un momento.');
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
                    ¿Realmente desea eliminar la aplicación?
                </Typography>
                <Typography color="text.primary">Esta acción eliminará la aplicación y los mantenimientos asociados</Typography>
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

export default AplicacionMantenimientoDelete;
