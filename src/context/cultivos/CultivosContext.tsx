import { createContext, useState } from 'react';
import { AlertType } from '@interfaces/alerts';
import { AplicacionFertilizante } from '@interfaces/cultivos/fertilizantes/aplicacion';
import { TratamientoFertilizante } from '@interfaces/cultivos/fertilizantes/tratamientos';
import { AplicacionHerbicidas } from '@interfaces/cultivos/herbicidas/aplicacion';
import { TratamientoHerbicidas } from '@interfaces/cultivos/herbicidas/tratamientos';
import { TratamientoPlaga } from '@interfaces/cultivos/plagas/tratamiento';
import { AplicacionPlaga } from '@interfaces/cultivos/plagas/aplicacion';
import { Labores } from '@interfaces/cultivos/labores';
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
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    formType: DataType;
    setFormType: React.Dispatch<React.SetStateAction<DataType>>;
    // Fertilizantes
    dataType: DataTypeApplication;
    setDataType: React.Dispatch<React.SetStateAction<DataTypeApplication>>;
    aplicacionFertilizanteEdit: AplicacionFertilizante | undefined;
    setAplicacionFertilizanteEdit: React.Dispatch<React.SetStateAction<AplicacionFertilizante | undefined>>;
    tratamientoFertilizanteEdit: TratamientoFertilizante | undefined;
    setTratamientoFertilizanteEdit: React.Dispatch<React.SetStateAction<TratamientoFertilizante | undefined>>;
    selectedAplicacionFertilizantes: number[];
    setSelectedAplicacionFertilizantes: React.Dispatch<React.SetStateAction<number[]>>;
    // Herbicidas
    aplicacionHerbicidaEdit: AplicacionHerbicidas | undefined;
    setAplicacionHerbicidaEdit: React.Dispatch<React.SetStateAction<AplicacionHerbicidas | undefined>>;
    tratamientoHerbicidaEdit: TratamientoHerbicidas | undefined;
    setTratamientoHerbicidaEdit: React.Dispatch<React.SetStateAction<TratamientoHerbicidas | undefined>>;
    selectedAplicacionHerbicidas: number[];
    setSelectedAplicacionHerbicidas: React.Dispatch<React.SetStateAction<number[]>>;
    // Labores
    editLabor: Labores | undefined;
    setEditLabor: React.Dispatch<React.SetStateAction<Labores | undefined>>;
    selectedLabores: number[];
    setSelectedLabores: React.Dispatch<React.SetStateAction<number[]>>;
    // Plagas
    tratamientoPlagaEdit: TratamientoPlaga | undefined;
    setTratamientoPlagaEdit: React.Dispatch<React.SetStateAction<TratamientoPlaga | undefined>>;
    aplicacionPlagaEdit: AplicacionPlaga | undefined;
    setAplicacionPlagaEdit: React.Dispatch<React.SetStateAction<AplicacionPlaga | undefined>>;
    // Suertes
    type: ModalDataType;
    setType: React.Dispatch<React.SetStateAction<ModalDataType>>;
    riegoEdit: Riego | undefined;
    setRiegoEdit: React.Dispatch<React.SetStateAction<Riego | undefined>>;
    cosechaEdit: Cosecha | undefined;
    setCosechaEdit: React.Dispatch<React.SetStateAction<Cosecha | undefined>>;
    duplicate: boolean;
    setDuplicate: React.Dispatch<React.SetStateAction<boolean>>;
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
    title: '',
    setTitle: () => '',
    height: 0,
    setHeight: () => 0,
    formType: 'update',
    setFormType: () => '',
    // Fertilizantes
    dataType: '',
    setDataType: () => '',
    aplicacionFertilizanteEdit: undefined,
    setAplicacionFertilizanteEdit: () => undefined,
    tratamientoFertilizanteEdit: undefined,
    setTratamientoFertilizanteEdit: () => undefined,
    selectedAplicacionFertilizantes: [],
    setSelectedAplicacionFertilizantes: () => [],
    // Herbicidas
    aplicacionHerbicidaEdit: undefined,
    setAplicacionHerbicidaEdit: () => undefined,
    tratamientoHerbicidaEdit: undefined,
    setTratamientoHerbicidaEdit: () => undefined,
    selectedAplicacionHerbicidas: [],
    setSelectedAplicacionHerbicidas: () => [],
    // Labores
    editLabor: undefined,
    setEditLabor: () => undefined,
    selectedLabores: [],
    setSelectedLabores: () => [],
    // Plagas
    tratamientoPlagaEdit: undefined,
    setTratamientoPlagaEdit: () => undefined,
    aplicacionPlagaEdit: undefined,
    setAplicacionPlagaEdit: () => undefined,
    // Suertes
    type: 'labores',
    setType: () => '',
    // Riegos
    riegoEdit: undefined,
    setRiegoEdit: () => undefined,
    // Cosecha
    cosechaEdit: undefined,
    setCosechaEdit: () => undefined,
    // Duplicate
    duplicate: false,
    setDuplicate: () => false
});

