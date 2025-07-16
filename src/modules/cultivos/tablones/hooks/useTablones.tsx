import { DataType } from '@interfaces/cultivos/labores';
import { useState } from 'react';

export const useTablones = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [formType, setFormType] = useState<DataType>('create');

    return {
        openModal,
        formType,
        setOpenModal,
        setFormType
    };
};
