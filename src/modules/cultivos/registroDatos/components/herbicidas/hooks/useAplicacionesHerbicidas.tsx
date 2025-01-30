import { ApolloError, useMutation } from '@apollo/client';
import { REGISTRAR_APLICACIONES_HERBICIDAS } from '@graphql/mutations';
import { OBTENER_APLICACIONES_HERBICIDAS_CORTE } from '@graphql/queries';
import { GetRegistrarAplicacionesHerbicidas } from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';
import { useContext } from 'react';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

export const useAplicacionesHerbicidas = () => {
    const { selectedAplicacionHerbicidas, setInfoMessage, setMessageType, setShowMessage } = useContext(CultivosContext);
    const [agregarAplicacionesHerbicidas] = useMutation<GetRegistrarAplicacionesHerbicidas>(REGISTRAR_APLICACIONES_HERBICIDAS);

    const handleSubmitAplicacionesHerbicidas = async (corteId: number) => {
        let aplicacionesHerbicidas = [];

        for (let index = 0; index < selectedAplicacionHerbicidas.length; index++) {
            const obj = {
                corte_id: corteId,
                aphe_id: selectedAplicacionHerbicidas[index]
            };
            aplicacionesHerbicidas.push(obj);
        }

        try {
            const data = await agregarAplicacionesHerbicidas({
                variables: {
                    createAplicacionesHerbicidaInput: aplicacionesHerbicidas
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_HERBICIDAS_CORTE, variables: { corteId } }]
            });

            if (data.data?.agregarAplicacionesHerbicidas.length !== 0) {
                setMessageType('success');
                setInfoMessage(`La aplicación se aplico exitosamente.`);
                setShowMessage(true);
            } else {
                setMessageType('error');
                setInfoMessage(`La aplicación ya esta aplicada en el corte seleccionado.`);
                setShowMessage(true);
            }
        } catch (error) {
            if (error instanceof ApolloError) {
                setMessageType('error');
                setInfoMessage(error.message.replace('Error:', ''));
                setShowMessage(true);
                return;
            }
            setMessageType('error');
            setInfoMessage(error as string);
            setShowMessage(true);
            return;
        }
    };

    return {
        handleSubmitAplicacionesHerbicidas
    };
};
