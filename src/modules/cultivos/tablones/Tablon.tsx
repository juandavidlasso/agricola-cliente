import React, { useContext } from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { TablonState } from '@interfaces/cultivos/tablones';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import useAppDispatch from '@hooks/useAppDispatch';
import { saveTablon } from '@store/cultivos/actions';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    tablon: TablonState;
}

const Tablon: React.FC<Props> = ({ tablon }) => {
    const dispatch = useAppDispatch();
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { setFormType, setOpenModalForms } = useContext(CultivosContext);
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
                            setOpenModalForms(true);
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
                            setOpenModalForms(true);
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
