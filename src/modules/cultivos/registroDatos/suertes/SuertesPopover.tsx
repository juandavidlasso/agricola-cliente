import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import ListSuertes from './ListSuertes';

interface Props {
    handleSubmit: (corteId: number) => Promise<void>;
}

const SuertesPopover: React.FC<Props> = ({ handleSubmit }) => {
    const { openModalSuertes, setOpenModalSuertes } = useContext(CultivosContext);
    return (
        <DialogModal
            isOpen={openModalSuertes}
            handleClose={() => setOpenModalSuertes(false)}
            title={'Selecciona la suerte y el corte'}
            height={90}
            id="modal-suertes"
            width="80%"
        >
            <ListSuertes handleSubmit={handleSubmit} />
        </DialogModal>
    );
};

export default SuertesPopover;
