import { useContext } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { REGISTRAR_APLICACIONES_FERTILIZANTES } from '@graphql/mutations';
import { GetAplicacionesFertilizantesRegister } from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { OBTENER_APLICACIONES_FERTILIZANTES_CORTE } from '@graphql/queries';

export const useAplicacionesFertilizantes = () => {
    const { selectedAplicacionFertilizantes, setInfoMessage, setMessageType, setShowMessage } = useContext(CultivosContext);
    const [agregarAplicacionesFertilizantes] = useMutation<GetAplicacionesFertilizantesRegister>(
        REGISTRAR_APLICACIONES_FERTILIZANTES
    );

    const handleSubmitAplicacionesFertilizantes = async (corteId: number) => {
        let aplicacionesFertilizantes = [];

        for (let index = 0; index < selectedAplicacionFertilizantes.length; index++) {
            const obj = {
                corte_id: corteId,
                apfe_id: selectedAplicacionFertilizantes[index]
            };
            aplicacionesFertilizantes.push(obj);
        }

        try {
            const data = await agregarAplicacionesFertilizantes({
                variables: {
                    createAplicacionesFertilizanteInput: aplicacionesFertilizantes
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE, variables: { corteId } }]
            });

            if (data.data?.agregarAplicacionesFertilizantes.length !== 0) {
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
        handleSubmitAplicacionesFertilizantes
    };
};
