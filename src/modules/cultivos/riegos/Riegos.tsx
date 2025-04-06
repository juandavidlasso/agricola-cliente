import React, { useContext } from 'react';
import { Box, Button, Card, CardContent, Grid2, Typography } from '@mui/material';
import { Riego } from '@interfaces/cultivos/riegos';
import TablonesTransfer from './TablonesTransfer';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {
    riego: Riego;
}

const Riegos: React.FC<Props> = ({ riego }) => {
    const { estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { setOpenModalForms, setFormType, setRiegoEdit } = useContext(CultivosContext);
    return (
        <Grid2 size={{ xs: 12, sm: 4 }} p={2}>
            <Box>
                <Card variant="elevation">
                    <>
                        <CardContent className="!p-3">
                            <Box className="!flex !justify-between !p-2">
                                <Box>
                                    <Typography>Fecha riego: {riego.fecha}</Typography>
                                </Box>
                                {estado && rol === 1 && (
                                    <Box className="!gap-2 !flex">
                                        <Button
                                            onClick={() => {
                                                setRiegoEdit(riego);
                                                setFormType('delete');
                                                setOpenModalForms(true);
                                            }}
                                            variant="outlined"
                                            color="error"
                                            size="medium"
                                            sx={{
                                                fontSize: 10,
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
                                                setRiegoEdit(riego);
                                                setFormType('update');
                                                setOpenModalForms(true);
                                            }}
                                            variant="outlined"
                                            color="error"
                                            size="medium"
                                            sx={{
                                                fontSize: 10,
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
                                    </Box>
                                )}
                            </Box>
                            <Box>
                                <TablonesTransfer riego={riego} />
                            </Box>
                        </CardContent>
                    </>
                </Card>
            </Box>
        </Grid2>
    );
};

export default Riegos;
