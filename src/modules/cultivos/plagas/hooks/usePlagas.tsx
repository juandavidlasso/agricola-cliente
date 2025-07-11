import { useState } from 'react';
import { AplicacionPlaga } from '@interfaces/cultivos/plagas/aplicacion';
import { DataTypePlaga, TratamientoPlaga } from '@interfaces/cultivos/plagas/tratamiento';

export const usePlagas = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalTratamientos, setModalTratamientos] = useState<boolean>(false);
    const [formType, setFormType] = useState<DataTypePlaga>('create');
    const [typeModal, setTypeModal] = useState<'aplicacion' | 'tratamiento'>('aplicacion');
    const [tratamientoPlagaEdit, setTratamientoPlagaEdit] = useState<TratamientoPlaga>();
    const [aplicacionPlagaEdit, setAplicacionPlagaEdit] = useState<AplicacionPlaga>();

    return {
        openModal,
        formType,
        typeModal,
        modalTratamientos,
        tratamientoPlagaEdit,
        aplicacionPlagaEdit,
        setOpenModal,
        setFormType,
        setTypeModal,
        setModalTratamientos,
        setTratamientoPlagaEdit,
        setAplicacionPlagaEdit
    };
};
