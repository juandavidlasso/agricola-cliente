import { useState } from 'react';

export const useActionsTablones = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [header, setHeader] = useState<string>('');
    const [formType, setFormType] = useState<'editar' | 'eliminar'>('editar');

    const onEdit = () => {
        setHeader('Actualizar Tablon');
        setFormType('editar');
        setOpenModal(true);
    };

    const onDelete = () => {
        setHeader('Eliminar Tablon');
        setFormType('eliminar');
        setOpenModal(true);
    };

    const onClose = () => setOpenModal(false);

    return {
        openModal,
        header,
        formType,
        onEdit,
        onDelete,
        onClose
    };
};
