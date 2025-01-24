import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import { MaquinariaContext } from 'src/context/maquinaria/MaquinariaContext';
import MaquinariaRegister from './MaquinariaRegister';
import InsumoRegister from '@modules/insumos/InsumoRegister';
import InsumoDelete from '@modules/insumos/InsumoDelete';
import AplicacionMantenimientoDelete from '@modules/mantenimientos/aplicaciones/AplicacionMantenimientoDelete';
import AplicacionMantenimientoRegister from '@modules/mantenimientos/aplicaciones/AplicacionMantenimientoRegister';
import MantenimientoRegister from '@modules/mantenimientos/mantenimiento/MantenimientoRegister';
import MantenimientoUpdate from '@modules/mantenimientos/mantenimiento/MantenimientoUpdate';
import MantenimientoDelete from '@modules/mantenimientos/mantenimiento/MantenimientoDelete';

interface Props {}

const MaquinariaPopover: React.FC<Props> = ({}) => {
    const { openModal, title, height, type, formType, setOpenModal } = useContext(MaquinariaContext);
    const getComponent = () => {
        if (formType === 'maquinaria') return <MaquinariaRegister />;
        if (formType === 'insumo') {
            if (type === 'delete') return <InsumoDelete />;
            return <InsumoRegister />;
        }
        if (formType === 'aplicacion') {
            if (type === 'delete') return <AplicacionMantenimientoDelete />;
            return <AplicacionMantenimientoRegister />;
        }
        if (formType === 'mantenimiento') {
            if (type === 'delete') return <MantenimientoDelete />;
            if (type === 'create') return <MantenimientoRegister />;
            if (type === 'update') return <MantenimientoUpdate />;
        }
        return <></>;
    };
    return (
        <DialogModal
            isOpen={openModal}
            handleClose={() => setOpenModal(false)}
            title={title}
            height={height}
            width={formType === 'mantenimiento' && type !== 'delete' ? '70%' : '50%'}
        >
            {getComponent()}
        </DialogModal>
    );
};

export default MaquinariaPopover;
