import { createContext, useState } from 'react';
import { AlertType } from '@interfaces/alerts';
import { Lluvia, LluviasYAplicacion } from '@interfaces/lluvias';
import { DataType } from '../cultivos/CultivosContext';
import { FormDataFilters } from '@modules/pluviometros/constants/constants';
import { AplicacionLluvia } from '@interfaces/lluvias/aplicacion';

interface PluviometroState {
    showMessage: boolean;
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
    infoMessage: string;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    messageType: AlertType;
    setMessageType: React.Dispatch<React.SetStateAction<AlertType>>;
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    openModalReport: boolean;
    setOpenModalReport: React.Dispatch<React.SetStateAction<boolean>>;
    formType: FormTypePluviometro;
    setFormType: React.Dispatch<React.SetStateAction<FormTypePluviometro>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    type: DataType;
    setType: React.Dispatch<React.SetStateAction<DataType>>;
    pluviometroId: number;
    setPluviometroId: React.Dispatch<React.SetStateAction<number>>;
    lluviaEdit: Lluvia | undefined;
    setLluviaEdit: React.Dispatch<React.SetStateAction<Lluvia | undefined>>;
    filtersLluvia: FormDataFilters | undefined;
    setFiltersLluvia: React.Dispatch<React.SetStateAction<FormDataFilters>>;
    reportType: FormTypeReport;
    setReportType: React.Dispatch<React.SetStateAction<FormTypeReport>>;
    aplicacionLluviaEdit: AplicacionLluvia | undefined;
    setAplicacionLluviaEdit: React.Dispatch<React.SetStateAction<AplicacionLluvia | undefined>>;
    arrayLluvias: LluviasYAplicacion[];
    setArrayLluvias: React.Dispatch<React.SetStateAction<LluviasYAplicacion[]>>;
    isEnabled: boolean;
    setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export type FormTypePluviometro = 'pluviometro' | 'lluvia' | '';
export type FormTypeReport = 'mes' | 'year';

export const PluviometroContext = createContext<PluviometroState>({
    showMessage: false,
    setShowMessage: () => false,
    infoMessage: '',
    setInfoMessage: () => '',
    messageType: 'success',
    setMessageType: () => '',
    openModal: false,
    setOpenModal: () => false,
    openModalReport: false,
    setOpenModalReport: () => false,
    formType: '',
    setFormType: () => '',
    height: 0,
    setHeight: () => 0,
    title: '',
    setTitle: () => '',
    type: 'update',
    setType: () => '',
    pluviometroId: 0,
    setPluviometroId: () => 0,
    lluviaEdit: undefined,
    setLluviaEdit: () => undefined,
    filtersLluvia: undefined,
    setFiltersLluvia: () => undefined,
    reportType: 'mes',
    setReportType: () => '',
    aplicacionLluviaEdit: undefined,
    setAplicacionLluviaEdit: () => undefined,
    arrayLluvias: [],
    setArrayLluvias: () => [],
    isEnabled: false,
    setIsEnabled: () => false
});

export const PluviometroProvider = ({ children }: { children: JSX.Element }) => {
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<AlertType>('success');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalReport, setOpenModalReport] = useState<boolean>(false);
    const [formType, setFormType] = useState<FormTypePluviometro>('');
    const [height, setHeight] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<DataType>('create');
    const [pluviometroId, setPluviometroId] = useState<number>(0);
    const [lluviaEdit, setLluviaEdit] = useState<Lluvia>();
    const [aplicacionLluviaEdit, setAplicacionLluviaEdit] = useState<AplicacionLluvia>();
    const [filtersLluvia, setFiltersLluvia] = useState<FormDataFilters>({
        month: 0,
        year: 0
    });
    const [reportType, setReportType] = useState<FormTypeReport>('mes');
    const [arrayLluvias, setArrayLluvias] = useState<LluviasYAplicacion[]>([]);
    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    return (
        <PluviometroContext.Provider
            value={{
                showMessage,
                infoMessage,
                messageType,
                openModal,
                openModalReport,
                formType,
                height,
                title,
                type,
                pluviometroId,
                lluviaEdit,
                filtersLluvia,
                reportType,
                aplicacionLluviaEdit,
                arrayLluvias,
                isEnabled,
                setShowMessage,
                setInfoMessage,
                setMessageType,
                setOpenModal,
                setOpenModalReport,
                setFormType,
                setHeight,
                setTitle,
                setType,
                setPluviometroId,
                setLluviaEdit,
                setFiltersLluvia,
                setReportType,
                setAplicacionLluviaEdit,
                setArrayLluvias,
                setIsEnabled
            }}
        >
            {children}
        </PluviometroContext.Provider>
    );
};
