import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import RiegoRegister from '../riegos/RiegoRegister';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {}

const ModalActions: React.FC<Props> = () => {
    const { openModal, typeModal, setOpenModal } = useContext(CultivosContext);
    const { suerte, corte } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const getComponent = () => {
        if (typeModal === 'riegos') return <RiegoRegister />;
        return <></>;
    };
    const getTitle = () => {
        if (typeModal === 'riegos') return `Registrar riego - Suerte ${suerte.nombre} - Corte ${corte.numero}`;
        return '';
    };
    const getWidth = () => (typeModal === 'riegos' ? '60%' : '95%');
    const getHeight = () => (typeModal === 'riegos' ? 50 : 90);
    return (
        <DialogModal
            isOpen={openModal}
            handleClose={() => setOpenModal(false)}
            title={getTitle()}
            height={getHeight()}
            width={getWidth()}
            id="modal-registros"
        >
            {getComponent()}
        </DialogModal>
    );
};

export default ModalActions;
