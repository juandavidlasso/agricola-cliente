import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const LazyListAplicacionHerbicidas = dynamic(() => import('./ListAplicacionHerbicidas'), {
    ssr: false,
    loading: () => <Loading />
});

interface Props {}

const Herbicidas: React.FC<Props> = ({}) => {
    const {
        selectedAplicacionHerbicidas,
        setOpenModal,
        setFormType,
        setAplicacionHerbicidaEdit,
        setTitle,
        setHeight,
        setDataType,
        setOpenModal: setOpenModalSuertes,
        setType
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
                setType('herbicidas');
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${2}-content`}
                id={`panel${2}-header`}
                sx={{
                    '& .MuiAccordionSummary-content': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }
                }}
            >
                <Box>
                    <Typography variant="h6">Herbicidas</Typography>
                </Box>
                <Box sx={{ p: 0.2, display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={(e) => {
                            e.stopPropagation();
                            setFormType('create');
                            setDataType('aplicacion');
                            setTitle('Registrar aplicación herbicida');
                            setHeight(60);
                            setType('herbicidas');
                            setAplicacionHerbicidaEdit(undefined);
                            setOpenModal(true);
                        }}
                    >
                        Agregar aplicación herbicida
                    </Button>
                    {selectedAplicacionHerbicidas.length ? (
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={(e) => {
                                e.stopPropagation();
                                setType('herbicidas');
                                setTitle('Selecciona la suerte y el corte');
                                setHeight(80);
                                setOpenModalSuertes(true);
                            }}
                        >
                            Aplicar herbicida
                        </Button>
                    ) : null}
                </Box>
            </AccordionSummary>
            <AccordionDetails>{isOpen && <LazyListAplicacionHerbicidas />}</AccordionDetails>
        </Accordion>
    );
};

export default Herbicidas;
