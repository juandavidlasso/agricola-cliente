import React, { useState } from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import { ThemeProps } from '@interfaces/theme';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import InputsFilter from './InputsFilter';
import ResultsActuales from './Results';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const DatosActuales: React.FC<Props> = ({ toogleTheme }) => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const [filters, setFilters] = useState<{ nombres: string }>({
        nombres: ''
    });
    const submitForm = (suerteNames: string[]) => {
        const suertes = suerteNames.length > 0 ? suerteNames.join(',') : '';
        setFilters({ nombres: suertes });
        setIsValid(true);
    };

    return (
        <Layout toogleTheme={toogleTheme} navItems={routesCultivos}>
            <Box width={'100%'}>
                <Grid2 container spacing={2} textAlign={'center'}>
                    <Grid2 size={12} mb={2}>
                        <Typography variant="h5" fontWeight={600}>
                            Ingrese los datos de búsqueda
                        </Typography>
                    </Grid2>
                    <InputsFilter submitForm={submitForm} />
                    {isValid && <ResultsActuales filters={filters} setIsValid={setIsValid} />}
                </Grid2>
            </Box>
        </Layout>
    );
};

export default DatosActuales;
