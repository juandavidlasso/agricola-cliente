import DialogModal from '@components/Dialog';
import React, { useContext } from 'react';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import RiegoDelete from '../riegos/RiegoDelete';
import RiegoRegister from '../riegos/RiegoRegister';
import CosechaRegister from '../cosecha/CosechaRegister';
import CorteActualizar from './CorteActualizar';
import TablonRegistrar from '../tablones/TablonRegistrar';
import TablonEliminar from '../tablones/TablonEliminar';

interface Props {}

const ModalForms: React.FC<Props> = ({}) => {
    const { openModalForms, typeModal, formType, setOpenModalForms } = useContext(CultivosContext);
    const getComponent = () => {
        let title = '';
        let height = 0;
        let width = '60%';
        let component = <></>;
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
