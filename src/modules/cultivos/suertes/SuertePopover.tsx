import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import UpdateSuerte from './UpdateSuerte';
import DeleteSuerte from './DeleteSuerte';
import CorteActualizar from '../cortes/CorteActualizar';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    title: string;
    formType: 'renovar' | 'editar' | 'eliminar';
    typeData: '' | 'corte' | 'suerte';
}

const SuertePopover: React.FC<Props> = ({ isOpen, handleClose, title, formType, typeData }) => {
    const { setMessageType, setShowMessage, setInfoMessage } = useContext(CultivosContext);
    return (
        <DialogModal isOpen={isOpen} handleClose={handleClose} title={title} height={formType === 'eliminar' ? 60 : 80}>
            {typeData === 'suerte' ? (
                formType === 'eliminar' ? (
                    <DeleteSuerte
                        handleClose={handleClose}
                        setMessageType={setMessageType}
                        setShowMessage={setShowMessage}
                        setInfoMessage={setInfoMessage}
                    />
                ) : (
                    <UpdateSuerte
                        formType={formType}
                        handleClose={handleClose}
                        setMessageType={setMessageType}
                        setShowMessage={setShowMessage}
                        setInfoMessage={setInfoMessage}
                    />
                )
            ) : (
                <CorteActualizar
                    handleClose={handleClose}
                    setMessageType={setMessageType}
                    setShowMessage={setShowMessage}
                    setInfoMessage={setInfoMessage}
                />
            )}
        </DialogModal>
    );
};

export default SuertePopover;
