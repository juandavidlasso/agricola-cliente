import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { TablonState } from '@interfaces/cultivos/tablones';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import useAppDispatch from '@hooks/useAppDispatch';
import { saveTablon } from '@store/cultivos/actions';
import { DataType } from '@interfaces/cultivos/labores';

interface Props {
    tablon: TablonState;
    setFormType: React.Dispatch<React.SetStateAction<DataType>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tablon: React.FC<Props> = ({ tablon, setFormType, setOpenModal }) => {
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
                            setFormType('update');
                            setOpenModal(true);
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
                            setFormType('delete');
                            setOpenModal(true);
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
