import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Pluviometro } from '@interfaces/pluviometros';
import ListLluvias from '../lluvias/ListLluvias';

interface Props {
    pluviometro: Pluviometro;
}

const Pluviometros: React.FC<Props> = ({ pluviometro }) => {
    return (
        <Accordion
            sx={{
                minWidth: '100%',
                height: 'fit-content !important',
                mt: 1,
                mb: 2,
                borderRadius: '5px !important'
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${pluviometro.id_pluviometro}-content`}
                id={`panel${pluviometro.id_pluviometro}-header`}
                sx={{
                    '& .MuiAccordionSummary-content': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }
                }}
            >
                <Box display={'flex'} alignItems={'center'}>
                    <Typography>Pluviómetro: {pluviometro.nombre}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <ListLluvias lluvias={pluviometro.listAplicacionesLluvias} />
            </AccordionDetails>
        </Accordion>
    );
};

export default Pluviometros;
