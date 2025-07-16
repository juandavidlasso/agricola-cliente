import { Cosecha } from '@interfaces/cultivos/cosechas';
import { DataType } from '@interfaces/cultivos/labores';
import { useState } from 'react';

export const useCosecha = () => {
    const [cosechaEdit, setCosechaEdit] = useState<Cosecha>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [formType, setFormType] = useState<DataType>('create');

    return {
        cosechaEdit,
        openModal,
        formType,
        setCosechaEdit,
        setOpenModal,
        setFormType
    };
};
