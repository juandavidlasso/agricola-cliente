import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const LazyListAplicacionFertilizantes = dynamic(() => import('./ListAplicacionFertilizantes'), {
    ssr: false,
    loading: () => <Loading />
});

interface Props {}

const Fertilizantes: React.FC<Props> = ({}) => {
    const {
        selectedAplicacionFertilizantes,
        setOpenModal,
        setFormType,
        setAplicacionFertilizanteEdit,
        setDataType,
        setTitle,
        setHeight,
        setType,
        setDuplicate
    } = useContext(CultivosContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleAccordionChange = (index: React.SyntheticEvent<Element, Event>, expanded: boolean) => {
        setIsOpen(index !== undefined);
    };

    return (
        <Accordion
            sx={{
                m: 1,
                minWidth: '100%',
                margin: '0 auto',
                height: 'fit-content !important',
                maxHeight: '100% !important',
                borderRadius: '5px !important'
            }}
            onChange={(event: React.SyntheticEvent, expanded: boolean) => {
                handleAccordionChange(event, expanded);
                setType('fertilizantes');
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${3}-content`}
                id={`panel${3}-header`}
                sx={{
                    '& .MuiAccordionSummary-content': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }
                }}
            >
                <Box>
                    <Typography variant="h6">Fertilizantes</Typography>
                </Box>
                <Box sx={{ p: 0.2, display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={(e) => {
                            e.stopPropagation();
                            setFormType('create');
                            setDataType('aplicacion');
                            setTitle('Registrar aplicación fertilizante');
                            setHeight(60);
                            setType('fertilizantes');
                            setAplicacionFertilizanteEdit(undefined);
                            setDuplicate(false);
                            setOpenModal(true);
                        }}
                    >
                        Agregar aplicación fertilizante
                    </Button>
                    {selectedAplicacionFertilizantes.length ? (
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={(e) => {
                                e.stopPropagation();
                                setType('fertilizantes');
                                setTitle('Selecciona la suerte y el corte');
                                setHeight(80);
                                setDataType('suertes');
                                setDuplicate(false);
                                setOpenModal(true);
                            }}
                        >
                            Aplicar fertilizante
                        </Button>
                    ) : null}
                </Box>
            </AccordionSummary>
            <AccordionDetails>{isOpen && <LazyListAplicacionFertilizantes />}</AccordionDetails>
        </Accordion>
    );
};

export default Fertilizantes;
