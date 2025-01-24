import React, { useContext } from 'react';
import { AplicacionLabores } from '@interfaces/cultivos/labores';
import DialogModal from '@components/Dialog';
import AplicacionLaborDelete from '../labores/AplicacionLaborDelete';
import { InformationContext, TypeData } from 'src/context/cultivos/information/InformationContext';
import AplicacionesHerbicidasDelete from '../herbicidas/AplicacionesHerbicidasDelete';
import { AplicacionesHerbicidas } from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';
import AplicacionesFertilizantesDelete from '../fertilizantes/AplicacionesFertilizantesDelete';
import { AplicacionesFertilizantes } from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    title: string;
    height?: number;
    data?: TypeData<undefined>;
}

const DeleteInformationPopover: React.FC<Props> = ({ isOpen, handleClose, title, height, data }) => {
    const { formType } = useContext(InformationContext);

    return (
        <DialogModal isOpen={isOpen} handleClose={handleClose} title={title} height={height}>
            {formType === 'labores' ? (
                <AplicacionLaborDelete handleClose={handleClose} data={data as AplicacionLabores} />
            ) : formType === 'herbicidas' ? (
                <AplicacionesHerbicidasDelete handleClose={handleClose} data={data as AplicacionesHerbicidas} />
            ) : (
                <AplicacionesFertilizantesDelete handleClose={handleClose} data={data as AplicacionesFertilizantes} />
            )}
        </DialogModal>
    );
};

export default DeleteInformationPopover;
