import React, { useContext } from 'react';
import { Button, Grid2 } from '@mui/material';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const ListButtons: React.FC<Props> = () => {
    const { setOpenModalList, setTypeModal } = useContext(CultivosContext);
    return (
        <>
            <Grid2 size={{ xs: 12, sm: 2 }} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTypeModal('labores');
                        setOpenModalList(true);
                    }}
                    sx={{ width: { xs: '100%' } }}
                >
                    Labores Agrícolas
                </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2 }} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTypeModal('herbicidas');
                        setOpenModalList(true);
                    }}
                    sx={{ width: { xs: '100%' } }}
                >
                    Herbicidas
                </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2 }} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTypeModal('fertilizantes');
                        setOpenModalList(true);
                    }}
                    sx={{ width: { xs: '100%' } }}
                >
                    Fertilizantes
                </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTypeModal('plagas');
                        setOpenModalList(true);
                    }}
                    sx={{ width: { xs: '100%' } }}
                >
                    Control de Plagas y Enfermedades
                </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 1.5 }} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTypeModal('riegos');
                        setOpenModalList(true);
                    }}
                    sx={{ width: { xs: '100%' } }}
                >
                    Riegos
                </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 1.5 }} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTypeModal('cosecha');
                        setOpenModalList(true);
                    }}
                    sx={{ width: { xs: '100%' }, mb: { xs: 2, sm: 0 } }}
                >
                    Cosecha
                </Button>
            </Grid2>
        </>
    );
};

export default ListButtons;
