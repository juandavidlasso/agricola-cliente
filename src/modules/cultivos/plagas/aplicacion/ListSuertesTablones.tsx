import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid2, Typography } from '@mui/material';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { OBTENER_SUERTES_CORTES_TABLONES_PLAGAS } from '@graphql/queries';
import { GetTablonesPlagasResponse } from '@interfaces/cultivos/plagas/aplicacion';
import SuerteTablon from './SuerteTablon';

interface Props {}

const ListSuertesTablones: React.FC<Props> = ({}) => {
    const { data, loading, error } = useQuery<GetTablonesPlagasResponse>(OBTENER_SUERTES_CORTES_TABLONES_PLAGAS);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <Grid2 container spacing={2}>
            {data?.obtenerSuertesRenovadasCortesTablones.length === 0 ? (
                <Typography>No hay tablones registrados</Typography>
            ) : (
                <SuerteTablon suertes={data?.obtenerSuertesRenovadasCortesTablones!} />
            )}
        </Grid2>
    );
};

export default ListSuertesTablones;