export type DataType = 'create' | 'update' | 'delete' | 'aplicar' | 'duplicar';
export type ModalDataType = '' | 'labores' | 'herbicidas' | 'fertilizantes';
export type DataTypeApplication = 'aplicacion' | 'tratamiento' | 'suertes' | '';

export const CultivosProvider = ({ children }: { children: JSX.Element }) => {
    //Globals
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<AlertType>('success');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [height, setHeight] = useState<number>(0);
    const [formType, setFormType] = useState<DataType>('create');
    // Fertilizantes
    const [dataType, setDataType] = useState<DataTypeApplication>('');
    const [aplicacionFertilizanteEdit, setAplicacionFertilizanteEdit] = useState<AplicacionFertilizante>();
    const [tratamientoFertilizanteEdit, setTratamientoFertilizanteEdit] = useState<TratamientoFertilizante>();
    const [selectedAplicacionFertilizantes, setSelectedAplicacionFertilizantes] = useState<number[]>([]);
    // Herbicidas
    const [aplicacionHerbicidaEdit, setAplicacionHerbicidaEdit] = useState<AplicacionHerbicidas>();
    const [tratamientoHerbicidaEdit, setTratamientoHerbicidaEdit] = useState<TratamientoHerbicidas>();
    const [selectedAplicacionHerbicidas, setSelectedAplicacionHerbicidas] = useState<number[]>([]);
    // Labores
    const [editLabor, setEditLabor] = useState<Labores>();
    const [selectedLabores, setSelectedLabores] = useState<number[]>([]);
    // Plagas
    const [tratamientoPlagaEdit, setTratamientoPlagaEdit] = useState<TratamientoPlaga>();
    const [aplicacionPlagaEdit, setAplicacionPlagaEdit] = useState<AplicacionPlaga>();
    // Suertes
    const [type, setType] = useState<ModalDataType>('');
    // Riegos
    const [riegoEdit, setRiegoEdit] = useState<Riego>();
    // Cosecha
    const [cosechaEdit, setCosechaEdit] = useState<Cosecha>();
    // Duplicate
    const [duplicate, setDuplicate] = useState<boolean>(false);

    return (
        <CultivosContext.Provider
            value={{
                showMessage,
                infoMessage,
                messageType,
                openModal,
                title,
                height,
                formType,
                dataType,
                aplicacionFertilizanteEdit,
                tratamientoFertilizanteEdit,
                selectedAplicacionFertilizantes,
                aplicacionHerbicidaEdit,
                tratamientoHerbicidaEdit,
                selectedAplicacionHerbicidas,
                editLabor,
                selectedLabores,
                tratamientoPlagaEdit,
                aplicacionPlagaEdit,
                type,
                riegoEdit,
                cosechaEdit,
                duplicate,
                setShowMessage,
                setInfoMessage,
                setMessageType,
                setOpenModal,
                setTitle,
                setHeight,
                setFormType,
                setDataType,
                setAplicacionFertilizanteEdit,
                setTratamientoFertilizanteEdit,
                setSelectedAplicacionFertilizantes,
                setAplicacionHerbicidaEdit,
                setTratamientoHerbicidaEdit,
                setSelectedAplicacionHerbicidas,
                setEditLabor,
                setSelectedLabores,
                setTratamientoPlagaEdit,
                setAplicacionPlagaEdit,
                setType,
                setRiegoEdit,
                setCosechaEdit,
                setDuplicate
            }}
        >
            {children}
        </CultivosContext.Provider>
    );
};
