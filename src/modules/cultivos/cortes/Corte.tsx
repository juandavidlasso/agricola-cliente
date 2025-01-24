import React from 'react';
import Link from 'next/link';
import { Button, Chip, TableCell, TableRow } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Corte } from '@interfaces/cultivos/cortes';
import { User } from '@interfaces/user';
import useAppDispatch from '@hooks/useAppDispatch';
import { saveCorte } from '@store/cultivos/actions';

interface Props {
    corte: Corte;
    user: User;
    id_suerte: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCorteId: React.Dispatch<React.SetStateAction<number>>;
}

const CorteComponent: React.FC<Props> = ({ corte, user, id_suerte, setOpen, setCorteId }) => {
    const dispatch = useAppDispatch();
    const { id_corte, numero, fecha_siembra, fecha_inicio, fecha_corte, estado, suerte_id, activo } = corte;
    return (
        <TableRow key={id_corte}>
            <TableCell align="center">
                <Link
                    href={`/corte/${id_corte}`}
                    onClick={() =>
                        dispatch(
                            saveCorte({
                                id_corte,
                                numero,
                                fecha_inicio,
                                fecha_siembra,
                                fecha_corte,
                                estado,
                                activo,
                                area: 0,
                                suerte_id
                            })
                        )
                    }
                    className="!text-[15px] !underline !text-red-600 hover:!text-blue-600 !mx-auto !w-fit"
                >
                    Corte {numero}
                </Link>
            </TableCell>
            <TableCell align="center">{fecha_siembra}</TableCell>
            <TableCell align="center">{fecha_inicio}</TableCell>
            <TableCell align="center">{fecha_corte}</TableCell>
            <TableCell align="center">
                {fecha_corte ? (
                    id_suerte === suerte_id ? (
                        <Chip label="Cosechado" color="warning" icon={<CheckOutlinedIcon />} />
                    ) : (
                        <Chip label="Renovado" color="info" icon={<CheckOutlinedIcon />} />
                    )
                ) : null}
            </TableCell>
            {user.rol === 1 && (
                <TableCell align="center">
                    {fecha_corte ? (
                        estado ? (
                            <Button
                                size="small"
                                variant="contained"
                                onClick={() => {
                                    setCorteId(id_corte);
                                    setOpen(true);
                                }}
                            >
                                Terminar
                            </Button>
                        ) : (
                            <Chip label="Terminado" color="error" icon={<CheckOutlinedIcon />} />
                        )
                    ) : (
                        ''
                    )}
                </TableCell>
            )}
        </TableRow>
    );
};

export default CorteComponent;
