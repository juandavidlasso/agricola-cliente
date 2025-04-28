import React, { useContext, useState } from 'react';
import { Button, Grid2, Typography } from '@mui/material';
import { ApolloError, useMutation } from '@apollo/client';
import Loading from '@components/Loading';
import { ELIMINAR_APLICACION_HERBICIDA, ELIMINAR_APLICACIONES_HERBICIDAS } from '@graphql/mutations';
import { OBTENER_APLICACIONES_HERBICIDAS, OBTENER_APLICACIONES_HERBICIDAS_CORTE } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import {
    AplicacionesHerbicidas,
    GetDeleteAplicacionesHerbicidasResponse
} from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';
import { AplicacionHerbicidas } from '@interfaces/cultivos/herbicidas/aplicacion';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {}

const AplicacionHerbicidaDelete: React.FC<Props> = ({}) => {
    const { aplicacionHerbicidaEdit, setOpenModalForms, setMessageType, setInfoMessage, setShowMessage } =
        useContext(CultivosContext);
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarAplicacionHerbicida] = useMutation<boolean>(ELIMINAR_APLICACION_HERBICIDA);
    const [eliminarAplicacionesHerbicidas] =
        useMutation<GetDeleteAplicacionesHerbicidasResponse>(ELIMINAR_APLICACIONES_HERBICIDAS);

    const submitDelete = async () => {
        try {
            if (aplicacionHerbicidaEdit?.hasOwnProperty('id_aphe')) {
                await eliminarAplicacionHerbicida({
                    variables: {
                        idAphe: (aplicacionHerbicidaEdit as AplicacionHerbicidas)?.id_aphe
                    },
                    refetchQueries: [
                        { query: OBTENER_APLICACIONES_HERBICIDAS },
                        {
                            query: OBTENER_APLICACIONES_HERBICIDAS_CORTE,
                            variables: { corteId: id_corte }
                        }
                    ]
                });
            } else {
                await eliminarAplicacionesHerbicidas({
                    variables: {
                        idAplicacionesHerbicidas: (aplicacionHerbicidaEdit as AplicacionesHerbicidas)?.id_aplicaciones_herbicidas
                    },
                    refetchQueries: [
                        {
                            query: OBTENER_APLICACIONES_HERBICIDAS_CORTE,
                            variables: { corteId: (aplicacionHerbicidaEdit as AplicacionesHerbicidas)?.corte_id }
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
                {aplicacionHerbicidaEdit?.hasOwnProperty('id_aphe') && (
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

export default AplicacionHerbicidaDelete;
