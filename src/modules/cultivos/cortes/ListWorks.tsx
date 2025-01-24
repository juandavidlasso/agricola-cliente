import React, { useState } from 'react';
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

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    direction: 'top' | 'bottom' | 'left' | 'right';
    title: string;
    typeWrok: 'labores' | 'herbicidas' | 'fertilizantes' | 'plagas' | 'riegos' | 'cosecha';
    name: string;
    onOpen: () => void;
}

const ListWorks: React.FC<Props> = ({ isOpen, handleClose, direction, title, typeWrok, name, onOpen }) => {
    const { estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const [isDisabled, setIsDisabled] = useState<number>(1);
    const getComponentList = () => {
        if (typeWrok === 'labores') return <ListAplicacionesLabores />;
        if (typeWrok === 'herbicidas') return <ListAplicacionesHerbicidas />;
        if (typeWrok === 'fertilizantes') return <ListAplicacionesFertilizantes />;
        if (typeWrok === 'plagas') return <ListPlagas />;
        if (typeWrok === 'riegos') return <ListRiegos />;
        if (typeWrok === 'cosecha')
            return (
                <ListCosecha
                    haveTablones={(count) => {
                        if (Number.isNaN(count)) {
                            setIsDisabled(0);
                        } else {
                            setIsDisabled(count);
                        }
                    }}
                />
            );
        return <></>;
    };
    return (
        <SideModal isOpen={isOpen} handleClose={handleClose} direction={direction}>
            <Grid2 container spacing={2} padding={2}>
                <Grid2 size={12} marginTop={1} display="flex" justifyContent="center">
                    {estado && rol === 1 && (
                        <Button
                            disabled={isDisabled === 0}
                            onClick={() => {
                                onOpen();
                            }}
                            variant="contained"
                            color="primary"
                            sx={{ position: 'absolute', left: 15 }}
                        >
                            {name}
                        </Button>
                    )}
                    <Typography variant="h4" component="h4" color="text.primary" textAlign="center" className="max-lg:!mt-16">
                        {title}
                    </Typography>
                    <Button variant="outlined" onClick={handleClose} sx={{ position: 'absolute', right: 5 }}>
                        <CloseIcon />
                    </Button>
                </Grid2>
                <Grid2 size={12}>{getComponentList()}</Grid2>
            </Grid2>
        </SideModal>
    );
};

export default ListWorks;
