import React from 'react';
import DialogModal from '@components/Dialog';
import AplicacionHerbicidaDelete from './AplicacionHerbicidaDelete';
import AplicacionHerbicidaRegister from './AplicacionHerbicidaRegister';
import TratamientoHerbicidaDelete from './tratamientos/TratamientoHerbicidaDelete';
import TratamientoHerbicidaRegister from './tratamientos/TratamientoHerbicidaRegister';
import { AplicacionesHerbicidas } from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';
import { TratamientoHerbicidas } from '@interfaces/cultivos/herbicidas/tratamientos';

interface Props {
    handleClose: () => void;
    formType: 'delete' | 'update' | 'create';
    typeModal: 'aplicacion' | 'tratamiento';
    aplicacionHerbicidaEdit: AplicacionesHerbicidas;
    tratamientoHerbicida: TratamientoHerbicidas;
}

const PopoverHerbicida: React.FC<Props> = ({
    handleClose,
    formType,
    typeModal,
    aplicacionHerbicidaEdit,
    tratamientoHerbicida
}) => {
    const getTitle = () => {
        if (typeModal === 'aplicacion') {
            if (formType === 'create') return 'Registrar aplicación herbicida';
            if (formType === 'update') return 'Actualizar aplicación herbicida';
            return 'Eliminar tratamiento herbicida';
        }
        if (formType === 'create') return 'Registrar tratamiento herbicida';
        if (formType === 'update') return 'Actualizar tratamiento herbicida';
        return 'Eliminar tratamiento herbicida';
    };
    const getHeight = () => {
        if (typeModal === 'aplicacion') {
            if (formType === 'delete') return 50;
            return 60;
        }
        if (formType === 'delete') return 40;
        return 90;
    };
    const getComponent = () => {
        if (typeModal === 'aplicacion') {
            if (formType === 'delete')
                return <AplicacionHerbicidaDelete aplicacionHerbicida={aplicacionHerbicidaEdit!} handleClose={handleClose} />;
            return (
                <AplicacionHerbicidaRegister
                    aplicacionesHerbicida={aplicacionHerbicidaEdit}
                    handleClose={handleClose}
                    formType={formType}
                />
            );
        }
        if (formType === 'delete')
            return <TratamientoHerbicidaDelete tratamientoHerbicida={tratamientoHerbicida!} handleClose={handleClose} />;
        return (
            <TratamientoHerbicidaRegister
                tratamientoHerbicida={tratamientoHerbicida!}
                aplicacionesHerbicida={aplicacionHerbicidaEdit}
                handleClose={handleClose}
                formType={formType}
            />
        );
    };
    return (
        <DialogModal
            isOpen={true}
            handleClose={handleClose}
            title={getTitle()}
            height={getHeight()}
            width={formType === 'delete' ? '40%' : '70%'}
            id="modal-registros'herbicidas"
        >
            {getComponent()}
        </DialogModal>
    );
};

export default PopoverHerbicida;
