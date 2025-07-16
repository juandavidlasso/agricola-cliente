import { createContext, useState } from 'react';
import { Lluvia, LluviasYAplicacion } from '@interfaces/lluvias';
import { DataType } from '../cultivos/CultivosContext';
import { FormDataFilters } from '@modules/pluviometros/constants/constants';
import { AplicacionLluvia } from '@interfaces/lluvias/aplicacion';

interface PluviometroState {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    openModalReport: boolean;
    setOpenModalReport: React.Dispatch<React.SetStateAction<boolean>>;
    formType: FormTypePluviometro;
    setFormType: React.Dispatch<React.SetStateAction<FormTypePluviometro>>;
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
    openModal: false,
    setOpenModal: () => false,
    openModalReport: false,
    setOpenModalReport: () => false,
    formType: '',
    setFormType: () => '',
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
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalReport, setOpenModalReport] = useState<boolean>(false);
    const [formType, setFormType] = useState<FormTypePluviometro>('');
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
                openModal,
                openModalReport,
                formType,
                type,
                pluviometroId,
                lluviaEdit,
                filtersLluvia,
                reportType,
                aplicacionLluviaEdit,
                arrayLluvias,
                isEnabled,
                setOpenModal,
                setOpenModalReport,
                setFormType,
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
