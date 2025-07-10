import React from 'react';
import DialogModal from '@components/Dialog';
import LaborDelete from './LaborDelete';
import LaborRegister from './LaborRegister';
import { AplicacionLabores, DataType } from '@interfaces/cultivos/labores';

interface Props {
    handleClose: () => void;
    formType: DataType;
    laborEdit: AplicacionLabores | undefined;
}

const PopoverLabores: React.FC<Props> = ({ handleClose, laborEdit, formType }) => {
    const getTitle = () => {
        if (formType === 'create') return 'Registrar labor';
        if (formType === 'update') return 'Actualizar labor';
        return 'Eliminar labor';
    };
    return (
        <DialogModal
            isOpen={true}
            handleClose={handleClose}
            title={getTitle()}
            height={formType === 'delete' ? 40 : 90}
            width={formType === 'delete' ? '40%' : '70%'}
            id="modal-registros"
        >
            {formType === 'delete' ? (
                <LaborDelete labor={laborEdit} onClose={handleClose} />
            ) : (
                <LaborRegister formType={formType} labor={laborEdit} onClose={handleClose} />
            )}
        </DialogModal>
    );
};

export default PopoverLabores;
