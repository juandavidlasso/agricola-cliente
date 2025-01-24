import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import CorteActualizar from './CorteActualizar';
import TablonRegistrar from '../tablones/TablonRegistrar';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    title: string;
    formType: 'corte' | 'tablon';
}

const CortePopover: React.FC<Props> = ({ isOpen, handleClose, title, formType }) => {
    const { setShowMessage, setInfoMessage, setMessageType } = useContext(CultivosContext);
    return (
        <DialogModal isOpen={isOpen} handleClose={handleClose} title={title} height={formType === 'tablon' ? 55 : 75}>
            {formType === 'corte' ? (
                <CorteActualizar
                    handleClose={handleClose}
                    setShowMessage={setShowMessage}
                    setInfoMessage={setInfoMessage}
                    setMessageType={setMessageType}
                />
            ) : (
                <TablonRegistrar
                    handleClose={handleClose}
                    setShowMessage={setShowMessage}
                    setInfoMessage={setInfoMessage}
                    setMessageType={setMessageType}
                />
            )}
        </DialogModal>
    );
};

export default CortePopover;
