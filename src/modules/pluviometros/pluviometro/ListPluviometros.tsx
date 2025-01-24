import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Grid2, Typography } from '@mui/material';
import { OBTENER_PLUVIOMETROS_Y_LLUVIAS } from '@graphql/queries';
import { GetPluviometrosYLuviasResponse } from '@interfaces/pluviometros';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import Pluviometro from './Pluviometro';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';

interface Props {}

const ListPluviometros: React.FC<Props> = ({}) => {
    const { setArrayPluviometros } = useContext(PluviometroContext);
    const { data, error, loading } = useQuery<GetPluviometrosYLuviasResponse>(OBTENER_PLUVIOMETROS_Y_LLUVIAS);

    useEffect(() => {
        if (!error) {
            setArrayPluviometros(data?.obtenerPluviometrosYLluvias ?? []);
        }
    }, [loading]);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <Grid2 size={12}>
            {data?.obtenerPluviometrosYLluvias.length === 0 ? (
                <Typography>No hay pluviometros registrados</Typography>
            ) : (
                data?.obtenerPluviometrosYLluvias.map((pluviometro) => (
                    <Pluviometro key={pluviometro.id_pluviometro} pluviometro={pluviometro} />
                ))
            )}
        </Grid2>
    );
};

export default ListPluviometros;
