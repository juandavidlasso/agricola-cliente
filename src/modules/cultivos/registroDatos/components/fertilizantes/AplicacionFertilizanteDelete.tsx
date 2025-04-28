import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import { ELIMINAR_APLICACION_FERTILIZANTE, ELIMINAR_APLICACIONES_FERTILIZANTES } from '@graphql/mutations';
import { OBTENER_APLICACIONES_FERTILIZANTES, OBTENER_APLICACIONES_FERTILIZANTES_CORTE } from '@graphql/queries';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import {
    AplicacionesFertilizantes,
    GetDeleteAplicacionesFertilizantesResponse
} from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';
import { AplicacionFertilizante } from '@interfaces/cultivos/fertilizantes/aplicacion';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {}

const AplicacionFertilizanteDelete: React.FC<Props> = ({}) => {
    const { aplicacionFertilizanteEdit, setOpenModalForms, setMessageType, setInfoMessage, setShowMessage } =
        useContext(CultivosContext);
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarAplicacionFertilizante] = useMutation<boolean>(ELIMINAR_APLICACION_FERTILIZANTE);
    const [eliminarAplicacionesFertilizantes] = useMutation<GetDeleteAplicacionesFertilizantesResponse>(
        ELIMINAR_APLICACIONES_FERTILIZANTES
    );
    const submitDelete = async () => {
        try {
            if (aplicacionFertilizanteEdit?.hasOwnProperty('id_apfe')) {
                await eliminarAplicacionFertilizante({
                    variables: {
                        idApfe: (aplicacionFertilizanteEdit as AplicacionFertilizante)?.id_apfe
                    },
                    refetchQueries: [
                        { query: OBTENER_APLICACIONES_FERTILIZANTES },
                        {
                            query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE,
                            variables: { corteId: id_corte }
                        }
                    ]
                });
            } else {
                await eliminarAplicacionesFertilizantes({
                    variables: {
                        idAplicacionesFertilizantes: (aplicacionFertilizanteEdit as AplicacionesFertilizantes)
                            ?.id_aplicaciones_fertilizantes
                    },
                    refetchQueries: [
                        {
                            query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE,
                            variables: { corteId: (aplicacionFertilizanteEdit as AplicacionesFertilizantes)?.corte_id }
                        }
                    ]
                });
            }
            setMessageType('success');
            setInfoMessage('La aplicación se eliminó exitosamente.');
            setShowMessage(true);
            setOpenModalForms(false);
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
                <Typography>Desea eliminar la aplicación?</Typography>
                {aplicacionFertilizanteEdit?.hasOwnProperty('id_apfe') && (
                    <Typography sx={{ fontWeight: 700 }}>
                        Esta acción eliminará la aplicación en todas las suertes asociadas
                    </Typography>
                )}
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'} p={2}>
                <Button variant="contained" color="error" onClick={submitDelete} fullWidth>
                    {submitting ? <Loading /> : 'Eliminar'}
                </Button>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'} p={2}>
                <Button variant="contained" color="primary" onClick={() => setOpenModalForms(false)} fullWidth>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default AplicacionFertilizanteDelete;
