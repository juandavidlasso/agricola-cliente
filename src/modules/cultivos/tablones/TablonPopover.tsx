import React from 'react';
import { Grid2, Typography } from '@mui/material';
import SideModal from '@components/Side';
import ListTablones from './ListTablones';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    direction: 'top' | 'bottom' | 'left' | 'right';
}

const TablonPropover: React.FC<Props> = ({ isOpen, handleClose, direction }) => {
    return (
        <SideModal isOpen={isOpen} handleClose={handleClose} direction={direction}>
            <Grid2 container spacing={2} padding={2}>
                <Grid2 size={12} marginTop={1}>
                    <Typography variant="h4" component="h4" color="text.primary" textAlign="center">
                        Listado de Tablones
                    </Typography>
                </Grid2>
                <Grid2 size={12}>
                    <ListTablones />
                </Grid2>
            </Grid2>
        </SideModal>
    );
};

export default TablonPropover;
