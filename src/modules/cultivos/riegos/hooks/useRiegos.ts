import { useState } from 'react';
import { DataType } from '@interfaces/cultivos/labores';
import { Riego } from '@interfaces/cultivos/riegos';

export const useRiegos = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [formType, setFormType] = useState<DataType>('create');
    const [riegoEdit, setRiegoEdit] = useState<Riego>();

    return {
        openModal,
        formType,
        riegoEdit,
        setOpenModal,
        setFormType,
        setRiegoEdit
    };
};
