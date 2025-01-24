import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { GetLluviaReportResponse } from '@interfaces/lluvias';
import { OBTENER_LLUVIAS_POR_PLUVIOMETRO } from '@graphql/queries';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';

interface Props {}

const ReporteLluviasPluviometro: React.FC<Props> = ({}) => {
    const { filtersLluvia } = useContext(PluviometroContext);
    const { data, loading, error, refetch } = useQuery<GetLluviaReportResponse>(OBTENER_LLUVIAS_POR_PLUVIOMETRO, {
        variables: { filterLluviaInput: filtersLluvia }
    });

    useEffect(() => {
        refetch();
    }, []);
    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <Grid2 size={12}>
            {data?.obtenerLluviasPorPluviometro.length === 0 ? (
                <Typography>No hay lluvias registradas para los filtros ingresados</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Fecha</TableCell>
                                <TableCell align="left">Cantidad</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.obtenerLluviasPorPluviometro.map((row) => (
                                <TableRow key={row.id_lluvia} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" align="left">
                                        {row.fecha}
                                    </TableCell>
                                    <TableCell align="left">{row.cantidad}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Grid2>
    );
};

export default ReporteLluviasPluviometro;
