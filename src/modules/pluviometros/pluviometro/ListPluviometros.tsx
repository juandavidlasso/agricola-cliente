import React, { useContext, useState } from 'react';
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
import { OBTENER_PLUVIOMETROS_Y_LLUVIAS } from '@graphql/queries';
import { GetPluviometrosYLuviasResponse } from '@interfaces/pluviometros';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import Pluviometro from './Pluviometro';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { usePluviometro } from './hooks/usePluviometro';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import Loading from '@components/Loading';
import { useLluviasActuales } from '../components/hooks/useLluviasActuales';

interface Props {}

const ListPluviometros: React.FC<Props> = ({}) => {
    const { submitting, submitLluvia } = usePluviometro();
    const { generarPDF } = useLluviasActuales();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isEnabled, arrayLluvias, setIsEnabled, setArrayLluvias } = useContext(PluviometroContext);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, error, loading } = useQuery<GetPluviometrosYLuviasResponse>(OBTENER_PLUVIOMETROS_Y_LLUVIAS, {
        variables: {
            filterLluviasInput: {
                month: 0,
                year: 0
            }
        }
    });

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    function getDaysActualMonth(): number {
        const actualDate = new Date();
        const year = actualDate.getFullYear();
        const month = actualDate.getMonth();
        const lastDay = new Date(year, month + 1, 0);
        return lastDay.getDate();
    }
    const year = new Date().getFullYear();
    const month = new Date().toLocaleString('es-ES', { month: 'long' });

    return (
        <>
            <Grid2 size={12}>
                {data?.obtenerPluviometrosYLluvias.length === 0 ? (
                    <Typography>No hay pluviometros registrados</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {rol === 1 && (
                                        <TableCell className="!text-center !font-bold !text-2xl">
                                            {isEnabled ? (
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    variant="outlined"
                                                    className="!text-sm"
                                                    onClick={() => {
                                                        setArrayLluvias([]);
                                                        setIsEnabled(false);
                                                    }}
                                                >
                                                    Cancelar
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="small"
                                                    color="success"
                                                    variant="outlined"
                                                    className="!text-sm"
                                                    onClick={() => setIsEnabled(true)}
                                                >
                                                    Registrar lluvias
                                                </Button>
                                            )}
                                        </TableCell>
                                    )}
                                    <TableCell colSpan={getDaysActualMonth()} className="!text-center !font-bold !text-2xl">
                                        Lluvias de {month} - {year}
                                    </TableCell>
                                    <TableCell rowSpan={2} className="!text-center !font-bold !text-xl">
                                        Total mes
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Pluviómetro</TableCell>
                                    {Array.from({ length: getDaysActualMonth() }).map((_, day) => (
                                        <TableCell
                                            key={day + 1}
                                            align="left"
                                            className="!border-r-[0.5px] !bg-blue-400 !min-w-10"
                                        >
                                            {day + 1}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.obtenerPluviometrosYLluvias.map((pluviometro) => (
                                    <Pluviometro key={pluviometro.id_pluviometro} pluviometro={pluviometro} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Grid2>
            {rol === 1 && (
                <Grid2 size={12}>
                    <Button
                        variant="contained"
                        disabled={submitting || arrayLluvias.length === 0 || !isEnabled}
                        onClick={submitLluvia}
                        className="!h-10 !w-48"
                    >
                        {submitting ? <Loading /> : 'Registrar lluvias'}
                    </Button>
                </Grid2>
            )}
            {data?.obtenerPluviometrosYLluvias.length !== 0 && (
                <Grid2 size={12} display={'flex'} justifyContent={'center'} mt={2} mb={2}>
                    <Button
                        variant="contained"
                        onClick={() => generarPDF(year, month, getDaysActualMonth, data!, setIsLoading)}
                        disabled={isLoading}
                    >
                        Generar Informe
                    </Button>
                </Grid2>
            )}
        </>
    );
};

export default ListPluviometros;
