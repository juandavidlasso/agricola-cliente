import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import PluviometroRegister from './PluviometroRegister';
import Lluvias from './Lluvias';
// import AplicacionLluviaDelete from '../lluvias/AplicacionLluviaDelete';
import LluviasDelete from '../lluvias/LluviasDelete';

interface Props {}

const PluviometroPopover: React.FC<Props> = ({}) => {
    const { openModal, formType, height, title, type, setOpenModal } = useContext(PluviometroContext);
    const getComponent = () => {
        if (formType === 'pluviometro') {
            if (type === 'create') return <PluviometroRegister />;
        }
        if (formType === 'lluvia') {
            if (type === 'delete') return <LluviasDelete />;
        }
        return <Lluvias />;
    };
    return (
        <DialogModal
            isOpen={openModal}
            handleClose={() => setOpenModal(false)}
            title={title}
            height={height}
            width={formType === '' ? '70%' : '50%'}
        >
            {getComponent()}
        </DialogModal>
    );
};

export default PluviometroPopover;
