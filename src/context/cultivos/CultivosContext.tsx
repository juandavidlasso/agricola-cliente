import { createContext, useState } from 'react';
import { AlertType } from '@interfaces/alerts';

interface CultivosState {
    showMessage: boolean;
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
    infoMessage: string;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    messageType: AlertType;
    setMessageType: React.Dispatch<React.SetStateAction<AlertType>>;
    openModalList: boolean;
    setOpenModalList: React.Dispatch<React.SetStateAction<boolean>>;
    typeModal: DataTypeModal;
    setTypeModal: React.Dispatch<React.SetStateAction<DataTypeModal>>;
    validateCosecha: boolean;
    setValidateCosecha: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CultivosContext = createContext<CultivosState>({
    showMessage: false,
    setShowMessage: () => false,
    infoMessage: '',
    setInfoMessage: () => '',
    messageType: 'success',
    setMessageType: () => '',
    openModalList: false,
    setOpenModalList: () => false,
    typeModal: '',
    setTypeModal: () => '',
    validateCosecha: false,
    setValidateCosecha: () => false
});

export type DataType = 'create' | 'update' | 'delete' | 'aplicar' | 'duplicar';
type DataTypeModal = 'labores' | 'herbicidas' | 'fertilizantes' | 'plagas' | 'riegos' | 'cosecha' | 'corte' | 'tablon' | '';

export const CultivosProvider = ({ children }: { children: JSX.Element }) => {
    //Globals
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<AlertType>('success');
    const [openModalList, setOpenModalList] = useState<boolean>(false);
    const [typeModal, setTypeModal] = useState<DataTypeModal>('');
    const [validateCosecha, setValidateCosecha] = useState<boolean>(false);

    return (
        <CultivosContext.Provider
            value={{
                showMessage,
                infoMessage,
                messageType,
                openModalList,
                typeModal,
                validateCosecha,
                setShowMessage,
                setInfoMessage,
                setMessageType,
                setOpenModalList,
                setTypeModal,
                setValidateCosecha
            }}
        >
            {children}
        </CultivosContext.Provider>
    );
};
