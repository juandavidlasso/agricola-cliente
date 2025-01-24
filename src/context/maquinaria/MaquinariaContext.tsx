import { createContext, ReactNode, useState } from 'react';
import { DataType } from '../cultivos/CultivosContext';
import { AlertType } from '@interfaces/alerts';
import { Maquinaria } from '@interfaces/maquinaria';
import { Insumo } from '@interfaces/insumos';
import { AplicacionMantenimiento } from '@interfaces/mantenimientos/aplicaciones';
import { Mantenimiento } from '@interfaces/mantenimientos/mantenimiento';

interface MaquinariaState {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    type: DataType;
    setType: React.Dispatch<React.SetStateAction<DataType>>;
    showMessage: boolean;
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
    infoMessage: string;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    messageType: AlertType;
    setMessageType: React.Dispatch<React.SetStateAction<AlertType>>;
    maquinariaEdit: Maquinaria | undefined;
    setMaquinariaEdit: React.Dispatch<React.SetStateAction<Maquinaria | undefined>>;
    formType: FormType;
    setFormType: React.Dispatch<React.SetStateAction<FormType>>;
    openModalInsumos: boolean;
    setOpenModalInsumos: React.Dispatch<React.SetStateAction<boolean>>;
    insumoEdit: Insumo | undefined;
    setInsumoEdit: React.Dispatch<React.SetStateAction<Insumo | undefined>>;
    aplicacionMantenimientoEdit: AplicacionMantenimiento | undefined;
    setAplicacionMantenimientoEdit: React.Dispatch<React.SetStateAction<AplicacionMantenimiento | undefined>>;
    mantenimientoEdit: Mantenimiento | undefined;
    setMantenimientoEdit: React.Dispatch<React.SetStateAction<Mantenimiento | undefined>>;
}

export const MaquinariaContext = createContext<MaquinariaState>({
    openModal: false,
    setOpenModal: () => false,
    height: 0,
    setHeight: () => 0,
    title: '',
    setTitle: () => '',
    type: 'update',
    setType: () => '',
    showMessage: false,
    setShowMessage: () => false,
    infoMessage: '',
    setInfoMessage: () => '',
    messageType: 'success',
    setMessageType: () => '',
    maquinariaEdit: undefined,
    setMaquinariaEdit: () => undefined,
    formType: 'maquinaria',
    setFormType: () => '',
    openModalInsumos: false,
    setOpenModalInsumos: () => false,
    insumoEdit: undefined,
    setInsumoEdit: () => undefined,
    aplicacionMantenimientoEdit: undefined,
    setAplicacionMantenimientoEdit: () => undefined,
    mantenimientoEdit: undefined,
    setMantenimientoEdit: () => undefined
});

export type FormType = 'maquinaria' | 'insumo' | 'aplicacion' | 'mantenimiento';

export const MaquinariaProvider = ({ children }: { children: ReactNode }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<DataType>('create');
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<AlertType>('success');
    const [maquinariaEdit, setMaquinariaEdit] = useState<Maquinaria>();
    const [formType, setFormType] = useState<FormType>('maquinaria');
    const [openModalInsumos, setOpenModalInsumos] = useState<boolean>(false);
    const [insumoEdit, setInsumoEdit] = useState<Insumo>();
    const [aplicacionMantenimientoEdit, setAplicacionMantenimientoEdit] = useState<AplicacionMantenimiento>();
    const [mantenimientoEdit, setMantenimientoEdit] = useState<Mantenimiento>();

    return (
        <MaquinariaContext.Provider
            value={{
                openModal,
                height,
                title,
                type,
                showMessage,
                infoMessage,
                messageType,
                maquinariaEdit,
                formType,
                openModalInsumos,
                insumoEdit,
                aplicacionMantenimientoEdit,
                mantenimientoEdit,
                setOpenModal,
                setHeight,
                setTitle,
                setType,
                setShowMessage,
                setInfoMessage,
                setMessageType,
                setMaquinariaEdit,
                setFormType,
                setOpenModalInsumos,
                setInsumoEdit,
                setAplicacionMantenimientoEdit,
                setMantenimientoEdit
            }}
        >
            {children}
        </MaquinariaContext.Provider>
    );
};
