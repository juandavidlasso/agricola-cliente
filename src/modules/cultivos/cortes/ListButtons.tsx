import React, { useContext } from 'react';
import { Button, Grid2 } from '@mui/material';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const ListButtons: React.FC<Props> = () => {
    const { setOpenModalList, setHeader, setButtonName, setTypeModal } = useContext(CultivosContext);
    return (
        <>
            <Grid2 size={{ xs: 12, sm: 2 }} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setHeader('Listado de Labores');
                        setButtonName('Aplicar labor');
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
                        setHeader('Listado de Herbicidas');
                        setButtonName('Aplicar herbicida');
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
                        setHeader('Listado de Fertilizantes');
                        setButtonName('Aplicar fertilizante');
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
                        setHeader('Plagas y enfermedades');
                        setButtonName('Aplicar producto');
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
                        setHeader('Riegos');
                        setButtonName('Registrar riego');
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
                        setHeader('Cosechas');
                        setButtonName('Registrar cosecha');
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
