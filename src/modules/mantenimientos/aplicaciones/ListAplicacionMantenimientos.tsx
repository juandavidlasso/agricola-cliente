import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import { AplicacionMantenimiento } from '@interfaces/mantenimientos/aplicaciones';
import { MaquinariaContext } from 'src/context/maquinaria/MaquinariaContext';
import { GetInsumosResponse } from '@interfaces/insumos';
import { OBTENER_INSUMOS } from '@graphql/queries';
import ModalLoading from '@components/Modal';
import Alert from '@components/Alert';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {
    aplicacion: AplicacionMantenimiento;
}

const ListAplicacionMantenimientos: React.FC<Props> = ({ aplicacion }) => {
    const { setTitle, setHeight, setType, setFormType, setOpenModal, setAplicacionMantenimientoEdit, setMantenimientoEdit } =
        useContext(MaquinariaContext);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, loading, error } = useQuery<GetInsumosResponse>(OBTENER_INSUMOS);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <Grid2 size={12} mt={3}>
            <div>
                <Accordion className="!p-3">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${aplicacion.idApMant}-content`}
                        id={`panel${aplicacion.idApMant}-header`}
                        className="!flex !items-center !justify-between"
                    >
                        <Box className="!w-[50%] !flex !items-center">
                            <Typography component="span">
                                <HikingOutlinedIcon />
                                Fecha mantenimiento: {aplicacion.fecha} - {aplicacion.nombre.toUpperCase()}
                            </Typography>
                        </Box>
                        {rol === 1 && (
                            <Box className="!w-[50%] !flex !justify-end !gap-4">
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="success"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTitle('Registrar mantenimiento');
                                        setHeight(90);
                                        setType('create');
                                        setFormType('mantenimiento');
                                        setAplicacionMantenimientoEdit(aplicacion);
                                        setOpenModal(true);
                                    }}
                                >
                                    Agregar mantenimiento
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="warning"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTitle('Actualizar aplicación mantenimiento');
                                        setHeight(70);
                                        setType('update');
                                        setFormType('aplicacion');
                                        setAplicacionMantenimientoEdit(aplicacion);
                                        setOpenModal(true);
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTitle('Eliminar aplicación mantenimiento');
                                        setHeight(50);
                                        setType('delete');
                                        setFormType('aplicacion');
                                        setAplicacionMantenimientoEdit(aplicacion);
                                        setOpenModal(true);
                                    }}
                                >
                                    Eliminar
                                </Button>
                            </Box>
                        )}
                    </AccordionSummary>
                    <AccordionDetails>
                        {aplicacion.listMantenimientos?.length === 0 ? (
                            'No hay mantenimientos registrados'
                        ) : (
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Insumo</TableCell>
                                            <TableCell align="center">Cantidad</TableCell>
                                            <TableCell align="center">Cambio</TableCell>
                                            <TableCell align="center">Próximo cambio</TableCell>
                                            <TableCell align="center">Detalle</TableCell>
                                            {rol === 1 && <TableCell align="center">Acciones</TableCell>}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {aplicacion.listMantenimientos?.map((mantenimiento) => {
                                            const nextChange = mantenimiento.tipoCambio
                                                ? Number(Number(mantenimiento.horaCambio) + mantenimiento.proximoCambio)
                                                : dayjs(mantenimiento.horaCambio)
                                                      .add(mantenimiento.proximoCambio, 'days')
                                                      .format('YYYY-MM-DD');
                                            return (
                                                <TableRow key={mantenimiento.idMantenimiento}>
                                                    <TableCell component="th" scope="row">
                                                        {data?.obtenerInsumos?.find(
                                                            (data) => data.idInsumo === mantenimiento.insumoId
                                                        )?.nombre ?? ''}
                                                    </TableCell>
                                                    <TableCell align="center">{mantenimiento.cantidad}</TableCell>
                                                    <TableCell align="center">{mantenimiento.horaCambio}</TableCell>
                                                    <TableCell align="center">{nextChange}</TableCell>
                                                    <TableCell align="center">{mantenimiento.detalle}</TableCell>
                                                    {rol === 1 && (
                                                        <TableCell align="center" className="!flex !flex-col !gap-2">
                                                            <Button
                                                                variant="text"
                                                                color="warning"
                                                                className="!text-sm !border-[1px] !border-solid !border-yellow-600 !p-1"
                                                                onClick={() => {
                                                                    setTitle('Actualizar mantenimiento');
                                                                    setHeight(80);
                                                                    setType('update');
                                                                    setFormType('mantenimiento');
                                                                    setMantenimientoEdit(mantenimiento);
                                                                    setOpenModal(true);
                                                                }}
                                                            >
                                                                Editar
                                                            </Button>
                                                            <Button
                                                                variant="text"
                                                                color="error"
                                                                className="!text-sm !border-[1px] !border-solid !border-red-600 !p-1"
                                                                onClick={() => {
                                                                    setTitle('Eliminar mantenimiento');
                                                                    setHeight(50);
                                                                    setType('delete');
                                                                    setFormType('mantenimiento');
                                                                    setMantenimientoEdit(mantenimiento);
                                                                    setOpenModal(true);
                                                                }}
                                                            >
                                                                Eliminar
                                                            </Button>
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </AccordionDetails>
                </Accordion>
            </div>
        </Grid2>
    );
};

export default ListAplicacionMantenimientos;
