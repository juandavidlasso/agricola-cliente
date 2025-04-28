import React, { useContext, useEffect } from 'react';
import DialogModal from '@components/Dialog';
import ListLabores from '../registroDatos/components/labores/ListLabores';
import ListAplicacionHerbicidas from '../registroDatos/components/herbicidas/ListAplicacionHerbicidas';
import ListAplicacionFertilizantes from '../registroDatos/components/fertilizantes/ListAplicacionFertilizantes';
import ListTratamientoPlagas from '../plagas/tratamiento/ListTratamientoPlagas';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import RiegoRegister from '../riegos/RiegoRegister';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {}

const ModalActions: React.FC<Props> = () => {
    const {
        openModal,
        typeModal,
        setOpenModal,
        setSelectedLabores,
        setSelectedAplicacionFertilizantes,
        setSelectedAplicacionHerbicidas
    } = useContext(CultivosContext);
    const { suerte, corte } = useAppSelector((state: IRootState) => state.cultivosReducer);
    useEffect(() => {
        return () => {
            setSelectedLabores([]);
            setSelectedAplicacionFertilizantes([]);
            setSelectedAplicacionHerbicidas([]);
        };
    }, []);
    const getComponent = () => {
        if (typeModal === 'labores') return <ListLabores />;
        if (typeModal === 'herbicidas') return <ListAplicacionHerbicidas />;
        if (typeModal === 'fertilizantes') return <ListAplicacionFertilizantes />;
        if (typeModal === 'plagas') return <ListTratamientoPlagas />;
        if (typeModal === 'riegos') return <RiegoRegister />;
        return <></>;
    };
    const getTitle = () => {
        if (typeModal === 'labores') return `Aplicar labor - Suerte ${suerte.nombre} - Corte ${corte.numero}`;
        if (typeModal === 'herbicidas') return `Aplicar herbicida - Suerte ${suerte.nombre} - Corte ${corte.numero}`;
        if (typeModal === 'fertilizantes') return `Aplicar fertilizante - Suerte ${suerte.nombre} - Corte ${corte.numero}`;
        if (typeModal === 'plagas') return `Aplicar producto - Suerte ${suerte.nombre} - Corte ${corte.numero}`;
        if (typeModal === 'riegos') return `Registrar riego - Suerte ${suerte.nombre} - Corte ${corte.numero}`;
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
            styles={typeModal === 'labores' || typeModal === 'herbicidas' || typeModal === 'fertilizantes' ? '!ml-[30%]' : ''}
        >
            {getComponent()}
        </DialogModal>
    );
};

export default ModalActions;
