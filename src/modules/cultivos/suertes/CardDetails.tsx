import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Grid2, Paper, Typography } from '@mui/material';
import { GetAreaSuerteResponse, GetCorteActualResponse, GetTablonesSuerteResponse, Suerte } from '@interfaces/cultivos/suerte';
import { useQuery } from '@apollo/client';
import { OBTENER_AREA_SUERTE, OBTENER_CORTE_ACTUAL, OBTENER_TABLONES_SUERTE } from '@graphql/queries';
import ModalLoading from '@components/Modal';

interface Props {
    suerte: Suerte;
}

const CardDetails: React.FC<Props> = ({ suerte }) => {
    const { data: dataArea, loading } = useQuery<GetAreaSuerteResponse>(OBTENER_AREA_SUERTE, {
        variables: { idSuerte: suerte.id_suerte }
    });
    const { data: dataTablones, loading: loadingTablones } = useQuery<GetTablonesSuerteResponse>(OBTENER_TABLONES_SUERTE, {
        variables: { idSuerte: suerte.id_suerte }
    });
    const { data: dataActual, loading: loadingActual } = useQuery<GetCorteActualResponse>(OBTENER_CORTE_ACTUAL, {
        variables: { idSuerte: suerte.id_suerte }
    });
    const [actualDate, setActualDate] = useState<string>('');

    useEffect(() => {
        if (dataActual !== undefined) {
            const now = dayjs().format('YYYY-MM-DD');
            const dateStart = dayjs(dataActual?.obtenerCorteActual.fecha_inicio).format('YYYY-MM-DD');
            const diffDate = dayjs(now).diff(dayjs(dateStart), 'month', true).toFixed(1);
            setActualDate(diffDate);
        }
    }, [loadingActual]);

    if (loading || loadingTablones || loadingActual) return <ModalLoading isOpen={loading || loadingActual || loadingTablones} />;

    return (
        <>
            <Grid2 size={{ xs: 12, sm: 2, md: 2, lg: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: { xs: '100%', sm: '85%', md: '85%', lg: '85%', xl: '85%' },
                            height: 128
                        }
                    }}
                >
                    <Paper elevation={3} className="grid grid-cols-1 content-between p-5">
                        <Typography variant="h6" component="h6" color="text.primary" textAlign="center" className="!font-bold">
                            Area
                        </Typography>
                        <Typography variant="h5" component="h5" color="text.primary" textAlign="center">
                            {dataArea?.obtenerAreaSuerte}
                        </Typography>
                    </Paper>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2, md: 2, lg: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: { xs: '100%', sm: '85%', md: '85%', lg: '85%', xl: '85%' },
                            height: 128
                        }
                    }}
                >
                    <Paper elevation={3} className="grid grid-cols-1 content-between p-5">
                        <Typography variant="h6" component="h6" color="text.primary" textAlign="center" className="!font-bold">
                            Variedad
                        </Typography>
                        <Typography variant="h5" component="h5" color="text.primary" textAlign="center">
                            {suerte.variedad}
                        </Typography>
                    </Paper>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2, md: 2, lg: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: { xs: '100%', sm: '85%', md: '85%', lg: '85%', xl: '85%' },
                            height: 128
                        }
                    }}
                >
                    <Paper elevation={3} className="grid grid-cols-1 content-between p-3">
                        <Typography variant="h6" component="h6" color="text.primary" textAlign="center" className="!font-bold">
                            No. Tablones
                        </Typography>
                        <Typography variant="h5" component="h5" color="text.primary" textAlign="center">
                            {dataTablones?.countTablonesPorSuerte}
                        </Typography>
                    </Paper>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2, md: 2, lg: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: { xs: '100%', sm: '85%', md: '85%', lg: '85%', xl: '85%' },
                            height: 128
                        }
                    }}
                >
                    <Paper elevation={3} className="grid grid-cols-1 content-between p-3">
                        <Typography variant="h6" component="h6" color="text.primary" textAlign="center" className="!font-bold">
                            Zona Agro.
                        </Typography>
                        <Typography variant="h5" component="h5" color="text.primary" textAlign="center">
                            {suerte.zona}
                        </Typography>
                    </Paper>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2, md: 2, lg: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: { xs: '100%', sm: '85%', md: '85%', lg: '85%', xl: '85%' },
                            height: 128
                        }
                    }}
                >
                    <Paper elevation={3} className="grid grid-cols-1 content-between p-3">
                        <Typography variant="h6" component="h6" color="text.primary" textAlign="center" className="!font-bold">
                            Corte Actual
                        </Typography>
                        <Typography variant="h5" component="h5" color="text.primary" textAlign="center">
                            {dataActual === undefined ? null : dataActual.obtenerCorteActual.numero}
                        </Typography>
                    </Paper>
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2, md: 2, lg: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: { xs: '100%', sm: '85%', md: '85%', lg: '85%', xl: '85%' },
                            height: 128
                        }
                    }}
                >
                    <Paper elevation={3} className="grid grid-cols-1 content-between p-3">
                        <Typography variant="h6" component="h6" color="text.primary" textAlign="center" className="!font-bold">
                            Edad Actual
                        </Typography>
                        <Typography variant="h5" component="h5" color="text.primary" textAlign="center">
                            {dataActual === undefined ? null : actualDate}
                        </Typography>
                    </Paper>
                </Box>
            </Grid2>
        </>
    );
};

export default CardDetails;
