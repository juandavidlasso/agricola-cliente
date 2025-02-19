import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Grid2, Typography } from '@mui/material';
import { ThemeProps } from '@interfaces/theme';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import ListPluviometros from './pluviometro/ListPluviometros';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import PluviometroPopover from './pluviometro/PluviometroPopover';
import InputFilters from './components/InputFilters';
import Alert from '@components/Alert';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

const LazyReporteLluviasPopover = dynamic(() => import('./components/ReporteLluviasPopover'), {
    ssr: false
});

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const PluviometrosView: React.FC<Props> = ({ toogleTheme }) => {
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const {
        openModalReport,
        filtersLluvia,
        setOpenModal,
        setFormType,
        setHeight,
        setTitle,
        setType,
        setReportType,
        setOpenModalReport,
        setIsEnabled,
        setArrayLluvias
    } = useContext(PluviometroContext);
    useEffect(() => {
        return () => {
            setIsEnabled(false);
            setArrayLluvias([]);
        };
    }, []);
    return (
        <>
            {showError && <Alert message={errorMessage} />}
            <PluviometroPopover />
            {openModalReport && <LazyReporteLluviasPopover />}
            <Layout toogleTheme={toogleTheme} navItems={routesCultivos}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Grid2 container spacing={2} width={'100%'}>
                        <Grid2 size={12}>
                            <Typography variant="h4" component="h4" textAlign={'center'} mb={2}>
                                Listado de lluvias
                            </Typography>
                        </Grid2>
                        {rol === 1 && (
                            <Grid2 size={{ xs: 12, sm: 2.3 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setFormType('pluviometro');
                                        setTitle('Registrar pluviómetro');
                                        setHeight(60);
                                        setType('create');
                                        setOpenModal(true);
                                    }}
                                    sx={{ width: { xs: '100%' } }}
                                >
                                    Registrar pluviómetro
                                </Button>
                            </Grid2>
                        )}
                        <Grid2 size={{ xs: 12, sm: 3.2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    if (filtersLluvia?.month === 0 && filtersLluvia?.year === 0) {
                                        setErrorMessage('Debe seleccionar el mes y el año');
                                        setShowError(true);
                                    } else {
                                        setReportType('mes');
                                        setTitle('Listado de lluvias por mes y año');
                                        setOpenModalReport(true);
                                    }
                                }}
                                sx={{ width: { xs: '100%' } }}
                            >
                                Resumen pluviómetros por mes
                            </Button>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 3.1 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    if (filtersLluvia?.year === 0) {
                                        setErrorMessage('Debe seleccionar el año');
                                        setShowError(true);
                                    } else {
                                        setReportType('year');
                                        setTitle('Listado de lluvias por año');
                                        setOpenModalReport(true);
                                    }
                                }}
                                sx={{ width: { xs: '100%' } }}
                            >
                                Resumen pluviómetros por año
                            </Button>
                        </Grid2>
                        {rol === 1 && (
                            <Grid2 size={{ xs: 12, sm: 2.5 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setFormType('');
                                        setTitle('Listado de lluvias');
                                        setHeight(80);
                                        setOpenModal(true);
                                    }}
                                    sx={{ width: { xs: '100%' } }}
                                >
                                    Gestionar lluvias
                                </Button>
                            </Grid2>
                        )}
                        <Grid2 size={12}>
                            <Typography className="!mt-3 !text-red-600 !font-semibold">Filtros de búsqueda</Typography>
                        </Grid2>
                        <InputFilters />
                        <ListPluviometros />
                    </Grid2>
                </Box>
            </Layout>
        </>
    );
};

export default PluviometrosView;
