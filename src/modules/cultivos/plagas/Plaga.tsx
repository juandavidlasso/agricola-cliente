import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TablonState } from '@interfaces/cultivos/tablones';
import ListAplicacionesPlagas from './aplicacion/ListAplicacionesPlagas';

interface Props {
    tablon: TablonState;
}

const Plaga: React.FC<Props> = ({ tablon }) => {
    return (
        <Accordion
            sx={{
                minWidth: '100%',
                height: 'fit-content !important',
                borderRadius: '5px !important'
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${tablon.id_tablon}-content`}
                id={`panel${tablon.id_tablon}-header`}
                sx={{
                    '& .MuiAccordionSummary-content': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }
                }}
            >
                <Box display={'flex'} alignItems={'center'}>
                    <Typography>
                        Tablón: {tablon.numero} - Área {tablon.area}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                {tablon?.listAplicacionesPlagas?.length === 0 ? (
                    <Typography>No hay aplicaciones registradas</Typography>
                ) : (
                    <ListAplicacionesPlagas listAplicacionesPlagas={tablon.listAplicacionesPlagas} tablon={tablon} />
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default Plaga;
