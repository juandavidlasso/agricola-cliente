import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import PluviometroRegister from './PluviometroRegister';
import Lluvias from './Lluvias';
import AplicacionLluviaDelete from '../lluvias/AplicacionLluviaDelete';

interface Props {}

const PluviometroPopover: React.FC<Props> = ({}) => {
    const { openModal, formType, height, title, type, setOpenModal } = useContext(PluviometroContext);
    return (
        <DialogModal
            isOpen={openModal}
            handleClose={() => setOpenModal(false)}
            title={title}
            height={height}
            width={formType === 'pluviometro' || type === 'delete' ? '50%' : '70%'}
        >
            {formType === 'pluviometro' ? <PluviometroRegister /> : type === 'delete' ? <AplicacionLluviaDelete /> : <Lluvias />}
        </DialogModal>
    );
};

export default PluviometroPopover;
