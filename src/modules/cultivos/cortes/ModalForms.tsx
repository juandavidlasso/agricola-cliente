import DialogModal from '@components/Dialog';
import React, { useContext } from 'react';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import AplicacionFertilizanteDelete from '../registroDatos/components/fertilizantes/AplicacionFertilizanteDelete';
import AplicacionFertilizanteRegister from '../registroDatos/components/fertilizantes/AplicacionFertilizanteRegister';
import TratamientoFertilizanteDelete from '../registroDatos/components/fertilizantes/tratamientos/TratamientoFertilizanteDelete';
import TratamientoFertilizanteRegister from '../registroDatos/components/fertilizantes/tratamientos/TratamientoFertilizanteRegister';
import TratamientoPlagaRegister from '../plagas/tratamiento/TratamientoPlagaRegister';
import TratamientoPlagaDelete from '../plagas/tratamiento/TratamientoPlagaDelete';
import AplicacionPlagaDelete from '../plagas/aplicacion/AplicacionPlagaDelete';
import ListSuertesTablones from '../plagas/aplicacion/ListSuertesTablones';
import AplicacionPlagaActualizar from '../plagas/aplicacion/AplicacionPlagaActualizar';
import RiegoDelete from '../riegos/RiegoDelete';
import RiegoRegister from '../riegos/RiegoRegister';
import CosechaRegister from '../cosecha/CosechaRegister';
import CorteActualizar from './CorteActualizar';
import TablonRegistrar from '../tablones/TablonRegistrar';
import TablonEliminar from '../tablones/TablonEliminar';

interface Props {}

const ModalForms: React.FC<Props> = ({}) => {
    const { openModalForms, typeModal, formType, dataType, setOpenModalForms } = useContext(CultivosContext);
    const getComponent = () => {
        let title = '';
        let height = 0;
        let width = '60%';
        let component = <></>;
        // Fertilizantes
        if (typeModal === 'fertilizantes') {
            if (dataType === 'aplicacion') {
                if (formType === 'delete') {
                    title = 'Eliminar aplicación fertilizante';
                    height = 45;
                    component = <AplicacionFertilizanteDelete />;
                } else {
                    title =
                        formType === 'create'
                            ? 'Registrar aplicación fertilizante'
                            : formType === 'update'
                            ? 'Actualizar aplicación fertilizante'
                            : 'Duplicar aplicación fertilizante';
                    height = 60;
                    component = <AplicacionFertilizanteRegister />;
                }
            } else {
                if (formType === 'delete') {
                    title = 'Eliminar tratamiento fertilizante';
                    height = 45;
                    component = <TratamientoFertilizanteDelete />;
                } else {
                    title = formType === 'create' ? 'Registrar tratamiento fertilizante' : 'Actualizar tratamiento fertilizante';
                    height = 90;
                    component = <TratamientoFertilizanteRegister />;
                }
            }
        }
        // Plagas
        if (typeModal === 'plagas') {
            if (dataType === 'tratamiento') {
                if (formType === 'delete') {
                    title = 'Eliminar producto';
                    height = 45;
                    component = <TratamientoPlagaDelete />;
                } else {
                    title = formType === 'create' ? 'Registrar tratamiento plaga' : 'Actualizar tratamiento plaga';
                    height = 90;
                    component = <TratamientoPlagaRegister />;
                }
            } else {
                if (formType === 'delete') {
                    title = 'Eliminar aplicación plaga';
                    height = 45;
                    component = <AplicacionPlagaDelete />;
                } else {
                    if (formType === 'aplicar') {
                        title = 'Seleccione la suerte, el corte y el tablón para aplicar el tratamiento';
                        height = 90;
                        width = '80%';
                        component = <ListSuertesTablones />;
                    } else {
                        title = 'Actualizar aplicación plaga';
                        height = 50;
                        width = '50%';
                        component = <AplicacionPlagaActualizar />;
                    }
                }
            }
        }
        // Riegos
        if (typeModal === 'riegos') {
            if (formType === 'delete') {
                title = 'Eliminar riego';
                height = 45;
                component = <RiegoDelete />;
            } else {
                title = formType === 'update' ? 'Actualizar riego' : 'Registrar riego';
                height = 50;
                component = <RiegoRegister />;
            }
        }
        // Cosecha
        if (typeModal === 'cosecha') {
            title = formType === 'update' ? 'Actualizar cosecha' : 'Registrar cosecha';
            height = 85;
            component = <CosechaRegister />;
        }
        // Corte
        if (typeModal === 'corte') {
            title = formType === 'create' ? 'Registrar corte' : 'Actualizar corte';
            height = 75;
            component = <CorteActualizar />;
        }
        // Tablon
        if (typeModal === 'tablon') {
            if (formType === 'delete') {
                title = 'Eliminar tablón';
                height = 60;
                component = <TablonEliminar />;
            } else {
                title = formType === 'create' ? 'Registrar tablón' : 'Actualizar tablón';
                height = 60;
                width = '50%';
                component = <TablonRegistrar />;
            }
        }
        return {
            title,
            height,
            width,
            component
        };
    };
    return (
        <DialogModal
            isOpen={openModalForms}
            handleClose={() => setOpenModalForms(false)}
            title={getComponent().title}
            height={getComponent().height}
            width={getComponent().width}
            id="modal-forms"
        >
            {getComponent().component}
        </DialogModal>
    );
};

export default ModalForms;
