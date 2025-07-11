import { createContext, useState } from 'react';
import { AlertType } from '@interfaces/alerts';
import { TratamientoPlaga } from '@interfaces/cultivos/plagas/tratamiento';
import { AplicacionPlaga } from '@interfaces/cultivos/plagas/aplicacion';
import { Riego } from '@interfaces/cultivos/riegos';
import { Cosecha } from '@interfaces/cultivos/cosechas';

interface CultivosState {
    showMessage: boolean;
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
    infoMessage: string;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    messageType: AlertType;
    setMessageType: React.Dispatch<React.SetStateAction<AlertType>>;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    openModalList: boolean;
    setOpenModalList: React.Dispatch<React.SetStateAction<boolean>>;
    openModalSuertes: boolean;
    setOpenModalSuertes: React.Dispatch<React.SetStateAction<boolean>>;
    openModalForms: boolean;
    setOpenModalForms: React.Dispatch<React.SetStateAction<boolean>>;
    formType: DataType;
    setFormType: React.Dispatch<React.SetStateAction<DataType>>;
    typeModal: DataTypeModal;
    setTypeModal: React.Dispatch<React.SetStateAction<DataTypeModal>>;
    header: string;
    setHeader: React.Dispatch<React.SetStateAction<string>>;
    buttonName: string;
    setButtonName: React.Dispatch<React.SetStateAction<string>>;
    // Riegos
    riegoEdit: Riego | undefined;
    setRiegoEdit: React.Dispatch<React.SetStateAction<Riego | undefined>>;
    // Cosecha
    cosechaEdit: Cosecha | undefined;
    setCosechaEdit: React.Dispatch<React.SetStateAction<Cosecha | undefined>>;
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
    openModal: false,
    setOpenModal: () => false,
    openModalList: false,
    setOpenModalList: () => false,
    openModalSuertes: false,
    setOpenModalSuertes: () => false,
    openModalForms: false,
    setOpenModalForms: () => false,
    formType: 'update',
    setFormType: () => '',
    typeModal: '',
    setTypeModal: () => '',
    header: '',
    setHeader: () => '',
    buttonName: '',
    setButtonName: () => '',
    // Riegos
    riegoEdit: undefined,
    setRiegoEdit: () => undefined,
    // Cosecha
    cosechaEdit: undefined,
    setCosechaEdit: () => undefined,
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
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalList, setOpenModalList] = useState<boolean>(false);
    const [openModalSuertes, setOpenModalSuertes] = useState<boolean>(false);
    const [openModalForms, setOpenModalForms] = useState<boolean>(false);
    const [formType, setFormType] = useState<DataType>('create');
    const [typeModal, setTypeModal] = useState<DataTypeModal>('');
    const [header, setHeader] = useState<string>('');
    const [buttonName, setButtonName] = useState<string>('');
    // Riegos
    const [riegoEdit, setRiegoEdit] = useState<Riego>();
    // Cosecha
    const [cosechaEdit, setCosechaEdit] = useState<Cosecha>();
    const [validateCosecha, setValidateCosecha] = useState<boolean>(false);

    return (
        <CultivosContext.Provider
            value={{
                showMessage,
                infoMessage,
                messageType,
                openModal,
                openModalList,
                openModalSuertes,
                openModalForms,
                formType,
                typeModal,
                header,
                buttonName,
                riegoEdit,
                cosechaEdit,
                validateCosecha,
                setShowMessage,
                setInfoMessage,
                setMessageType,
                setOpenModal,
                setOpenModalList,
                setOpenModalSuertes,
                setOpenModalForms,
                setFormType,
                setTypeModal,
                setHeader,
                setButtonName,
                setRiegoEdit,
                setCosechaEdit,
                setValidateCosecha
            }}
        >
            {children}
        </CultivosContext.Provider>
    );
};
