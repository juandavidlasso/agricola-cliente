import React, { useContext, useEffect } from 'react';
import DialogModal from '@components/Dialog';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import LluviasDelete from './LluviasDelete';
import LluviaRegister from './LluviaRegister';
import PluviometroButton from '../pluviometro/PluviometroButton';

interface Props {}

const LluviasPopover: React.FC<Props> = ({}) => {
    const { openModalLluvia, title, type, lluviaEdit, setOpenModalLluvia, setSelectedLluvias } = useContext(PluviometroContext);
    useEffect(() => {
        return () => setSelectedLluvias([]);
    }, []);
    return (
        <DialogModal isOpen={openModalLluvia} handleClose={() => setOpenModalLluvia(false)} title={title} height={60}>
            {type === 'delete' ? (
                <LluviasDelete />
            ) : type === 'aplicar' ? (
                <PluviometroButton />
            ) : (
                <LluviaRegister lluvia={lluviaEdit} />
            )}
        </DialogModal>
    );
};

export default LluviasPopover;
