import React from 'react';
import DialogModal from '@components/Dialog';
import ListSuertes from '../registroDatos/suertes/ListSuertes';
import { AplicacionLabores, DataType, Labores } from '@interfaces/cultivos/labores';
import LaborRegister from './LaborRegister';

interface Props {
    handleClose: () => void;
    handleSubmitLabor: (corteId: number) => Promise<void>;
    laborEdit: AplicacionLabores | undefined;
    formType: DataType;
    setFormType: React.Dispatch<React.SetStateAction<DataType>>;
    setLaborDuplicate: React.Dispatch<React.SetStateAction<Labores | undefined>>;
}

const PopoverSuertesLabores: React.FC<Props> = ({
    handleClose,
    handleSubmitLabor,
    setFormType,
    setLaborDuplicate,
    laborEdit,
    formType
}) => {
    return (
        <DialogModal
            isOpen={true}
            handleClose={handleClose}
            title={formType === 'duplicate' ? 'Duplicar labor' : 'Selecciona la suerte y el corte'}
            height={90}
            id="modal-suertes"
            width="80%"
        >
            {formType === 'duplicate' ? (
                <LaborRegister
                    formType={formType}
                    onClose={handleClose}
                    labor={laborEdit}
                    setFormType={setFormType}
                    setLaborDuplicate={setLaborDuplicate}
                />
            ) : (
                <ListSuertes handleSubmit={(corteId: number) => handleSubmitLabor(corteId)} />
            )}
        </DialogModal>
    );
};

export default PopoverSuertesLabores;
