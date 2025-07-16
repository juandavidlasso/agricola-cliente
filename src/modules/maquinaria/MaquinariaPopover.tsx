import React from 'react';
import DialogModal from '@components/Dialog';
import InsumoRegister from '@modules/insumos/InsumoRegister';
import InsumoDelete from '@modules/insumos/InsumoDelete';
import AplicacionMantenimientoDelete from '@modules/mantenimientos/aplicaciones/AplicacionMantenimientoDelete';
import AplicacionMantenimientoRegister from '@modules/mantenimientos/aplicaciones/AplicacionMantenimientoRegister';
import MantenimientoRegister from '@modules/mantenimientos/mantenimiento/MantenimientoRegister';
import MantenimientoUpdate from '@modules/mantenimientos/mantenimiento/MantenimientoUpdate';
import MantenimientoDelete from '@modules/mantenimientos/mantenimiento/MantenimientoDelete';
import { FormType } from '@interfaces/maquinaria';
import { Mantenimiento } from '@interfaces/mantenimientos/mantenimiento';
import { AplicacionMantenimiento } from '@interfaces/mantenimientos/aplicaciones';
import { Insumo } from '@interfaces/insumos';

interface Props {
    handleClose: () => void;
    typeModal: FormType;
    formType: 'delete' | 'create' | 'update';
    mantenimiento: Mantenimiento | undefined;
    aplicacionMantenimiento: AplicacionMantenimiento | undefined;
    insumo: Insumo | undefined;
}

const MaquinariaPopover: React.FC<Props> = ({
    handleClose,
    typeModal,
    formType,
    mantenimiento,
    aplicacionMantenimiento,
    insumo
}) => {
    const getTitle = () => {
        if (typeModal === 'insumo') {
            if (formType === 'delete') return 'Eliminar insumo';
            return formType === 'create' ? 'Registrar insumo' : 'Actualizar insumo';
        }
        if (typeModal === 'aplicacion') {
            if (formType === 'delete') return 'Eliminar aplicación mantenimiento';
            return formType === 'create' ? 'Registrar aplicación mantenimiento' : 'Actualizar aplicación mantenimiento';
        }
        if (typeModal === 'mantenimiento') {
            if (formType === 'delete') return 'Eliminar mantenimiento';
            if (formType === 'create') return 'Registrar mantenimiento';
            if (formType === 'update') return 'Actualizar mantenimiento';
        }
        return '';
    };
    const getHeight = () => {
        if ((typeModal === 'insumo' || typeModal === 'mantenimiento') && formType !== 'delete') return 90;
        if (typeModal === 'aplicacion' && formType !== 'delete') return 70;
        return 50;
    };
    const getComponent = () => {
        if (typeModal === 'insumo') {
            if (formType === 'delete') return <InsumoDelete insumo={insumo} handleClose={handleClose} />;
            return <InsumoRegister formType={formType} insumo={insumo} handleClose={handleClose} />;
        }
        if (typeModal === 'aplicacion') {
            if (formType === 'delete')
                return (
                    <AplicacionMantenimientoDelete aplicacionMantenimiento={aplicacionMantenimiento} handleClose={handleClose} />
                );
            return (
                <AplicacionMantenimientoRegister
                    formType={formType}
                    aplicacionMantenimiento={aplicacionMantenimiento}
                    handleClose={handleClose}
                />
            );
        }
        if (typeModal === 'mantenimiento') {
            if (formType === 'delete') return <MantenimientoDelete mantenimiento={mantenimiento} handleClose={handleClose} />;
            if (formType === 'create')
                return <MantenimientoRegister aplicacionMantenimiento={aplicacionMantenimiento} handleClose={handleClose} />;
            if (formType === 'update') return <MantenimientoUpdate mantenimiento={mantenimiento} handleClose={handleClose} />;
        }
        return <></>;
    };
    return (
        <DialogModal
            id="modal-maquinaria"
            isOpen={true}
            handleClose={handleClose}
            title={getTitle()}
            height={getHeight()}
            width={formType === 'delete' ? '50%' : '70%'}
        >
            {getComponent()}
        </DialogModal>
    );
};

export default MaquinariaPopover;
