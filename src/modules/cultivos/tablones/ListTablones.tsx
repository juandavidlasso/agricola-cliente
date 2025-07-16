import React from 'react';
import { useQuery } from '@apollo/client';
import {
    Button,
    CircularProgress,
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
import { OBTENER_TABLONES_CORTE } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import Alert from '@components/Alert';
import { GetResponseTablonesCorte } from '@interfaces/cultivos/tablones';
import Tablon from './Tablon';
import DialogModal from '@components/Dialog';
import TablonRegistrar from './TablonRegistrar';
import TablonEliminar from './TablonEliminar';
import { useTablones } from './hooks/useTablones';

interface Props {}

const ListTablones: React.FC<Props> = ({}) => {
    const { id_corte, estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, loading, error } = useQuery<GetResponseTablonesCorte>(OBTENER_TABLONES_CORTE, {
        variables: { idCorte: id_corte }
    });
    const { openModal, formType, setOpenModal, setFormType } = useTablones();

    if (error) return <Alert message={error.message} />;

    if (loading) return <CircularProgress />;

    return (
        <>
            {openModal && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => setOpenModal(false)}
                    title={
                        formType === 'delete'
                            ? 'Eliminar tablón'
                            : formType === 'create'
                            ? 'Registrar tablón'
                            : 'Actualizar tablón'
                    }
                    height={55}
                    closeBack={false}
                    id="modal-tablon"
                >
                    {formType === 'delete' ? (
                        <TablonEliminar handleClose={() => setOpenModal(false)} />
                    ) : (
                        <TablonRegistrar formType={formType} handleClose={() => setOpenModal(false)} />
                    )}
                </DialogModal>
            )}
            <Grid2 container>
                {rol === 1 && (
                    <Grid2 size={12}>
                        <Button
                            variant="contained"
                            className="!mb-5"
                            onClick={() => {
                                setFormType('create');
                                setOpenModal(true);
                            }}
                        >
                            Registrar tablón
                        </Button>
                    </Grid2>
                )}
                <Grid2 size={12}>
                    {data?.obtenerTablonesPorCorte.length === 0 ? (
                        <Typography variant="h4" component="h4" color="text.primary" textAlign="center">
                            No hay tablones registrados
                        </Typography>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: '100%' }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Tablón</TableCell>
                                        <TableCell align="center">Área</TableCell>
                                        {rol === 1 && estado && <TableCell align="center">Acciones</TableCell>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.obtenerTablonesPorCorte.map((tablon) => (
                                        <Tablon
                                            key={tablon.id_tablon}
                                            tablon={tablon}
                                            setFormType={setFormType}
                                            setOpenModal={setOpenModal}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid2>
            </Grid2>
        </>
    );
};

export default ListTablones;
