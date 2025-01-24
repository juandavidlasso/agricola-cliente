import React from 'react';
import { useQuery } from '@apollo/client';
import {
    CircularProgress,
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
import { useActionsTablones } from './hooks/useActions';
import TablonActions from './TablonActions';

interface Props {}

const ListTablones: React.FC<Props> = ({}) => {
    const { onEdit, onDelete, openModal, formType, onClose, header } = useActionsTablones();
    const { id_corte, estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, loading, error } = useQuery<GetResponseTablonesCorte>(OBTENER_TABLONES_CORTE, {
        variables: { idCorte: id_corte }
    });

    if (error) return <Alert message={error.message} />;

    if (loading) return <CircularProgress />;

    return (
        <>
            <TablonActions isOpen={openModal} formType={formType} handleClose={onClose} title={header} />
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
                                <Tablon key={tablon.id_tablon} tablon={tablon} onEdit={onEdit} onDelete={onDelete} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default ListTablones;
