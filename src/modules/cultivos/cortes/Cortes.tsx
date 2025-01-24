import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Corte } from '@interfaces/cultivos/cortes';
import { User } from '@interfaces/user';
import CorteComponent from './Corte';

interface Props {
    data: Corte[];
    user: User;
    id_suerte: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCorteId: React.Dispatch<React.SetStateAction<number>>;
}

const Cortes: React.FC<Props> = ({ data, user, id_suerte, setOpen, setCorteId }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Fecha de siembra</TableCell>
                        <TableCell align="center">Fecha de inicio</TableCell>
                        <TableCell align="center">Fecha de corte</TableCell>
                        <TableCell align="center">Estado</TableCell>
                        {user.rol === 1 && <TableCell align="center">Acciones</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <CorteComponent
                            key={row.id_corte}
                            corte={row}
                            user={user}
                            id_suerte={id_suerte}
                            setOpen={setOpen}
                            setCorteId={setCorteId}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Cortes;
