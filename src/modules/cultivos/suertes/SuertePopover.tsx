import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import UpdateSuerte from './UpdateSuerte';
import DeleteSuerte from './DeleteSuerte';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const SuertePopover: React.FC<Props> = () => {
    const { openModal, formType, setOpenModal } = useContext(CultivosContext);
    return (
        <DialogModal
            isOpen={openModal}
            handleClose={() => setOpenModal(false)}
            title={formType === 'delete' ? 'Eliminar Suerte' : formType === 'update' ? 'Actualizar Suerte' : 'Renovar Suerte'}
            height={formType === 'delete' ? 60 : 80}
            id="modal-suerte"
        >
            {formType === 'delete' ? <DeleteSuerte /> : <UpdateSuerte />}
        </DialogModal>
    );
};

export default SuertePopover;
