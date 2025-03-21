import React, { useContext } from 'react';
import { Button, Grid2 } from '@mui/material';
import { InformationContext } from 'src/context/cultivos/information/InformationContext';

interface Props {
    setTitleListWorks: React.Dispatch<React.SetStateAction<string>>;
    handleOpenListWorks: () => void;
    setTypeWork: React.Dispatch<
        React.SetStateAction<'labores' | 'herbicidas' | 'fertilizantes' | 'plagas' | 'riegos' | 'cosecha'>
    >;
    setNameButton: React.Dispatch<React.SetStateAction<string>>;
}

const ListButtons: React.FC<Props> = ({ setTitleListWorks, handleOpenListWorks, setTypeWork, setNameButton }) => {
    const { setWidth } = useContext(InformationContext);
    return (
        <>
            <Grid2 size={{ xs: 12, sm: 2 }} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTitleListWorks('Listado de Labores');
                        setTypeWork('labores');
                        setNameButton('Aplicar labor');
                        setWidth('95%');
                        handleOpenListWorks();
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
                        setTitleListWorks('Listado de Herbicidas');
                        setTypeWork('herbicidas');
                        setNameButton('Aplicar herbicida');
                        setWidth('95%');
                        handleOpenListWorks();
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
                        setTitleListWorks('Listado de  Fertilizantes');
                        setTypeWork('fertilizantes');
                        setNameButton('Aplicar fertilizante');
                        setWidth('95%');
                        handleOpenListWorks();
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
                        setTitleListWorks('Plagas y enfermedades');
                        setTypeWork('plagas');
                        setNameButton('Aplicar producto');
                        setWidth('80%');
                        handleOpenListWorks();
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
                        setTitleListWorks('Riegos');
                        setTypeWork('riegos');
                        setNameButton('Registrar riego');
                        setWidth('50%');
                        handleOpenListWorks();
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
                        setTitleListWorks('Cosechas');
                        setTypeWork('cosecha');
                        setNameButton('Registrar cosecha');
                        setWidth('50%');
                        handleOpenListWorks();
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
