import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import RiegoDelete from './RiegoDelete';
import RiegoRegister from './RiegoRegister';

interface Props {}

const RiegoPopover: React.FC<Props> = ({}) => {
    const { openModal, title, height, formType, setOpenModal } = useContext(CultivosContext);
    return (
        <DialogModal isOpen={openModal} handleClose={() => setOpenModal(false)} title={title} height={height}>
            {formType === 'delete' ? <RiegoDelete /> : <RiegoRegister handleClose={() => setOpenModal(false)} />}
        </DialogModal>
    );
};

export default RiegoPopover;
