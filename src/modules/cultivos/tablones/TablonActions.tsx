import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import TablonActualizar from './TablonActualizar';
import TablonEliminar from './TablonEliminar';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    title: string;
    formType: 'renovar' | 'editar' | 'eliminar';
}

const TablonActions: React.FC<Props> = ({ isOpen, handleClose, title, formType }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    return (
        <DialogModal isOpen={isOpen} handleClose={handleClose} title={title} height={60}>
            {formType === 'editar' ? (
                <TablonActualizar
                    handleClose={handleClose}
                    setMessageType={setMessageType}
                    setInfoMessage={setInfoMessage}
                    setShowMessage={setShowMessage}
                />
            ) : (
                <TablonEliminar
                    handleClose={handleClose}
                    setMessageType={setMessageType}
                    setInfoMessage={setInfoMessage}
                    setShowMessage={setShowMessage}
                />
            )}
        </DialogModal>
    );
};

export default TablonActions;
