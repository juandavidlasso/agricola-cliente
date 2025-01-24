import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { AlertType } from '@interfaces/alerts';
import { AplicacionLabores, Labores } from '@interfaces/cultivos/labores';
import { AplicacionesHerbicidas } from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';
import { AplicacionesFertilizantes } from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';

interface InformationState {
    showMessage: boolean;
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
    infoMessage: string;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    messageType: AlertType;
    setMessageType: React.Dispatch<React.SetStateAction<AlertType>>;
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    deleteData: AplicacionLabores | AplicacionesHerbicidas | AplicacionesFertilizantes | undefined;
    setDeleteData: React.Dispatch<React.SetStateAction<TypeData<undefined>>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    width: string;
    setWidth: React.Dispatch<React.SetStateAction<string>>;
    totalItems: number[];
    setTotalItems: React.Dispatch<React.SetStateAction<number[]>>;
    formType: '' | 'labores' | 'herbicidas' | 'fertilizantes';
    setFormType: React.Dispatch<React.SetStateAction<'' | 'labores' | 'herbicidas' | 'fertilizantes'>>;
}

export type TypeData<T> = T | AplicacionLabores | AplicacionesHerbicidas | AplicacionesFertilizantes | undefined;

export const InformationContext = createContext<InformationState>({
    showMessage: false,
    setShowMessage: () => false,
    infoMessage: '',
    setInfoMessage: () => '',
    messageType: 'success',
    setMessageType: () => '',
    openModal: false,
    setOpenModal: () => false,
    deleteData: undefined,
    setDeleteData: () => undefined,
    title: '',
    setTitle: () => '',
    height: 0,
    setHeight: () => 0,
    width: '',
    setWidth: () => '',
    totalItems: [],
    setTotalItems: () => [],
    formType: '',
    setFormType: () => ''
});

export const InformationProvider = ({ children }: { children: JSX.Element }) => {
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<AlertType>('success');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [deleteData, setDeleteData] = useState<TypeData<undefined>>();
    const [title, setTitle] = useState<string>('');
    const [height, setHeight] = useState<number>(0);
    const [width, setWidth] = useState<string>('');
    const [totalItems, setTotalItems] = useState<number[]>([]);
    const [formType, setFormType] = useState<'' | 'labores' | 'herbicidas' | 'fertilizantes'>('');

    return (
        <InformationContext.Provider
            value={{
                showMessage,
                infoMessage,
                messageType,
                openModal,
                deleteData,
                title,
                height,
                width,
                totalItems,
                formType,
                setShowMessage,
                setInfoMessage,
                setMessageType,
                setOpenModal,
                setDeleteData,
                setTitle,
                setHeight,
                setWidth,
                setTotalItems,
                setFormType
            }}
        >
            {children}
        </InformationContext.Provider>
    );
};
