import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import DialogModal from '@components/Dialog';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import LaborDelete from '../labores/LaborDelete';
import LaborRegister from '../labores/LaborRegister';
import AplicacionHerbicidaDelete from '../herbicidas/AplicacionHerbicidaDelete';
import AplicacionHerbicidaRegister from '../herbicidas/AplicacionHerbicidaRegister';
import TratamientoHerbicidaDelete from '../herbicidas/tratamientos/TratamientoHerbicidaDelete';
import TratamientoHerbicidaRegister from '../herbicidas/tratamientos/TratamientoHerbicidaRegister';
import AplicacionFertilizanteDelete from '../fertilizantes/AplicacionFertilizanteDelete';
import AplicacionFertilizanteRegister from '../fertilizantes/AplicacionFertilizanteRegister';
import TratamientoFertilizanteDelete from '../fertilizantes/tratamientos/TratamientoFertilizanteDelete';
import TratamientoFertilizanteRegister from '../fertilizantes/tratamientos/TratamientoFertilizanteRegister';

const LazyListSuertesRenovadas = dynamic(() => import('./ListSuertes'), {
    ssr: false,
    loading: () => <Loading />
});

interface Props {
    handleSubmit: (corteId: number) => Promise<void>;
}

const SuertesPopover: React.FC<Props> = ({ handleSubmit }) => {
    const { type, formType, openModal, title, height, dataType, setOpenModal } = useContext(CultivosContext);
    const getComponent = () => {
        if (type === 'labores') {
            if (dataType === 'suertes') return <LazyListSuertesRenovadas handleSubmit={handleSubmit} />;
            if (formType === 'delete') return <LaborDelete />;
            return <LaborRegister />;
        }
        if (type === 'herbicidas') {
            if (dataType === 'suertes') return <LazyListSuertesRenovadas handleSubmit={handleSubmit} />;
            if (dataType === 'aplicacion') {
                if (formType === 'delete') return <AplicacionHerbicidaDelete />;
                return <AplicacionHerbicidaRegister />;
            }
            if (dataType === 'tratamiento') {
                if (formType === 'delete') return <TratamientoHerbicidaDelete />;
                return <TratamientoHerbicidaRegister />;
            }
        }
        if (type === 'fertilizantes') {
            if (dataType === 'suertes') return <LazyListSuertesRenovadas handleSubmit={handleSubmit} />;
            if (dataType === 'aplicacion') {
                if (formType === 'delete') return <AplicacionFertilizanteDelete />;
                return <AplicacionFertilizanteRegister />;
            }
            if (dataType === 'tratamiento') {
                if (formType === 'delete') return <TratamientoFertilizanteDelete />;
                return <TratamientoFertilizanteRegister />;
            }
        }
        return <></>;
    };
    return (
        <DialogModal isOpen={openModal} handleClose={() => setOpenModal(false)} title={title} height={height}>
            {getComponent()}
        </DialogModal>
    );
};

export default SuertesPopover;
