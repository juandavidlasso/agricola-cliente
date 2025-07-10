import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_TRATAMIENTO_FERTILIZANTE } from '@graphql/mutations';
import { OBTENER_APLICACIONES_FERTILIZANTES, OBTENER_APLICACIONES_FERTILIZANTES_CORTE } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { TratamientoFertilizante } from '@interfaces/cultivos/fertilizantes/tratamientos';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {
    handleClose: () => void;
    tratamientoFertilizante: TratamientoFertilizante;
}

const TratamientoFertilizanteDelete: React.FC<Props> = ({ handleClose, tratamientoFertilizante }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarTratamientoFertilizante] = useMutation<boolean>(ELIMINAR_TRATAMIENTO_FERTILIZANTE);
    const submitDelete = async () => {
        try {
            await eliminarTratamientoFertilizante({
                variables: {
                    idTrafe: tratamientoFertilizante?.id_trafe
                },
                refetchQueries: [
                    {
                        query: OBTENER_APLICACIONES_FERTILIZANTES
                    },
                    { query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE, variables: { corteId: id_corte } }
                ]
            });
            setMessageType('success');
            setInfoMessage('El tratamiento se eliminó exitosamente.');
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
                <Typography>Desea eliminar el tratamiento?</Typography>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'} p={2}>
                <Button variant="contained" color="error" onClick={submitDelete} fullWidth>
                    {submitting ? <Loading /> : 'Eliminar'}
                </Button>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'} p={2}>
                <Button variant="contained" color="primary" onClick={handleClose} fullWidth>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default TratamientoFertilizanteDelete;
