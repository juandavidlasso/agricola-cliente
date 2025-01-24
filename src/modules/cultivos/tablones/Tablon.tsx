import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { TablonState } from '@interfaces/cultivos/tablones';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import useAppDispatch from '@hooks/useAppDispatch';
import { saveTablon } from '@store/cultivos/actions';

interface Props {
    tablon: TablonState;
    onEdit: () => void;
    onDelete: () => void;
}

const Tablon: React.FC<Props> = ({ tablon, onEdit, onDelete }) => {
    const dispatch = useAppDispatch();
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { id_tablon, numero, area } = tablon;
    return (
        <TableRow key={id_tablon}>
            <TableCell component="th" scope="row" align="center">
                {numero}
            </TableCell>
            <TableCell align="center">{area}</TableCell>
            {rol === 1 && estado && (
                <TableCell className="!flex !gap-x-2 !justify-center">
                    <Button
                        size="small"
                        variant="contained"
                        color="warning"
                        onClick={() => {
                            dispatch(saveTablon(tablon));
                            onEdit();
                        }}
                    >
                        Editar
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => {
                            dispatch(saveTablon(tablon));
                            onDelete();
                        }}
                    >
                        Eliminar
                    </Button>
                </TableCell>
            )}
        </TableRow>
    );
};

export default Tablon;
