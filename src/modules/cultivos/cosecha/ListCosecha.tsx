import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { Button, Grid2, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { OBTENER_COSECHA_CORTE } from '@graphql/queries';
import ModalLoading from '@components/Modal';
import { GetCosechaResponse } from '@interfaces/cultivos/cosechas';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import CorteUpdatePopover from './CorteUpdatePopover';
import Alert from '@components/Alert';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const ListCosecha: React.FC<Props> = () => {
    const { validateCosecha, setOpenModalForms, setFormType, setCosechaEdit } = useContext(CultivosContext);
    const { id_corte, fecha_inicio, fecha_corte, estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, error, loading } = useQuery<GetCosechaResponse>(OBTENER_COSECHA_CORTE, {
        variables: { idCorte: id_corte }
    });
    // Calcular TCH
    const peso = !error ? data?.obtenerCosechaCorte.peso : 0;
    const area = !error ? data?.obtenerCosechaCorte.cortePadre?.listTablones?.reduce((cur, val) => cur + val.area, 0) : 0;
    const tch = !error ? Number((peso! / area!).toFixed(1)) : 0;
    // Calcular TCHN
    const finicio = !error ? moment(fecha_inicio) : moment();
    const fcorte = !error ? moment(fecha_corte) : moment();
    const edadCorte = !error ? fcorte.diff(finicio, 'months', true).toFixed(1) : 0;
    const tchm = !error ? Number((Number((peso! / area!).toFixed(1)) / Number(edadCorte)).toFixed(1)) : 0;

    if (error && error.message !== 'Error: No hay cosecha registrada') return <Alert message={error.message} />;
    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {validateCosecha && <CorteUpdatePopover />}
            <Grid2 container>
                <Grid2 size={12}>
                    <Button
                        variant="contained"
                        className="!mb-5"
                        onClick={() => {
                            setFormType('create');
                            setOpenModalForms(true);
                        }}
                    >
                        Registrar cosecha
                    </Button>
                </Grid2>
                <Grid2 size={12}>
                    {error && error.message === 'Error: No hay cosecha registrada' ? (
                        <Typography>No hay cosecha registrada</Typography>
                    ) : (
                        <List sx={{ width: '100%' }}>
                            <ListItem
                                disablePadding
                                className="!bg-slate-800 !rounded-lg !text-slate-100 !mt-3 !flex max-lg:!block"
                            >
                                <ListItemButton>
                                    <ListItemText primary="Peso Neto - Tn" secondary={data?.obtenerCosechaCorte.peso} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="TCH" secondary={tch} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="TCHM" secondary={tchm} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="% - Rendimiento" secondary={data?.obtenerCosechaCorte.rendimiento} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Número Vagones" secondary={data?.obtenerCosechaCorte.numeroVagones} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Número Mulas" secondary={data?.obtenerCosechaCorte.numeroMulas} />
                                </ListItemButton>
                                {estado && rol === 1 && (
                                    <ListItemButton>
                                        <ListItemText
                                            primary="Acciones"
                                            secondary={
                                                <Button
                                                    onClick={() => {
                                                        setFormType('update');
                                                        setCosechaEdit(data?.obtenerCosechaCorte);
                                                        setOpenModalForms(true);
                                                    }}
                                                    variant="contained"
                                                    sx={{
                                                        color: '#FFFFFF',
                                                        fontSize: 10,
                                                        minWidth: 70,
                                                        maxWidth: 80,
                                                        border: '1px solid #D4AC0D !important',
                                                        background: '#D4AC0D !important',
                                                        ':hover': {
                                                            background: '#D4AC0D90 !important',
                                                            border: '1px solid #D4AC0D !important',
                                                            color: '#FFFFFF !important'
                                                        }
                                                    }}
                                                >
                                                    Editar
                                                </Button>
                                            }
                                        />
                                    </ListItemButton>
                                )}
                            </ListItem>
                        </List>
                    )}
                </Grid2>
            </Grid2>
        </>
    );
};

export default ListCosecha;
