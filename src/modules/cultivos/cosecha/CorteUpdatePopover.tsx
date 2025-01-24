import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import CorteUpdate from './CorteUpdate';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import CosechaRegister from './CosechaRegister';

interface Props {}

const CorteUpdatePopover: React.FC<Props> = ({}) => {
    const { openModal, title, height, formType, setOpenModal } = useContext(CultivosContext);
    return (
        <DialogModal isOpen={openModal} handleClose={() => setOpenModal(false)} title={title} height={height} closeBack={false}>
            {formType === 'update' ? <CosechaRegister handleClose={() => setOpenModal(false)} /> : <CorteUpdate />}
        </DialogModal>
    );
};

export default CorteUpdatePopover;
