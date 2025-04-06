import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import SuerteForm from './SuerteForm';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

const SuerteRegister: React.FC<Props> = ({ isOpen, handleClose }) => {
    const { setInfoMessage, setMessageType, setShowMessage } = useContext(CultivosContext);
    return (
        <DialogModal isOpen={isOpen} handleClose={handleClose} title="Registrar suerte" height={80} id="modal-form">
            <SuerteForm
                handleClose={handleClose}
                setInfoMessage={setInfoMessage}
                setMessageType={setMessageType}
                setShowMessage={setShowMessage}
            />
        </DialogModal>
    );
};

export default SuerteRegister;
