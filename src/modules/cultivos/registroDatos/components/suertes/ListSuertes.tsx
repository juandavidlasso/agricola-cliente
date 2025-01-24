import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid2 } from '@mui/material';
import { GetSuertesRenovadasYCortes } from '@interfaces/cultivos/suerte';
import { OBTENER_SUERTES_RENOVADAS_CORTES } from '@graphql/queries';
import SuerteRenovada from './SuerteRenovada';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';

interface Props {
    handleSubmit: (corteId: number) => Promise<void>;
}

const ListSuertes: React.FC<Props> = ({ handleSubmit }) => {
    const { data, error, loading } = useQuery<GetSuertesRenovadasYCortes>(OBTENER_SUERTES_RENOVADAS_CORTES);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <Grid2 container spacing={2}>
            {data?.obtenerSuertesRenovadasYCortes.length === 0
                ? null
                : data?.obtenerSuertesRenovadasYCortes.map((suerte) => (
                      <SuerteRenovada key={suerte.id_suerte} suerte={suerte} handleSubmit={handleSubmit} />
                  ))}
        </Grid2>
    );
};

export default ListSuertes;
