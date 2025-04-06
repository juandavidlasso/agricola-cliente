import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import CorteUpdate from './CorteUpdate';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const CorteUpdatePopover: React.FC<Props> = () => {
    const { setValidateCosecha } = useContext(CultivosContext);
    return (
        <DialogModal
            isOpen={true}
            handleClose={() => setValidateCosecha(false)}
            title={'Registre la fecha de corte'}
            height={90}
            closeBack={false}
            id="modal"
        >
            <CorteUpdate />
        </DialogModal>
    );
};

export default CorteUpdatePopover;
