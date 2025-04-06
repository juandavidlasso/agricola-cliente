import { createContext, useState } from 'react';
import { AlertType } from '@interfaces/alerts';
import { AplicacionFertilizante } from '@interfaces/cultivos/fertilizantes/aplicacion';
import { TratamientoFertilizante } from '@interfaces/cultivos/fertilizantes/tratamientos';
import { AplicacionHerbicidas } from '@interfaces/cultivos/herbicidas/aplicacion';
import { TratamientoHerbicidas } from '@interfaces/cultivos/herbicidas/tratamientos';
import { TratamientoPlaga } from '@interfaces/cultivos/plagas/tratamiento';
import { AplicacionPlaga } from '@interfaces/cultivos/plagas/aplicacion';
import { AplicacionLabores, Labores } from '@interfaces/cultivos/labores';
import { Riego } from '@interfaces/cultivos/riegos';
import { Cosecha } from '@interfaces/cultivos/cosechas';
import { AplicacionesHerbicidas } from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';
import { AplicacionesFertilizantes } from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';

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
    totalItems: number[];
    setTotalItems: React.Dispatch<React.SetStateAction<number[]>>;
    // Fertilizantes
    dataType: DataTypeApplication;
    setDataType: React.Dispatch<React.SetStateAction<DataTypeApplication>>;
    aplicacionFertilizanteEdit: AplicacionFertilizante | AplicacionesFertilizantes | undefined;
    setAplicacionFertilizanteEdit: React.Dispatch<
        React.SetStateAction<AplicacionFertilizante | AplicacionesFertilizantes | undefined>
    >;
    tratamientoFertilizanteEdit: TratamientoFertilizante | undefined;
    setTratamientoFertilizanteEdit: React.Dispatch<React.SetStateAction<TratamientoFertilizante | undefined>>;
    selectedAplicacionFertilizantes: number[];
    setSelectedAplicacionFertilizantes: React.Dispatch<React.SetStateAction<number[]>>;
    // Herbicidas
    aplicacionHerbicidaEdit: AplicacionHerbicidas | AplicacionesHerbicidas | undefined;
    setAplicacionHerbicidaEdit: React.Dispatch<React.SetStateAction<AplicacionHerbicidas | AplicacionesHerbicidas | undefined>>;
    tratamientoHerbicidaEdit: TratamientoHerbicidas | undefined;
    setTratamientoHerbicidaEdit: React.Dispatch<React.SetStateAction<TratamientoHerbicidas | undefined>>;
    selectedAplicacionHerbicidas: number[];
    setSelectedAplicacionHerbicidas: React.Dispatch<React.SetStateAction<number[]>>;
    // Labores
    editLabor: Labores | AplicacionLabores | undefined;
    setEditLabor: React.Dispatch<React.SetStateAction<Labores | AplicacionLabores | undefined>>;
    selectedLabores: number[];
    setSelectedLabores: React.Dispatch<React.SetStateAction<number[]>>;
    // Plagas
    tratamientoPlagaEdit: TratamientoPlaga | undefined;
    setTratamientoPlagaEdit: React.Dispatch<React.SetStateAction<TratamientoPlaga | undefined>>;
    aplicacionPlagaEdit: AplicacionPlaga | undefined;
    setAplicacionPlagaEdit: React.Dispatch<React.SetStateAction<AplicacionPlaga | undefined>>;
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
    totalItems: [],
    setTotalItems: () => [],
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
export type DataTypeApplication = 'aplicacion' | 'tratamiento' | '';
export type DataTypeModal =
    | 'labores'
    | 'herbicidas'
    | 'fertilizantes'
    | 'plagas'
    | 'riegos'
    | 'cosecha'
    | 'corte'
    | 'tablon'
    | '';

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
    const [totalItems, setTotalItems] = useState<number[]>([]);
    // Fertilizantes
    const [dataType, setDataType] = useState<DataTypeApplication>('');
    const [aplicacionFertilizanteEdit, setAplicacionFertilizanteEdit] = useState<
        AplicacionFertilizante | AplicacionesFertilizantes | undefined
    >();
    const [tratamientoFertilizanteEdit, setTratamientoFertilizanteEdit] = useState<TratamientoFertilizante>();
    const [selectedAplicacionFertilizantes, setSelectedAplicacionFertilizantes] = useState<number[]>([]);
    // Herbicidas
    const [aplicacionHerbicidaEdit, setAplicacionHerbicidaEdit] = useState<
        AplicacionHerbicidas | AplicacionesHerbicidas | undefined
    >();
    const [tratamientoHerbicidaEdit, setTratamientoHerbicidaEdit] = useState<TratamientoHerbicidas>();
    const [selectedAplicacionHerbicidas, setSelectedAplicacionHerbicidas] = useState<number[]>([]);
    // Labores
    const [editLabor, setEditLabor] = useState<Labores | AplicacionLabores | undefined>();
    const [selectedLabores, setSelectedLabores] = useState<number[]>([]);
    // Plagas
    const [tratamientoPlagaEdit, setTratamientoPlagaEdit] = useState<TratamientoPlaga>();
    const [aplicacionPlagaEdit, setAplicacionPlagaEdit] = useState<AplicacionPlaga>();
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
                dataType,
                typeModal,
                header,
                buttonName,
                totalItems,
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
                setDataType,
                setTypeModal,
                setHeader,
                setButtonName,
                setTotalItems,
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
                setRiegoEdit,
                setCosechaEdit,
                setValidateCosecha
            }}
        >
            {children}
        </CultivosContext.Provider>
    );
};
