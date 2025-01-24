import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid2, Typography } from '@mui/material';
import { GetRiegosResponse } from '@interfaces/cultivos/riegos';
import { OBTENER_RIEGOS_CORTE } from '@graphql/queries';
import ModalLoading from '@components/Modal';
import Alert from '@components/Alert';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import Riegos from './Riegos';
import RiegoPopover from './RiegoPopover';

interface Props {}

const ListRiegos: React.FC<Props> = ({}) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { data, error, loading } = useQuery<GetRiegosResponse>(OBTENER_RIEGOS_CORTE, { variables: { corteId: id_corte } });

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            <RiegoPopover />
            <Grid2 container>
                {data?.obtenerRiegosCorte.length === 0 ? (
                    <Typography>No hay riegos registrados</Typography>
                ) : (
                    data?.obtenerRiegosCorte.map((riego) => <Riegos key={riego.id_riego} riego={riego} />)
                )}
            </Grid2>
        </>
    );
};

export default ListRiegos;
