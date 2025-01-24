import { useContext, useState } from 'react';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

export const useActions = () => {
    const { setFormType: setFormTypeAction } = useContext(CultivosContext);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openSide, setOpenSide] = useState<boolean>(false);
    const [openModalActions, setOpenModalActions] = useState<boolean>(false);
    const [header, setHeader] = useState<string>('');
    const [formType, setFormType] = useState<'corte' | 'tablon'>('corte');
    //
    const [openListWorks, setOpenListWorks] = useState<boolean>(false);
    const [typeWork, setTypeWork] = useState<'labores' | 'herbicidas' | 'fertilizantes' | 'plagas' | 'riegos' | 'cosecha'>(
        'labores'
    );

    const handleClose = () => setOpenModal(false);

    const handleCloseSide = () => setOpenSide(false);

    const handleCloseListWorks = () => setOpenListWorks(false);

    const handleOpenListWorks = () => setOpenListWorks(true);

    const handleOpenModalActions = () => {
        if (typeWork === 'riegos') {
            setFormTypeAction('create');
        }
        setOpenModalActions(true);
    };

    const handleCloseModalActions = () => setOpenModalActions(false);

    const corteActions = [
        {
            id: 1,
            name: 'Editar Corte',
            action: () => {
                setHeader('Editar Corte');
                setFormType('corte');
                setOpenModal(true);
            }
        },
        {
            id: 2,
            name: 'Registrar Tablón',
            action: () => {
                setHeader('Registrar Tablón');
                setFormType('tablon');
                setOpenModal(true);
            }
        },
        {
            id: 3,
            name: 'Ver Tablones',
            action: () => {
                setOpenSide(true);
            }
        }
    ];

    return {
        openModal,
        openSide,
        header,
        formType,
        setOpenModal,
        setOpenSide,
        corteActions,
        handleClose,
        handleCloseSide,
        openListWorks,
        handleCloseListWorks,
        handleOpenListWorks,
        typeWork,
        setTypeWork,
        openModalActions,
        handleOpenModalActions,
        handleCloseModalActions
    };
};
