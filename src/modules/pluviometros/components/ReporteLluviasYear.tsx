import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { meses } from '../constants/constants';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { GetTotalPromedioLluviasYearResponse } from '@interfaces/lluvias';
import { OBTENER_PROMEDIO_LLUVIAS_YEAR, OBTENER_RESUMEN_LLUVIAS_YEAR, OBTENER_TOTAL_YEAR } from '@graphql/queries';
import { GetLluviasYearReportResponse, GetTotalPluviometroResponse } from '@interfaces/lluvias/aplicacion';
// import { useLluviasYear } from './hooks/useLluviasYear';

interface Props {}

const ReporteLluviasYear: React.FC<Props> = ({}) => {
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    // const { generarPDF } = useLluviasYear();
    const { arrayPluviometros, filtersLluvia } = useContext(PluviometroContext);
    const {
        data,
        loading,
        error,
        refetch: refetch1
    } = useQuery<GetLluviasYearReportResponse>(OBTENER_RESUMEN_LLUVIAS_YEAR, {
        variables: { year: filtersLluvia?.year }
    });
    const {
        data: dataTotal,
        loading: loadingTotal,
        error: errorTotal,
        refetch: refetch2
    } = useQuery<GetTotalPluviometroResponse>(OBTENER_TOTAL_YEAR, {
        variables: { year: filtersLluvia?.year }
    });
    const {
        data: dataPromedio,
        loading: loadingPromedio,
        error: errorPromedio,
        refetch: refetch3
    } = useQuery<GetTotalPromedioLluviasYearResponse>(OBTENER_PROMEDIO_LLUVIAS_YEAR, {
        variables: { year: filtersLluvia?.year }
    });
    useEffect(() => {
        refetch1();
        refetch2();
        refetch3();
    }, []);
    if (error || errorTotal || errorPromedio) return <Alert message={error ? error.message : errorTotal?.message} />;

    if (loading || loadingTotal || loadingPromedio) return <ModalLoading isOpen={loading || loadingTotal} />;

    return (
        <>
            <Grid2 size={12}>
                {arrayPluviometros.length === 0 ? (
                    <Typography>No hay pluviómetros registrados</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" rowSpan={2} className="!border-r-[0.5px] !bg-blue-200">
                                        Pluviómetro
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="!capitalize !font-bold !text-lg !bg-blue-200"
                                        colSpan={meses.length}
                                    >
                                        Mes - {filtersLluvia?.year}
                                    </TableCell>
                                    <TableCell align="left" rowSpan={2} colSpan={2} className="!border-l-[0.5px] !bg-blue-200">
                                        Total
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    {meses.map((mes) => (
                                        <TableCell key={mes.id} align="left" className="!border-r-[0.5px] !bg-blue-400">
                                            {mes.id}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {arrayPluviometros.map((row) => (
                                    <TableRow key={row.id_pluviometro}>
                                        <TableCell component="th" scope="row" align="left">
                                            <span style={{ fontSize: '.9rem' }}>{row.nombre}</span>
                                            <br />
                                            {row.suertesAsociadas === '' ? null : (
                                                <span className="!font-bold">Suerte {row.suertesAsociadas}</span>
                                            )}
                                        </TableCell>
                                        {meses.map((mes) => (
                                            <TableCell key={mes.id} align="left" className="!border-l-[0.5px] !border-r-[0.5px]">
                                                {data?.obtenerResumenLluviasYear.length === 0
                                                    ? null
                                                    : data?.obtenerResumenLluviasYear.map((lluvia, index) =>
                                                          lluvia.pluviometro_id === row.id_pluviometro &&
                                                          Number(lluvia.fecha) === mes.id ? (
                                                              <div
                                                                  className="!text-white !bg-blue-600 !text-center !rounded-lg !p-2 !w-[70%] !m-auto"
                                                                  key={index}
                                                              >
                                                                  <span>{lluvia?.cantidad?.toFixed(1)}</span>
                                                              </div>
                                                          ) : null
                                                      )}
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            {dataTotal?.obtenerResumenPluviometroYear.length === 0
                                                ? null
                                                : dataTotal?.obtenerResumenPluviometroYear.map((total, index) =>
                                                      total.pluviometro_id === row.id_pluviometro ? (
                                                          <div
                                                              key={index}
                                                              className="!text-white !bg-blue-600 !rounded-lg !text-center !p-2 !w-[70%] !m-auto"
                                                          >
                                                              <span>{total?.cantidad?.toFixed(0)}</span>
                                                          </div>
                                                      ) : null
                                                  )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell className="!font-bold">TOTAL PROMEDIO</TableCell>
                                    {meses.map((mes) => (
                                        <TableCell key={mes.id} className="!border-l-[0.5px] !border-r-[0.5px]">
                                            {dataPromedio?.obtenerPromedioLluvias.length === 0
                                                ? 0
                                                : dataPromedio?.obtenerPromedioLluvias.map((promedio, index) =>
                                                      Number(promedio.fecha) === mes.id ? (
                                                          <div
                                                              key={mes.id + index}
                                                              className="!text-white !bg-orange-600 !font-bold !text-center !m-auto !p-2 !w-[70%]"
                                                              style={{ borderRadius: '7px', width: '2.9rem', fontSize: '.9rem' }}
                                                          >
                                                              <span>
                                                                  {(promedio.cantidad / (arrayPluviometros.length - 1)).toFixed(
                                                                      0
                                                                  )}
                                                              </span>
                                                          </div>
                                                      ) : null
                                                  )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Grid2>

            {/* <Grid2 size={12} display={'flex'} justifyContent={'center'} mt={2} mb={3}>
                <Button
                    variant="contained"
                    onClick={() => generarPDF(filtersLluvia, setIsLoading)}
                    disabled={isLoading}
                >
                    Generar Informe
                </Button>
            </Grid2> */}
        </>
    );
};

export default ReporteLluviasYear;
