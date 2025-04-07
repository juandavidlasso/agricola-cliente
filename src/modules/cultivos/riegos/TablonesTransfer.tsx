import React, { useContext, useState } from 'react';
import { Button, Checkbox, Grid2, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { OBTENER_RIEGOS_CORTE, OBTENER_TABLONES_CORTE } from '@graphql/queries';
import { GetResponseTablonesCorte, TablonState } from '@interfaces/cultivos/tablones';
import { Riego } from '@interfaces/cultivos/riegos';
import { ELIMINAR_APLICACION_RIEGO, REGISTRAR_APLICACION_RIEGO } from '@graphql/mutations';
import { AplicacionRiegos, GetAplicacionRiegoDelete, GetAplicacionRiegoRegister } from '@interfaces/cultivos/riegos/aplicacion';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {
    riego: Riego;
}

const TablonesTransfer: React.FC<Props> = ({ riego }) => {
    const { estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { data, error, loading } = useQuery<GetResponseTablonesCorte>(OBTENER_TABLONES_CORTE, {
        variables: { idCorte: riego.corte_id }
    });
    const [agregarAplicacionRiego] = useMutation<GetAplicacionRiegoRegister>(REGISTRAR_APLICACION_RIEGO);
    const [eliminarAplicacionRiego] = useMutation<GetAplicacionRiegoDelete>(ELIMINAR_APLICACION_RIEGO);
    const [checkedLeft, setCheckedLeft] = useState<TablonState[]>([]);
    const [checkedRight, setCheckedRight] = useState<AplicacionRiegos[]>([]);
    const validAdmin = estado && rol === 1;

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    const handleCheckedRight = async () => {
        const arrayTablones = [];
        for (let index = 0; index < checkedLeft.length; index++) {
            const element = {
                riego_id: riego.id_riego,
                tablon_id: checkedLeft[index].id_tablon,
                num_tablon: checkedLeft[index].numero
            };
            arrayTablones.push(element);
        }

        try {
            const { data } = await agregarAplicacionRiego({
                variables: {
                    createAplicacionRiegoInput: arrayTablones
                },
                refetchQueries: [{ query: OBTENER_RIEGOS_CORTE, variables: { corteId: riego.corte_id } }]
            });
            if (data?.agregarAplicacionRiego.length !== 0) {
                setCheckedLeft([]);
                setMessageType('success');
                setInfoMessage('El riego se aplico exitosamente.');
                setShowMessage(true);
            }
        } catch (error) {
            if (error instanceof ApolloError) {
                setMessageType('error');
                setInfoMessage(error.message.replace('Error:', ''));
                setShowMessage(true);
                return;
            }
            setMessageType('error');
            setInfoMessage(error as string);
            setShowMessage(true);
            return;
        }
    };

    const handleCheckedLeft = async () => {
        const arrayTablones = checkedRight.map((aplicacion) => aplicacion.id_apriego);

        try {
            const { data } = await eliminarAplicacionRiego({
                variables: {
                    ids: arrayTablones
                },
                refetchQueries: [{ query: OBTENER_RIEGOS_CORTE, variables: { corteId: riego.corte_id } }]
            });
            if (data?.eliminarAplicacionRiego.length !== 0) {
                setCheckedRight([]);
                setMessageType('success');
                setInfoMessage('El riego se elimino exitosamente.');
                setShowMessage(true);
            }
        } catch (error) {
            if (error instanceof ApolloError) {
                setMessageType('error');
                setInfoMessage(error.message.replace('Error:', ''));
                setShowMessage(true);
                return;
            }
            setMessageType('error');
            setInfoMessage(error as string);
            setShowMessage(true);
            return;
        }
    };

    return (
        <Grid2 container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Grid2 size={6}>
                <Typography color="error" textAlign={'left'} fontWeight={700}>
                    Tablones sin riego
                </Typography>
            </Grid2>
            <Grid2 size={6}>
                <Typography color="error" textAlign={'right'} fontWeight={700}>
                    Tablones con riego
                </Typography>
            </Grid2>
            <Grid2 size={5}>
                <Paper sx={{ overflow: 'auto' }}>
                    <List dense component="div" role="list">
                        {data?.obtenerTablonesPorCorte
                            .filter(
                                (tablon) => !riego.listAplicacionesRiegos.some((riego) => riego.tablon_id === tablon.id_tablon)
                            )
                            .map((value) => {
                                const labelId = `transfer-list-item-${value.id_tablon}-label`;

                                return (
                                    <ListItemButton
                                        key={value.id_tablon}
                                        role="listitem"
                                        onClick={() => {
                                            if (validAdmin) {
                                                const currentIndex = checkedLeft.indexOf(value);
                                                const newChecked = [...checkedLeft];

                                                if (currentIndex === -1) {
                                                    newChecked.push(value);
                                                } else {
                                                    newChecked.splice(currentIndex, 1);
                                                }

                                                setCheckedLeft(newChecked);
                                            }
                                        }}
                                        className="!p-1"
                                    >
                                        {validAdmin && (
                                            <ListItemIcon>
                                                <Checkbox
                                                    sx={{
                                                        color: '#000000'
                                                    }}
                                                    checked={checkedLeft.includes(value)}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{
                                                        'aria-labelledby': labelId
                                                    }}
                                                />
                                            </ListItemIcon>
                                        )}
                                        <ListItemText id={labelId} primary={`Tablón ${value.id_tablon}`} />
                                    </ListItemButton>
                                );
                            })}
                    </List>
                </Paper>
            </Grid2>
            <Grid2 size={2}>
                <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={checkedLeft.length === 0}
                    aria-label="move selected right"
                    className="!min-w-full !max-w-full"
                >
                    &gt;
                </Button>
                <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={checkedRight.length === 0}
                    aria-label="move selected left"
                    className="!min-w-full !max-w-full"
                >
                    &lt;
                </Button>
            </Grid2>
            <Grid2 size={5}>
                <Paper sx={{ overflow: 'auto' }}>
                    <List dense component="div" role="list">
                        {riego.listAplicacionesRiegos.map((value) => {
                            const labelId = `transfer-list-item-${value.id_apriego}-label`;

                            return (
                                <ListItemButton
                                    key={value.id_apriego}
                                    role="listitem"
                                    onClick={() => {
                                        if (validAdmin) {
                                            const currentIndex = checkedRight.indexOf(value);
                                            const newChecked = [...checkedRight];

                                            if (currentIndex === -1) {
                                                newChecked.push(value);
                                            } else {
                                                newChecked.splice(currentIndex, 1);
                                            }

                                            setCheckedRight(newChecked);
                                        }
                                    }}
                                >
                                    {validAdmin && (
                                        <ListItemIcon>
                                            <Checkbox
                                                sx={{
                                                    color: '#000000'
                                                }}
                                                checked={checkedRight.includes(value)}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </ListItemIcon>
                                    )}
                                    <ListItemText id={labelId} primary={`Tablón ${value.num_tablon}`} />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </Paper>
            </Grid2>
        </Grid2>
    );
};

export default TablonesTransfer;
