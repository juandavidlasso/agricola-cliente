import { useContext } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { REGISTRAR_LABORES_CORTES } from '@graphql/mutations';
import { GetRegisterAplicacionLabor } from '@interfaces/cultivos/labores';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

export const useLabores = () => {
    const { selectedLabores, setInfoMessage, setMessageType, setShowMessage } = useContext(CultivosContext);
    const [agregarAplicacionLabores] = useMutation<GetRegisterAplicacionLabor>(REGISTRAR_LABORES_CORTES);

    const handleSubmitLabor = async (corteId: number) => {
        let aplicacionesLabores = [];

        for (let index = 0; index < selectedLabores.length; index++) {
            const obj = {
                corte_id: corteId,
                labor_id: selectedLabores[index]
            };
            aplicacionesLabores.push(obj);
        }

        try {
            const data = await agregarAplicacionLabores({
                variables: {
                    createAplicacionLaboresInput: aplicacionesLabores
                }
            });
            for (let index = 0; index < selectedLabores.length; index++) {
                if (data.data?.agregarAplicacionLabores.includes(selectedLabores[index])) {
                    setMessageType('success');
                    setInfoMessage(`La labor se aplico exitosamente.`);
                    setShowMessage(true);
                } else {
                    setMessageType('error');
                    setInfoMessage(`La labor ya esta aplicada en el corte seleccionado.`);
                    setShowMessage(true);
                }
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
        handleSubmitLabor
    };
};
