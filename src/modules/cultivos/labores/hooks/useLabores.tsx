import { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { REGISTRAR_LABORES_CORTES } from '@graphql/mutations';
import { AplicacionLabores, DataType, GetRegisterAplicacionLabor, Labores } from '@interfaces/cultivos/labores';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { OBTENER_APLICACIONES_LABORES } from '@graphql/queries';

export const useLabores = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalSuertes, setModalSuertes] = useState<boolean>(false);
    const [laborEdit, setLaborEdit] = useState<AplicacionLabores>();
    const [laborDuplicate, setLaborDuplicate] = useState<Labores>();
    const [formType, setFormType] = useState<DataType>('create');

    const { setInfoMessage, setMessageType, setShowMessage } = useContext(CultivosContext);
    const [agregarAplicacionLabores] = useMutation<GetRegisterAplicacionLabor>(REGISTRAR_LABORES_CORTES);

    const handleSubmitLabor = async (corteId: number) => {
        try {
            const { data } = await agregarAplicacionLabores({
                variables: {
                    createAplicacionLaboresInput: [
                        {
                            corte_id: corteId,
                            labor_id: formType === 'create' ? laborEdit?.labor_id : laborDuplicate?.id_labor
                        }
                    ]
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_LABORES, variables: { corteId } }]
            });

            if (
                data?.agregarAplicacionLabores.includes(formType === 'create' ? laborEdit?.labor_id! : laborDuplicate?.id_labor!)
            ) {
                setMessageType('success');
                setInfoMessage(`La labor se aplico exitosamente.`);
                setShowMessage(true);
            } else {
                setMessageType('error');
                setInfoMessage(`La labor ya esta aplicada en el corte seleccionado.`);
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
        openModal,
        modalSuertes,
        laborEdit,
        formType,
        setOpenModal,
        setModalSuertes,
        setLaborEdit,
        setFormType,
        handleSubmitLabor,
        setLaborDuplicate
    };
};
