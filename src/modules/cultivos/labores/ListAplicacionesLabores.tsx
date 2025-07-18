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
import { useLabores } from './hooks/useLabores';
import PopoverLabores from './PopoverLabores';
import PopoverSuertesLabores from './PopoverSuertesLabores';
import DialogModal from '@components/Dialog';
import ListLabores from './ListLabores';

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
        openLabores,
        setIdLabor,
        setOpenModal,
        setModalSuertes,
        setLaborEdit,
        setFormType,
        handleSubmitLabor,
        setLaborDuplicate,
        setOpenLabores
    } = useLabores();

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {openModal && <PopoverLabores handleClose={() => setOpenModal(false)} laborEdit={laborEdit} formType={formType} />}
            {modalSuertes && (
                <PopoverSuertesLabores
                    handleClose={() => setModalSuertes(false)}
                    handleSubmitLabor={handleSubmitLabor}
                    laborEdit={laborEdit}
                    formType={formType}
                    setFormType={setFormType}
                    setLaborDuplicate={setLaborDuplicate}
                />
            )}
            {openLabores && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => setOpenLabores(false)}
                    title="Listado de labores"
                    height={90}
                    id="modal-labores"
                    width="95%"
                >
                    <ListLabores setFormType={setFormType} setIdLabor={setIdLabor} setModalSuertes={setModalSuertes} />
                </DialogModal>
            )}
            <Grid2 container>
                {rol === 1 && (
                    <Grid2 size={12}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                                setFormType('create');
                                setOpenModal(true);
                            }}
                            className="!mb-3 !normal-case !mr-2"
                        >
                            Registrar labor
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => setOpenLabores(true)}
                            className="!mb-3 !normal-case"
                        >
                            Ver todas las labores
                        </Button>
                    </Grid2>
                )}
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
                                                                className="!text-[10px] !py-1 !px-3 !min-w-fit"
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
                                                                className="!text-[10px] !py-1 !px-3 !min-w-fit"
                                                            >
                                                                Eliminar
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    setLaborEdit(row);
                                                                    setFormType('duplicate');
                                                                    setModalSuertes(true);
                                                                }}
                                                                variant="outlined"
                                                                color="success"
                                                                className="!text-[10px] !py-1 !px-3 !min-w-fit"
                                                            >
                                                                Duplicar
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    setFormType('create');
                                                                    setIdLabor(row?.labor_id);
                                                                    setModalSuertes(true);
                                                                }}
                                                                variant="outlined"
                                                                color="primary"
                                                                className="!text-[8px] !py-1 !px-3 !min-w-fit !normal-case"
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
