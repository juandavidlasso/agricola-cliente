import React, { useState } from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import { ThemeProps } from '@interfaces/theme';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import InputsFilters from './InputsFilters';
import { FormDataProntuario } from '@interfaces/prontuario';
import Results from './Results';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const Prontuario: React.FC<Props> = ({ toogleTheme }) => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const [filters, setFilters] = useState<FormDataProntuario & { nombre: string }>({
        fecha_inicio: '',
        fecha_fin: '',
        nombre: ''
    });
    const submitForm = (data: FormDataProntuario, suerteNames: string[]) => {
        const suertes = suerteNames.length > 0 ? suerteNames.join(',') : '';
        setFilters({
            fecha_inicio: data.fecha_inicio,
            fecha_fin: data.fecha_fin,
            nombre: suertes as string
        });
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
                    <InputsFilters submitForm={submitForm} />
                    {isValid && <Results filters={filters} setIsValid={setIsValid} />}
                </Grid2>
            </Box>
        </Layout>
    );
};

export default Prontuario;
