import React from 'react';
import DialogModal from '@components/Dialog';
import ListLabores from '../registroDatos/components/labores/ListLabores';
import ListAplicacionHerbicidas from '../registroDatos/components/herbicidas/ListAplicacionHerbicidas';
import ListAplicacionFertilizantes from '../registroDatos/components/fertilizantes/ListAplicacionFertilizantes';
import ListTratamientoPlagas from '../plagas/tratamiento/ListTratamientoPlagas';
import RiegoRegister from '../riegos/RiegoRegister';
import CosechaRegister from '../cosecha/CosechaRegister';

interface Props {
    title: string;
    handleClose: () => void;
    isOpen: boolean;
    type: 'labores' | 'herbicidas' | 'fertilizantes' | 'plagas' | 'riegos' | 'cosecha';
    width?: string;
}

const ModalActions: React.FC<Props> = ({ title, handleClose, isOpen, type, width }) => {
    const getComponent = () => {
        if (type === 'labores') return <ListLabores />;
        if (type === 'herbicidas') return <ListAplicacionHerbicidas />;
        if (type === 'fertilizantes') return <ListAplicacionFertilizantes />;
        if (type === 'plagas') return <ListTratamientoPlagas />;
        if (type === 'riegos') return <RiegoRegister handleClose={handleClose} />;
        if (type === 'cosecha') return <CosechaRegister handleClose={handleClose} />;
        return <></>;
    };
    const getHeight = () => {
        if (type === 'labores') return 90;
        if (type === 'herbicidas' || type === 'fertilizantes' || type === 'plagas') return 80;
        if (type === 'riegos') return 55;
        if (type === 'cosecha') return 75;
        return 50;
    };
    return (
        <DialogModal isOpen={isOpen} handleClose={handleClose} title={title} height={getHeight()} width={width}>
            {getComponent()}
        </DialogModal>
    );
};

export default ModalActions;
