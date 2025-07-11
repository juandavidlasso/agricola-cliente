import React from 'react';
import DialogModal from '@components/Dialog';
import ListSuertesTablones from './aplicacion/ListSuertesTablones';
import TratamientoPlagaDelete from './tratamiento/TratamientoPlagaDelete';
import TratamientoPlagaRegister from './tratamiento/TratamientoPlagaRegister';
import { DataTypePlaga, TratamientoPlaga } from '@interfaces/cultivos/plagas/tratamiento';
import AplicacionPlagaDelete from './aplicacion/AplicacionPlagaDelete';
import { AplicacionPlaga } from '@interfaces/cultivos/plagas/aplicacion';
import AplicacionPlagaActualizar from './aplicacion/AplicacionPlagaActualizar';

interface Props {
    handleClose: () => void;
    formType: DataTypePlaga;
    typeModal: 'aplicacion' | 'tratamiento';
    tratamientoPlaga: TratamientoPlaga | undefined;
    aplicacionPlaga: AplicacionPlaga | undefined;
}

const PopoverPlagas: React.FC<Props> = ({ formType, typeModal, tratamientoPlaga, aplicacionPlaga, handleClose }) => {
    const getTitle = () => {
        if (formType === 'aplicar') return 'Seleccione la suerte, el corte y el tablón para aplicar el tratamiento';
        if (typeModal === 'tratamiento') {
            if (formType === 'create') return 'Registrar tratamiento plaga';
            if (formType === 'update') return 'Actualizar tratamiento plaga';
            return 'Eliminar tratamiento plaga';
        }
        if (typeModal === 'aplicacion') {
            if (formType === 'create') return 'Registrar aplicación plaga';
            if (formType === 'update') return 'Actualizar aplicación plaga';
            return 'Eliminar aplicación plaga';
        }
        return '';
    };
    const getHeight = () => {
        if (formType === 'delete') return 50;
        if (formType === 'update' && typeModal === 'aplicacion') return 50;
        return 90;
    };
    const getWidth = () => {
        if (formType === 'aplicar') return '90%';
        return '50%';
    };
    const getComponent = () => {
        if (formType === 'aplicar') return <ListSuertesTablones tratamientoPlaga={tratamientoPlaga} />;
        if (typeModal === 'tratamiento') {
            if (formType === 'delete')
                return <TratamientoPlagaDelete tratamientoPlaga={tratamientoPlaga} handleClose={handleClose} />;
            return <TratamientoPlagaRegister tratamientoPlaga={tratamientoPlaga} formType={formType} handleClose={handleClose} />;
        }
        if (typeModal === 'aplicacion') {
            if (formType === 'delete')
                return <AplicacionPlagaDelete aplicacionPlaga={aplicacionPlaga} handleClose={handleClose} />;
            return <AplicacionPlagaActualizar aplicacionPlaga={aplicacionPlaga} handleClose={handleClose} />;
        }
        return <></>;
    };
    return (
        <DialogModal
            isOpen={true}
            handleClose={handleClose}
            title={getTitle()}
            height={getHeight()}
            width={getWidth()}
            id="modal-registros'herbicidas"
        >
            {getComponent()}
        </DialogModal>
    );
};

export default PopoverPlagas;
