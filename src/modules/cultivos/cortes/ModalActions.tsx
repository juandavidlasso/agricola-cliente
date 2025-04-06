import React, { useContext } from 'react';
import DialogModal from '@components/Dialog';
import ListLabores from '../registroDatos/components/labores/ListLabores';
import ListAplicacionHerbicidas from '../registroDatos/components/herbicidas/ListAplicacionHerbicidas';
import ListAplicacionFertilizantes from '../registroDatos/components/fertilizantes/ListAplicacionFertilizantes';
import ListTratamientoPlagas from '../plagas/tratamiento/ListTratamientoPlagas';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import RiegoRegister from '../riegos/RiegoRegister';

interface Props {}

const ModalActions: React.FC<Props> = () => {
    const { openModal, typeModal, setOpenModal } = useContext(CultivosContext);
    const getComponent = () => {
        if (typeModal === 'labores') return <ListLabores />;
        if (typeModal === 'herbicidas') return <ListAplicacionHerbicidas />;
        if (typeModal === 'fertilizantes') return <ListAplicacionFertilizantes />;
        if (typeModal === 'plagas') return <ListTratamientoPlagas />;
        if (typeModal === 'riegos') return <RiegoRegister />;
        return <></>;
    };
    const getTitle = () => {
        if (typeModal === 'labores') return 'Aplicar labor';
        if (typeModal === 'herbicidas') return 'Aplicar herbicida';
        if (typeModal === 'fertilizantes') return 'Aplicar fertilizante';
        if (typeModal === 'plagas') return 'Aplicar producto';
        if (typeModal === 'riegos') return 'Registrar riego';
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
