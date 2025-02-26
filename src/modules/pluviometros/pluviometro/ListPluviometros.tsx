import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
    Box,
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
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
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
import { meses } from '../constants/constants';

interface Props {}

const ListPluviometros: React.FC<Props> = ({}) => {
    const { submitting, submitLluvia } = usePluviometro();
    const { generarPDF } = useLluviasActuales();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filtersDate, setFiltersDate] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });
    const { isEnabled, arrayLluvias, setIsEnabled, setArrayLluvias } = useContext(PluviometroContext);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, error, loading } = useQuery<GetPluviometrosYLuviasResponse>(OBTENER_PLUVIOMETROS_Y_LLUVIAS, {
        variables: {
            filterLluviasInput: {
                month: filtersDate.month,
                year: filtersDate.year
            }
        }
    });
    const DAYS_MONTH = new Date(filtersDate.year, filtersDate.month, 0).getDate();

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    const handleBack = () => {
        setFiltersDate((prevState) => ({
            ...prevState,
            month: prevState.month - 1 === 0 ? 12 : prevState.month - 1
        }));
    };
    const handleNext = () => {
        setFiltersDate((prevState) => ({
            ...prevState,
            month: prevState.month + 1
        }));
    };

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
                                            <Box className="!flex">
                                                <Button className="!mt-2" onClick={handleBack} disabled={filtersDate.month === 1}>
                                                    <ArrowBackIosNewOutlinedIcon />
                                                </Button>
                                                <Button
                                                    className="!mt-2"
                                                    onClick={handleNext}
                                                    disabled={filtersDate.month === new Date().getMonth() + 1}
                                                >
                                                    <ArrowForwardIosOutlinedIcon />
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    )}
                                    <TableCell colSpan={DAYS_MONTH} className="!text-center !font-bold !text-2xl">
                                        Lluvias de {meses[filtersDate.month - 1].label} - {filtersDate.year}
                                    </TableCell>
                                    <TableCell rowSpan={2} className="!text-center !font-bold !text-xl">
                                        Total mes
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Pluviómetro</TableCell>
                                    {Array.from({ length: DAYS_MONTH }).map((_, day) => (
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
                                    <Pluviometro
                                        key={pluviometro.id_pluviometro}
                                        pluviometro={pluviometro}
                                        year={filtersDate.year}
                                        month={filtersDate.month}
                                        DAYS_MONTH={DAYS_MONTH}
                                    />
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
                        onClick={() => submitLluvia(filtersDate.year, filtersDate.month)}
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
                        onClick={() =>
                            generarPDF(filtersDate.year, meses[filtersDate.month - 1].label, DAYS_MONTH, data!, setIsLoading)
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

export default ListPluviometros;
