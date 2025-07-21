import DialogModal from '@components/Dialog';
import { AplicacionesFertilizantes } from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';
import { TratamientoFertilizante } from '@interfaces/cultivos/fertilizantes/tratamientos';
import React from 'react';
import AplicacionFertilizanteDelete from './AplicacionFertilizanteDelete';
import AplicacionFertilizanteRegister from './AplicacionFertilizanteRegister';
import TratamientoFertilizanteDelete from './tratamientos/TratamientoFertilizanteDelete';
import TratamientoFertilizanteRegister from './tratamientos/TratamientoFertilizanteRegister';

interface Props {
    handleClose: () => void;
    formType: 'delete' | 'update' | 'create' | 'duplicate';
    typeModal: 'aplicacion' | 'tratamiento';
    aplicacionFertilizanteEdit: AplicacionesFertilizantes;
    tratamientoFertilizante: TratamientoFertilizante;
    idFertilizante: number | undefined;
}

const PopoverFertilizante: React.FC<Props> = ({
    handleClose,
    formType,
    typeModal,
    aplicacionFertilizanteEdit,
    tratamientoFertilizante,
    idFertilizante
}) => {
    const getTitle = () => {
        if (typeModal === 'aplicacion') {
            if (formType === 'create') return 'Registrar aplicación fertilizante';
            if (formType === 'update') return 'Actualizar aplicación fertilizante';
            if (formType === 'duplicate') return 'Duplicar aplicación fertilizante';
            return 'Eliminar aplicación fertilizante';
        }
        if (formType === 'create') return 'Registrar tratamiento fertilizante';
        if (formType === 'update') return 'Actualizar tratamiento fertilizante';
        return 'Eliminar tratamiento fertilizante';
    };
    const getHeight = () => {
        if (typeModal === 'aplicacion') {
            if (formType === 'delete') return 50;
            return 60;
        }
        if (formType === 'delete') return 45;
        return 90;
    };
    const getComponent = () => {
        if (typeModal === 'aplicacion') {
            if (formType === 'delete')
                return (
                    <AplicacionFertilizanteDelete aplicacionFertilizante={aplicacionFertilizanteEdit} handleClose={handleClose} />
                );
            return (
                <AplicacionFertilizanteRegister
                    formType={formType}
                    aplicacionFertilizante={aplicacionFertilizanteEdit}
                    handleClose={handleClose}
                />
            );
        }
        if (formType === 'delete')
            return <TratamientoFertilizanteDelete tratamientoFertilizante={tratamientoFertilizante} handleClose={handleClose} />;
        return (
            <TratamientoFertilizanteRegister
                formType={formType}
                idFertilizante={idFertilizante}
                tratamientoFertilizante={tratamientoFertilizante}
                handleClose={handleClose}
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

export default PopoverFertilizante;
