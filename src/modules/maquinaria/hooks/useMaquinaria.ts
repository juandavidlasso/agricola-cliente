import { useState } from 'react';
import { Insumo } from '@interfaces/insumos';
import { AplicacionMantenimiento } from '@interfaces/mantenimientos/aplicaciones';
import { Mantenimiento } from '@interfaces/mantenimientos/mantenimiento';
import { FormType } from '@interfaces/maquinaria';

export const useMaquinaria = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalInsumos, setOpenModalInsumos] = useState<boolean>(false);
    const [formType, setFormType] = useState<'create' | 'update' | 'delete'>('create');
    const [typeModal, setTypeModal] = useState<FormType>('insumo');
    const [insumoEdit, setInsumoEdit] = useState<Insumo>();
    const [aplicacionMantenimientoEdit, setAplicacionMantenimientoEdit] = useState<AplicacionMantenimiento>();
    const [mantenimientoEdit, setMantenimientoEdit] = useState<Mantenimiento>();
    return {
        openModal,
        openModalInsumos,
        formType,
        typeModal,
        insumoEdit,
        aplicacionMantenimientoEdit,
        mantenimientoEdit,
        setOpenModal,
        setOpenModalInsumos,
        setFormType,
        setTypeModal,
        setInsumoEdit,
        setAplicacionMantenimientoEdit,
        setMantenimientoEdit
    };
};
