import React, { useContext } from 'react';
import { Button, Grid2, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SideModal from '@components/Side';
import ListAplicacionesLabores from '../labores/ListAplicacionesLabores';
import ListAplicacionesHerbicidas from '../herbicidas/ListAplicacionesHerbicidas';
import ListAplicacionesFertilizantes from '../fertilizantes/ListAplicacionesFertilizantes';
import ListPlagas from '../plagas/ListPlagas';
import ListRiegos from '../riegos/ListRiegos';
import ListCosecha from '../cosecha/ListCosecha';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import ListTablones from '../tablones/ListTablones';

interface Props {}

const ListWorks: React.FC<Props> = () => {
    const { typeModal, openModalList, setOpenModalList } = useContext(CultivosContext);
    const getComponentList = () => {
        if (typeModal === 'tablon') return <ListTablones />;
        if (typeModal === 'labores') return <ListAplicacionesLabores />;
        if (typeModal === 'herbicidas') return <ListAplicacionesHerbicidas />;
        if (typeModal === 'fertilizantes') return <ListAplicacionesFertilizantes />;
        if (typeModal === 'plagas') return <ListPlagas />;
        if (typeModal === 'riegos') return <ListRiegos />;
        if (typeModal === 'cosecha') return <ListCosecha />;
        return <></>;
    };
    const getTitle = () => {
        if (typeModal === 'tablon') return 'Listado de Tablones';
        if (typeModal === 'labores') return 'Listado de Labores';
        if (typeModal === 'herbicidas') return 'Listado de Herbicidas';
        if (typeModal === 'fertilizantes') return 'Listado de Fertilizantes';
        if (typeModal === 'plagas') return 'Plagas y enfermedades';
        if (typeModal === 'riegos') return 'Riegos';
        if (typeModal === 'cosecha') return 'Cosechas';
        return '';
    };
    return (
        <SideModal isOpen={openModalList} handleClose={() => setOpenModalList(false)} direction={'bottom'}>
            <Grid2 container spacing={2} padding={2}>
                <Grid2 size={12} marginTop={1} display="flex" justifyContent="center">
                    <Typography variant="h4" component="h4" color="text.primary" textAlign="center" className="max-lg:!mt-16">
                        {getTitle()}
                    </Typography>
                    <Button variant="outlined" onClick={() => setOpenModalList(false)} sx={{ position: 'absolute', right: 5 }}>
                        <CloseIcon />
                    </Button>
                </Grid2>
                <Grid2 size={12}>{getComponentList()}</Grid2>
            </Grid2>
        </SideModal>
    );
};

export default ListWorks;
