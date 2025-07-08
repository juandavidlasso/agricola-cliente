import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Grid2, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetAplicacionLaboresResponse } from '@interfaces/cultivos/labores';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { OBTENER_APLICACIONES_LABORES } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import DialogModal from '@components/Dialog';
import LaborRegister from './LaborRegister';
import LaborDelete from './LaborDelete';
import ListSuertes from '../registroDatos/components/suertes/ListSuertes';
import { useLabores } from './hooks/useLabores';

interface Props {}

const ListAplicacionesLabores: React.FC<Props> = ({}) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, error, loading } = useQuery<GetAplicacionLaboresResponse>(OBTENER_APLICACIONES_LABORES, {
        variables: { corteId: id_corte }
    });
    const {
        openModal,
        modalSuertes,
        laborEdit,
        formType,
        setOpenModal,
        setModalSuertes,
        setLaborEdit,
        setFormType,
        handleSubmitLabor
    } = useLabores();

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {openModal && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => {
                        setFormType('create');
                        setOpenModal(false);
                    }}
                    title={formType === 'create' ? 'Registrar labor' : formType === 'update' ? 'Editar labor' : 'Eliminar labor'}
                    height={formType === 'delete' ? 40 : 90}
                    width={formType === 'delete' ? '40%' : '70%'}
                    id="modal-registros"
                >
                    {formType === 'delete' ? (
                        <LaborDelete
                            labor={laborEdit}
                            onClose={() => {
                                setFormType('create');
                                setOpenModal(false);
                            }}
                        />
                    ) : (
                        <LaborRegister
                            formType={formType}
                            labor={laborEdit}
                            onClose={() => {
                                setFormType('create');
                                setOpenModal(false);
                            }}
                        />
                    )}
                </DialogModal>
            )}
            {modalSuertes && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => setModalSuertes(false)}
                    title={'Selecciona la suerte y el corte'}
                    height={90}
                    id="modal-suertes"
                    width="80%"
                >
                    <ListSuertes handleSubmit={(corteId: number) => handleSubmitLabor(corteId, laborEdit?.labor_id!)} />
                </DialogModal>
            )}
            <Grid2 container>
                <Grid2 size={12}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            setLaborEdit(undefined);
                            setFormType('create');
                            setOpenModal(true);
                        }}
                        className="!mb-3"
                    >
                        Registrar labor
                    </Button>
                </Grid2>
                <Grid2 size={12}>
                    <div style={{ height: 'auto', width: '98%' }}>
                        {data?.obtenerAplicacionesLabores?.length === 0 ? (
                            <Typography>No hay labores registradas</Typography>
                        ) : (
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead sx={{ background: '#154360' }}>
                                        <TableRow>
                                            <TableCell className="!text-white" align="center">
                                                Fecha
                                            </TableCell>
                                            <TableCell className="!text-white" align="center">
                                                Labor
                                            </TableCell>
                                            <TableCell className="!text-white" align="center">
                                                Equipo
                                            </TableCell>
                                            <TableCell className="!text-white" align="center">
                                                Estado
                                            </TableCell>
                                            <TableCell className="!text-white" align="center">
                                                No. de Pases
                                            </TableCell>
                                            <TableCell className="!text-white" align="center">
                                                Realizado Por
                                            </TableCell>
                                            <TableCell className="!text-white" align="center">
                                                Costo x Hta
                                            </TableCell>
                                            <TableCell className="!text-white" align="center">
                                                Nota
                                            </TableCell>
                                            {rol === 1 && (
                                                <TableCell className="!text-white" align="center">
                                                    Acciones
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data?.obtenerAplicacionesLabores?.map((row) => (
                                            <TableRow key={row.id_aplicacion_labores}>
                                                <TableCell className="!p-1 !text-[12px]" align="center">
                                                    {row?.labor?.fecha}
                                                    <br />
                                                    <span className="!font-bold">Suertes:</span>
                                                    <br />
                                                    {row?.labor?.suertes}
                                                </TableCell>
                                                <TableCell className="!p-1" align="center">
                                                    {row?.labor?.actividad}
                                                </TableCell>
                                                <TableCell className="!p-1" align="center">
                                                    {row?.labor?.equipo}
                                                </TableCell>
                                                <TableCell className="!p-1" align="center">
                                                    {row?.labor?.estado}
                                                </TableCell>
                                                <TableCell className="!p-1" align="center">
                                                    {row?.labor?.pases}
                                                </TableCell>
                                                <TableCell className="!p-1" align="center">
                                                    {row?.labor?.aplico}
                                                </TableCell>
                                                <TableCell className="!p-1" align="center">
                                                    {row?.labor?.costo}
                                                </TableCell>
                                                <TableCell className="!p-1" align="center">
                                                    {row?.labor?.nota}
                                                </TableCell>
                                                {rol === 1 && (
                                                    <TableCell className="!p-1" align="center">
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                height: '100%',
                                                                alignItems: 'center',
                                                                width: '100%',
                                                                justifyContent: 'center',
                                                                gap: 0.5
                                                            }}
                                                        >
                                                            <Button
                                                                onClick={() => {
                                                                    setLaborEdit(row);
                                                                    setFormType('update');
                                                                    setOpenModal(true);
                                                                }}
                                                                variant="outlined"
                                                                color="warning"
                                                                sx={{
                                                                    fontSize: 8,
                                                                    minWidth: 70,
                                                                    maxWidth: 80,
                                                                    border: '1px solid #D4AC0D !important',
                                                                    ':hover': {
                                                                        background: '#D4AC0D !important',
                                                                        border: '1px solid #D4AC0D !important',
                                                                        color: '#FFFFFF !important'
                                                                    }
                                                                }}
                                                            >
                                                                Editar
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    setLaborEdit(row);
                                                                    setFormType('delete');
                                                                    setOpenModal(true);
                                                                }}
                                                                variant="outlined"
                                                                color="error"
                                                                sx={{
                                                                    fontSize: 8,
                                                                    minWidth: 70,
                                                                    maxWidth: 80,
                                                                    border: '1px solid #922B21 !important',
                                                                    ':hover': {
                                                                        background: '#922B21 !important',
                                                                        border: '1px solid #922B21 !important',
                                                                        color: '#FFFFFF !important'
                                                                    }
                                                                }}
                                                            >
                                                                Eliminar
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    setLaborEdit(row);
                                                                    setModalSuertes(true);
                                                                }}
                                                                variant="outlined"
                                                                color="primary"
                                                                sx={{
                                                                    fontSize: 8,
                                                                    border: '1px solid #1f618d !important',
                                                                    textTransform: 'none',
                                                                    ':hover': {
                                                                        background: '#1f618d !important',
                                                                        border: '1px solid #1f618d !important',
                                                                        color: '#FFFFFF !important'
                                                                    }
                                                                }}
                                                            >
                                                                Aplicar en otra suerte
                                                            </Button>
                                                        </Box>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </div>
                </Grid2>
            </Grid2>
        </>
    );
};

export default ListAplicacionesLabores;
