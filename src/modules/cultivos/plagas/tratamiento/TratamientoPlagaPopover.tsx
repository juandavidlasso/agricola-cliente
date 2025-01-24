import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import DialogModal from '@components/Dialog';
import TratamientoPlagaRegister from './TratamientoPlagaRegister';
import TratamientoPlagaDelete from './TratamientoPlagaDelete';
import AplicacionPlagaDelete from '../aplicacion/AplicacionPlagaDelete';
import AplicacionPlagaActualizar from '../aplicacion/AplicacionPlagaActualizar';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const LazyListSuertesTablones = dynamic(() => import('../aplicacion/ListSuertesTablones'), {
    ssr: false
});

interface Props {}

const TratamientoPlagaPopover: React.FC<Props> = ({}) => {
    const { openModal, title, height, dataType, tratamientoPlagaEdit, formType, setOpenModal } = useContext(CultivosContext);

    return (
        <DialogModal isOpen={openModal} handleClose={() => setOpenModal(false)} title={title} height={height}>
            {dataType === 'tratamiento' ? (
                formType === 'delete' ? (
                    <TratamientoPlagaDelete />
                ) : (
                    <TratamientoPlagaRegister tratamientoPlaga={tratamientoPlagaEdit} />
                )
            ) : formType === 'create' ? (
                <LazyListSuertesTablones />
            ) : formType === 'update' ? (
                <AplicacionPlagaActualizar />
            ) : (
                <AplicacionPlagaDelete />
            )}
        </DialogModal>
    );
};

export default TratamientoPlagaPopover;
