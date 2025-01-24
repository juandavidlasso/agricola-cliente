import React from 'react';
import dayjs from 'dayjs';
import { Box, Grid2, Paper, Typography } from '@mui/material';
import { Corte } from '@interfaces/cultivos/cortes';

interface Props {
    corte: Corte;
}

const CardDetails: React.FC<Props> = ({ corte }) => {
    const { fecha_inicio, fecha_siembra, fecha_corte } = corte;
    const currentDate = dayjs();
    const edadActual = currentDate.diff(fecha_inicio, 'month', true).toFixed(1);
    const edadCorte = fecha_corte ? dayjs(fecha_corte).diff(fecha_inicio, 'months', true).toFixed(1) : null;

    return (
        <>
            <Grid2 size={{ xs: 12, sm: 2.4, md: 2.4, lg: 2.4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: { xs: '100%', sm: '90%', md: '90%', lg: '90%', xl: '90%' },
                            height: 128
                        }
                    }}
                >
                    <Paper elevation={3} className="grid grid-cols-1 content-between p-4">
                        <Typography variant="h6" component="h6" color="text.primary" textAlign="center" className="!font-bold">
                            Fecha de Siembra
                        </Typography>
                        <Typography variant="h5" component="h5" color="text.primary" textAlign="center">
                            {dayjs(fecha_siembra).format('DD-MM-YYYY')}
                        </Typography>
                    </Paper>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2.4, md: 2.4, lg: 2.4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: { xs: '100%', sm: '90%', md: '90%', lg: '90%', xl: '90%' },
                            height: 128
                        }
                    }}
                >
                    <Paper elevation={3} className="grid grid-cols-1 content-between p-4">
                        <Typography variant="h6" component="h6" color="text.primary" textAlign="center" className="!font-bold">
                            Fecha de Inicio
                        </Typography>
                        <Typography variant="h5" component="h5" color="text.primary" textAlign="center">
                            {dayjs(fecha_inicio).format('DD-MM-YYYY')}
                        </Typography>
                    </Paper>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2.4, md: 2.4, lg: 2.4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: { xs: '100%', sm: '90%', md: '90%', lg: '90%', xl: '90%' },
                            height: 128
                        }
                    }}
                >
                    <Paper elevation={3} className="grid grid-cols-1 content-between p-4">
                        <Typography variant="h6" component="h6" color="text.primary" textAlign="center" className="!font-bold">
                            Fecha de Corte
                        </Typography>
                        <Typography variant="h5" component="h5" color="text.primary" textAlign="center">
                            {!fecha_corte ? 'Sin registro' : dayjs(fecha_corte).format('DD-MM-YYYY')}
                        </Typography>
                    </Paper>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2.4, md: 2.4, lg: 2.4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: { xs: '100%', sm: '90%', md: '90%', lg: '90%', xl: '90%' },
                            height: 128
                        }
                    }}
                >
                    <Paper elevation={3} className="grid grid-cols-1 content-between p-4">
                        <Typography variant="h6" component="h6" color="text.primary" textAlign="center" className="!font-bold">
                            Edad Corte
                        </Typography>
                        <Typography variant="h5" component="h5" color="text.primary" textAlign="center">
                            {edadCorte}
                        </Typography>
                    </Paper>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2.4, md: 2.4, lg: 2.4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: { xs: '100%', sm: '90%', md: '90%', lg: '90%', xl: '90%' },
                            height: 128
                        }
                    }}
                >
                    <Paper elevation={3} className="grid grid-cols-1 content-between p-3">
                        <Typography variant="h6" component="h6" color="text.primary" textAlign="center" className="!font-bold">
                            Edad Actual (meses)
                        </Typography>
                        <Typography variant="h5" component="h5" color="text.primary" textAlign="center">
                            {edadActual}
                        </Typography>
                    </Paper>
                </Box>
            </Grid2>
        </>
    );
};

export default CardDetails;
