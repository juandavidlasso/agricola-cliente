import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import PluviometroRegister from './PluviometroRegister';
import Lluvias from './Lluvias';
import LluviasDelete from '../lluvias/LluviasDelete';

interface Props {}

const PluviometroPopover: React.FC<Props> = ({}) => {
    const { openModal, formType, type, setOpenModal } = useContext(PluviometroContext);
    const getTitle = () => {
        if (formType === 'pluviometro') return 'Registrar pluviómetro';
        if (formType === 'lluvia') return 'Eliminar lluvia';
        return 'Listado de lluvias';
    };
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
            id="modal-lluvias"
            isOpen={openModal}
            handleClose={() => setOpenModal(false)}
            title={getTitle()}
            height={formType === 'pluviometro' || formType === 'lluvia' ? 60 : 90}
            width={formType === '' ? '70%' : '50%'}
        >
            {getComponent()}
        </DialogModal>
    );
};

export default PluviometroPopover;
