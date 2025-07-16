import { DataType } from '@interfaces/cultivos/labores';
import { useState } from 'react';

export const useSuerte = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [formType, setFormType] = useState<DataType>('create');
    return {
        openModal,
        formType,
        setOpenModal,
        setFormType
    };
};
