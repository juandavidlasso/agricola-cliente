import { useState } from 'react';

export const useActions = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [header, setHeader] = useState<string>('');
    const [formType, setFormType] = useState<'renovar' | 'editar' | 'eliminar'>('renovar');
    const [typeData, setTypeData] = useState<'corte' | 'suerte' | ''>('');

    const handleClose = () => setOpenModal(false);

    const handleRegisterCorte = () => {
        setHeader('Registrar corte');
        setTypeData('corte');
        setOpenModal(true);
    };

    const suerteActions = [
        {
            id: 1,
            name: 'Renovar Suerte',
            action: () => {
                setHeader('Renovar Suerte');
                setFormType('renovar');
                setTypeData('suerte');
                setOpenModal(true);
            }
        },
        {
            id: 2,
            name: 'Editar Suerte',
            action: () => {
                setHeader('Editar Suerte');
                setFormType('editar');
                setTypeData('suerte');
                setOpenModal(true);
            }
        },
        {
            id: 3,
            name: 'Eliminar Suerte',
            action: () => {
                setHeader('Eliminar Suerte');
                setFormType('eliminar');
                setTypeData('suerte');
                setOpenModal(true);
            }
        }
    ];

    return {
        typeData,
        openModal,
        header,
        formType,
        suerteActions,
        setOpenModal,
        handleClose,
        handleRegisterCorte
    };
};
