import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
    Button,
    Grid2,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { meses } from '../constants/constants';
import { OBTENER_PLUVIOMETROS_Y_LLUVIAS } from '@graphql/queries';
import { GetPluviometrosYLuviasResponse } from '@interfaces/pluviometros';
import { useLluviasActuales } from './hooks/useLluviasActuales';

interface Props {}

const ReporteLluviasMesYear: React.FC<Props> = ({}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { generarPDF } = useLluviasActuales();
    const { filtersLluvia } = useContext(PluviometroContext);
    const { data, loading, error, refetch } = useQuery<GetPluviometrosYLuviasResponse>(OBTENER_PLUVIOMETROS_Y_LLUVIAS, {
        variables: {
            filterLluviasInput: {
                month: filtersLluvia?.month,
                year: filtersLluvia?.year
            }
        }
    });
    useEffect(() => {
        refetch();
    }, []);
    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    function getDaysActualMonth(): number {
        const actualDate = new Date(filtersLluvia!.year, filtersLluvia!.month!, 0);
        return actualDate.getDate();
    }
    return (
        <>
            <Grid2 size={12}>
                {data?.obtenerPluviometrosYLluvias.length === 0 ? (
                    <Typography>No hay lluvias registradas en el mes y año seleccionados</Typography>
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
                                        colSpan={getDaysActualMonth()}
                                    >
                                        {meses[filtersLluvia?.month! - 1].label} - {filtersLluvia?.year}
                                    </TableCell>
                                    <TableCell align="left" rowSpan={2} className="!border-l-[0.5px] !bg-blue-200">
                                        Total mes
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    {Array.from({ length: getDaysActualMonth() }).map((_, day) => (
                                        <TableCell key={day + 1} align="left" className="!border-r-[0.5px] !bg-blue-400">
                                            {day + 1}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.obtenerPluviometrosYLluvias.map((row) => (
                                    <TableRow key={row.id_pluviometro} sx={{ height: '30px !important' }}>
                                        <TableCell component="th" scope="row" className="!p-0 !text-center !border-r-[0.5px]">
                                            <span style={{ fontSize: '.9rem' }}>{row.nombre}</span>
                                            <br />
                                            <span className="!font-bold !text-[11px] !text-left">
                                                Suerte {row.suertesAsociadas}
                                            </span>
                                        </TableCell>
                                        {Array.from({ length: getDaysActualMonth() }).map((_, day) => (
                                            <TableCell key={day + 1} align="left" className="!border-l-[0.5px] !border-r-[0.5px]">
                                                {row?.listAplicacionesLluvias?.length === 0
                                                    ? null
                                                    : row?.listAplicacionesLluvias?.map((lluvia) => {
                                                          const { id_lluvia, cantidad, fecha } = lluvia.lluviaPadre!;
                                                          const nuevaFecha = fecha.split('-')[2];
                                                          const fechaNueva =
                                                              nuevaFecha[0] === '0' ? nuevaFecha.slice(1) : nuevaFecha;
                                                          return Number(fechaNueva) === day + 1 ? (
                                                              <span
                                                                  key={id_lluvia}
                                                                  className="!p-2 !text-white !bg-blue-700"
                                                                  style={{ borderRadius: '7px' }}
                                                              >
                                                                  {cantidad}
                                                              </span>
                                                          ) : null;
                                                      })}
                                            </TableCell>
                                        ))}
                                        <TableCell align="left">{row.totalMes?.toFixed(0) ?? ''}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Grid2>

            {data?.obtenerPluviometrosYLluvias.length !== 0 && (
                <Grid2 size={12} display={'flex'} justifyContent={'center'} mt={2} mb={3}>
                    <Button
                        variant="contained"
                        onClick={() =>
                            generarPDF(
                                filtersLluvia!.year,
                                meses[filtersLluvia!.month! - 1].label,
                                getDaysActualMonth,
                                data!,
                                setIsLoading
                            )
                        }
                        disabled={isLoading}
                    >
                        Generar Informe
                    </Button>
                </Grid2>
            )}
        </>
    );
};

export default ReporteLluviasMesYear;
