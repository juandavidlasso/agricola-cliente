import React, { useContext } from 'react';
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
import SideModal from '@components/Side';
import { MaquinariaContext } from 'src/context/maquinaria/MaquinariaContext';
import { OBTENER_INSUMOS } from '@graphql/queries';
import { GetInsumosResponse } from '@interfaces/insumos';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {}

const ListInsumos: React.FC<Props> = ({}) => {
    const { openModalInsumos, setOpenModalInsumos, setOpenModal, setTitle, setHeight, setFormType, setType, setInsumoEdit } =
        useContext(MaquinariaContext);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, loading, error } = useQuery<GetInsumosResponse>(OBTENER_INSUMOS);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <SideModal isOpen={openModalInsumos} handleClose={() => setOpenModalInsumos(false)} direction={'right'} width={700}>
            <Grid2 container spacing={2} padding={2}>
                <Grid2 size={12} marginTop={1}>
                    <Typography variant="h4" component="h4" color="text.primary" textAlign="center">
                        Listado de Insumos
                    </Typography>
                </Grid2>
                {rol === 1 && (
                    <Grid2 size={12}>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                                setTitle('Registrar Insumo');
                                setHeight(90);
                                setFormType('insumo');
                                setType('create');
                                setOpenModal(true);
                            }}
                        >
                            Registrar Insumo
                        </Button>
                    </Grid2>
                )}
                {data?.obtenerInsumos.length === 0 ? (
                    <Grid2 size={12}>
                        <Typography>No hay insumos registrados</Typography>
                    </Grid2>
                ) : (
                    <Grid2 size={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Nombre</TableCell>
                                        <TableCell align="center">Referencia</TableCell>
                                        <TableCell align="center">Marca</TableCell>
                                        <TableCell align="center">Cantidad</TableCell>
                                        {rol === 1 && <TableCell align="center">Acciones</TableCell>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.obtenerInsumos.map((insumo) => (
                                        <TableRow key={insumo.idInsumo}>
                                            <TableCell component="th" scope="row" align="center">
                                                {insumo.nombre}
                                            </TableCell>
                                            <TableCell align="center">{insumo.referencia}</TableCell>
                                            <TableCell align="center">{insumo.marca}</TableCell>
                                            <TableCell align="center">{insumo.cantidad}</TableCell>
                                            {rol === 1 && (
                                                <TableCell align="center" className="!flex-col !flex !gap-2">
                                                    <Button
                                                        className="!p-0 !border-yellow-600 !border-[1px] !border-solid !text-sm !rounded-md !text-yellow-600 w-fit"
                                                        onClick={() => {
                                                            setTitle('Actualizar Insumo');
                                                            setHeight(90);
                                                            setFormType('insumo');
                                                            setType('update');
                                                            setInsumoEdit(insumo);
                                                            setOpenModal(true);
                                                        }}
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        className="!p-0 !border-red-600 !border-[1px] !border-solid !text-sm !rounded-md !text-red-600 w-fit"
                                                        onClick={() => {
                                                            setTitle('Eliminar Insumo');
                                                            setHeight(50);
                                                            setFormType('insumo');
                                                            setType('delete');
                                                            setInsumoEdit(insumo);
                                                            setOpenModal(true);
                                                        }}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid2>
                )}
            </Grid2>
        </SideModal>
    );
};

export default ListInsumos;
