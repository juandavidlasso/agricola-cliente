import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ELIMINAR_APLICACION_LABOR, ELIMINAR_LABOR } from '@graphql/mutations';
import { OBTENER_APLICACIONES_LABORES, OBTENER_LABORES } from '@graphql/queries';
import { AplicacionLabores, GetDeleteAplicacionLaboresResponse, Labores } from '@interfaces/cultivos/labores';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const LaborDelete: React.FC<Props> = ({}) => {
    const { editLabor, setOpenModalForms, setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarLabor] = useMutation<boolean>(ELIMINAR_LABOR);
    const [eliminarAplicacionLabores] = useMutation<GetDeleteAplicacionLaboresResponse>(ELIMINAR_APLICACION_LABOR);
    const submitDelete = async () => {
        try {
            if (editLabor?.hasOwnProperty('id_labor')) {
                await eliminarLabor({
                    variables: {
                        idLabor: (editLabor as Labores)?.id_labor
                    },
                    refetchQueries: [{ query: OBTENER_LABORES }]
                });
            } else {
                await eliminarAplicacionLabores({
                    variables: {
                        idAplicacionLabores: (editLabor as AplicacionLabores)?.id_aplicacion_labores
                    },
                    refetchQueries: [
                        {
                            query: OBTENER_APLICACIONES_LABORES,
                            variables: { corteId: (editLabor as AplicacionLabores)?.corte_id }
                        }
                    ]
                });
            }
            setMessageType('success');
            setInfoMessage('La labor se eliminó exitosamente.');
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
                <Typography>Desea eliminar la labor?</Typography>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" color="error" onClick={submitDelete}>
                    {submitting ? <Loading /> : 'Eliminar'}
                </Button>
            </Grid2>
            <Grid2 size={6} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" color="primary" onClick={() => setOpenModalForms(false)}>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default LaborDelete;
