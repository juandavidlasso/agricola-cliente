import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { OBTENER_LABORES } from '@graphql/queries';
import { DataType, GetLaboresResponse } from '@interfaces/cultivos/labores';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {
    setFormType: React.Dispatch<React.SetStateAction<DataType>>;
    setIdLabor: React.Dispatch<React.SetStateAction<number | undefined>>;
    setModalSuertes: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListLabores: React.FC<Props> = ({ setFormType, setIdLabor, setModalSuertes }) => {
    const { data, error, loading } = useQuery<GetLaboresResponse>(OBTENER_LABORES);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;
    return (
        <TableContainer component={Paper} className="!min-w-full">
            <Table size="small" aria-label="a dense table">
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
                    {data?.obtenerLabores?.map((row) => (
                        <TableRow key={row.id_labor}>
                            <TableCell className="!p-1 !text-[12px]" align="center">
                                {row?.fecha}
                                <br />
                                <span className="!font-bold">Suertes:</span>
                                <br />
                                {row?.suertes}
                            </TableCell>
                            <TableCell className="!p-1" align="center">
                                {row?.actividad}
                            </TableCell>
                            <TableCell className="!p-1" align="center">
                                {row?.equipo}
                            </TableCell>
                            <TableCell className="!p-1" align="center">
                                {row?.estado}
                            </TableCell>
                            <TableCell className="!p-1" align="center">
                                {row?.pases}
                            </TableCell>
                            <TableCell className="!p-1" align="center">
                                {row?.aplico}
                            </TableCell>
                            <TableCell className="!p-1" align="center">
                                {row?.costo}
                            </TableCell>
                            <TableCell className="!p-1" align="center">
                                {row?.nota}
                            </TableCell>
                            {rol === 1 && (
                                <TableCell className="!p-1" align="center">
                                    <Button
                                        className="!text-sm !normal-case"
                                        onClick={() => {
                                            setFormType('create');
                                            setIdLabor(row?.id_labor);
                                            setModalSuertes(true);
                                        }}
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Aplicar en otra suerte
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ListLabores;
