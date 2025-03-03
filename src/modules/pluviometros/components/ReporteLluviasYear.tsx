import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { meses } from '../constants/constants';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { GetTotalPromedioLluviasYearResponse } from '@interfaces/lluvias';
import { OBTENER_LLUVIAS_YEAR, OBTENER_PROMEDIO_LLUVIAS_YEAR, OBTENER_RESUMEN_LLUVIAS_YEAR } from '@graphql/queries';
import { GetLluviasYearReportResponse } from '@interfaces/lluvias/aplicacion';
import { GetLluviasYearResponse } from '@interfaces/pluviometros';
// import { useLluviasYear } from './hooks/useLluviasYear';

interface Props {}

const ReporteLluviasYear: React.FC<Props> = ({}) => {
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    // const { generarPDF } = useLluviasYear();
    const { filtersLluvia } = useContext(PluviometroContext);
    const {
        data,
        loading,
        error,
        refetch: refetch
    } = useQuery<GetLluviasYearResponse>(OBTENER_LLUVIAS_YEAR, {
        variables: { year: filtersLluvia?.year }
    });
    const {
        data: data1,
        loading: loading1,
        error: error1,
        refetch: refetch1
    } = useQuery<GetLluviasYearReportResponse>(OBTENER_RESUMEN_LLUVIAS_YEAR, {
        variables: { year: filtersLluvia?.year }
    });
    const {
        data: dataPromedio,
        loading: loadingPromedio,
        error: errorPromedio,
        refetch: refetch2
    } = useQuery<GetTotalPromedioLluviasYearResponse>(OBTENER_PROMEDIO_LLUVIAS_YEAR, {
        variables: { year: filtersLluvia?.year }
    });
    useEffect(() => {
        refetch();
        refetch1();
        refetch2();
    }, []);
    if (error || error1 || errorPromedio) return <Alert message={error?.message || error1?.message || errorPromedio?.message} />;

    if (loading || loading1 || loadingPromedio) return <ModalLoading isOpen={loading || loading1 || loadingPromedio} />;

    return (
        <>
            <Grid2 size={12}>
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
                            {data?.obtenerLluviasYear.map((pluviometro) => (
                                <TableRow key={pluviometro.id_pluviometro} sx={{ height: '30px !important' }}>
                                    <TableCell component="th" scope="row" align="left" className="!p-0 !text-center">
                                        <span style={{ fontSize: '.9rem' }}>{pluviometro.nombre}</span>
                                        <br />
                                        <span className="!font-bold !text-left">Suerte {pluviometro.suertesAsociadas}</span>
                                    </TableCell>
                                    {meses.map((mes) => (
                                        <TableCell key={mes.id} align="left" className="!border-l-[0.5px] !border-r-[0.5px] !p-1">
                                            {data1?.obtenerResumenLluviasYear.length === 0
                                                ? null
                                                : data1?.obtenerResumenLluviasYear.map((lluvia, index) =>
                                                      lluvia.pluviometro_id === pluviometro.id_pluviometro &&
                                                      Number(lluvia.fecha) === mes.id ? (
                                                          <div
                                                              className="!text-white !bg-blue-600 !p-1 !rounded-lg !w-[60%] !mx-auto !text-center"
                                                              key={index}
                                                          >
                                                              <span>{lluvia?.cantidad?.toFixed(1)}</span>
                                                          </div>
                                                      ) : null
                                                  )}
                                        </TableCell>
                                    ))}
                                    <TableCell>{pluviometro.totalMes?.toFixed(0) ?? ''}</TableCell>
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
                                                              {(
                                                                  promedio.cantidad /
                                                                  (data!.obtenerLluviasYear!.length - 1)
                                                              ).toFixed(0)}
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
