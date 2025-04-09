import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
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
import { OBTENER_COSECHA_CORTE } from '@graphql/queries';
import ModalLoading from '@components/Modal';
import { GetCosechaResponse } from '@interfaces/cultivos/cosechas';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import CorteUpdatePopover from './CorteUpdatePopover';
import Alert from '@components/Alert';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const ListCosecha: React.FC<Props> = () => {
    const { validateCosecha, setOpenModalForms, setFormType, setCosechaEdit } = useContext(CultivosContext);
    const { id_corte, fecha_inicio, fecha_corte, estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, error, loading } = useQuery<GetCosechaResponse>(OBTENER_COSECHA_CORTE, {
        variables: { idCorte: id_corte }
    });
    // Calcular TCH
    const peso = !error ? data?.obtenerCosechaCorte.peso : 0;
    const area = !error ? data?.obtenerCosechaCorte.cortePadre?.listTablones?.reduce((cur, val) => cur + val.area, 0) : 0;
    const TCH = !error ? Number((peso! / area!).toFixed(1)) : 0;
    // Calcular TCHN
    const finicio = !error ? moment(fecha_inicio) : moment();
    const fcorte = !error ? moment(fecha_corte) : moment();
    const edadCorte = !error ? fcorte.diff(finicio, 'months', true).toFixed(1) : 0;
    const TCHM = !error ? Number((Number((peso! / area!).toFixed(1)) / Number(edadCorte)).toFixed(1)) : 0;

    if (error && error.message !== 'Error: No hay cosecha registrada') return <Alert message={error.message} />;
    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {validateCosecha && <CorteUpdatePopover />}
            <Grid2 container>
                {rol === 1 && error && (
                    <Grid2 size={12}>
                        <Button
                            variant="contained"
                            className="!mb-5"
                            onClick={() => {
                                setFormType('create');
                                setOpenModalForms(true);
                            }}
                        >
                            Registrar cosecha
                        </Button>
                    </Grid2>
                )}
                <Grid2 size={12}>
                    {error && error.message === 'Error: No hay cosecha registrada' ? (
                        <Typography>No hay cosecha registrada</Typography>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Peso Neto - Tn</TableCell>
                                        <TableCell align="center">TCH</TableCell>
                                        <TableCell align="center">TCHM</TableCell>
                                        <TableCell align="center">% - Rendimiento</TableCell>
                                        <TableCell align="center">Número Vagones</TableCell>
                                        <TableCell align="center">Número Mulas</TableCell>
                                        <TableCell align="center">Nota</TableCell>
                                        {estado && rol === 1 && <TableCell align="center">Acciones</TableCell>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">{data?.obtenerCosechaCorte?.peso}</TableCell>
                                        <TableCell align="center">{TCH}</TableCell>
                                        <TableCell align="center">{TCHM}</TableCell>
                                        <TableCell align="center">{data?.obtenerCosechaCorte?.rendimiento}</TableCell>
                                        <TableCell align="center">{data?.obtenerCosechaCorte?.numeroVagones}</TableCell>
                                        <TableCell align="center">{data?.obtenerCosechaCorte?.numeroMulas}</TableCell>
                                        <TableCell
                                            align="left"
                                            dangerouslySetInnerHTML={{
                                                __html: data?.obtenerCosechaCorte?.nota?.replaceAll(/\n/g, '<br />') ?? ''
                                            }}
                                        />
                                        {estado && rol === 1 && (
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        setFormType('update');
                                                        setCosechaEdit(data?.obtenerCosechaCorte);
                                                        setOpenModalForms(true);
                                                    }}
                                                    variant="contained"
                                                    sx={{
                                                        color: '#FFFFFF',
                                                        fontSize: 10,
                                                        minWidth: 70,
                                                        maxWidth: 80,
                                                        border: '1px solid #D4AC0D !important',
                                                        background: '#D4AC0D !important',
                                                        ':hover': {
                                                            background: '#D4AC0D90 !important',
                                                            border: '1px solid #D4AC0D !important',
                                                            color: '#FFFFFF !important'
                                                        }
                                                    }}
                                                >
                                                    Editar
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid2>
            </Grid2>
        </>
    );
};

export default ListCosecha;
