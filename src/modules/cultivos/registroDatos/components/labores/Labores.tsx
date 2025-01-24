import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const LazyListLabores = dynamic(() => import('./ListLabores'), {
    ssr: false,
    loading: () => <Loading />
});

interface Props {}

const Labores: React.FC<Props> = ({}) => {
    const { selectedLabores, setFormType, setOpenModal, setEditLabor, setType, setHeight, setTitle } =
        useContext(CultivosContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleAccordionChange = (index: React.SyntheticEvent<Element, Event>, expanded: boolean) => {
        setIsOpen(index !== undefined);
    };

    return (
        <Accordion
            sx={{ m: 1, minWidth: '100%', margin: '0 auto', height: 'fit-content !important' }}
            onChange={(event: React.SyntheticEvent, expanded: boolean) => {
                handleAccordionChange(event, expanded);
                setType('labores');
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${1}-content`}
                id={`panel${1}-header`}
                sx={{
                    '& .MuiAccordionSummary-content': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }
                }}
            >
                <Box>
                    <Typography variant="h6">Labores</Typography>
                </Box>
                <Box sx={{ p: 0.2, display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={(e) => {
                            e.stopPropagation();
                            setFormType('create');
                            setHeight(90);
                            setTitle('Registrar labor');
                            setType('labores');
                            setEditLabor(undefined);
                            setOpenModal(true);
                        }}
                    >
                        Agregar labor
                    </Button>
                    {selectedLabores.length ? (
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={(e) => {
                                e.stopPropagation();
                                setType('labores');
                                setTitle('Selecciona la suerte y el corte');
                                setHeight(80);
                                setOpenModal(true);
                            }}
                        >
                            Aplicar labores
                        </Button>
                    ) : null}
                </Box>
            </AccordionSummary>
            <AccordionDetails>{isOpen && <LazyListLabores />}</AccordionDetails>
        </Accordion>
    );
};

export default Labores;
