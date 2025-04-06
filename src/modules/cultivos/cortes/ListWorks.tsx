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
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import ListTablones from '../tablones/ListTablones';

interface Props {}

const ListWorks: React.FC<Props> = () => {
    const { estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { typeModal, openModalList, header, buttonName, setOpenModalList, setOpenModal, setFormType } =
        useContext(CultivosContext);
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
    const visibleButton = () =>
        estado && rol === 1 && typeModal !== 'tablon' && typeModal !== 'cosecha' && typeModal !== 'riegos';
    return (
        <SideModal isOpen={openModalList} handleClose={() => setOpenModalList(false)} direction={'bottom'}>
            <Grid2 container spacing={2} padding={2}>
                <Grid2 size={12} marginTop={1} display="flex" justifyContent="center">
                    {visibleButton() && (
                        <Button
                            onClick={() => setOpenModal(true)}
                            variant="contained"
                            color="primary"
                            sx={{ position: 'absolute', left: 15 }}
                        >
                            {buttonName}
                        </Button>
                    )}
                    <Typography variant="h4" component="h4" color="text.primary" textAlign="center" className="max-lg:!mt-16">
                        {header}
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
