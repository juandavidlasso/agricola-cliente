import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
    Box,
    Button,
    Collapse,
    Grid2,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { OBTENER_APLICACIONES_HERBICIDAS } from '@graphql/queries';
import { GetAplicacionHerbicidaCorteResponse } from '@interfaces/cultivos/herbicidas/aplicacion';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { AplicacionesHerbicidas } from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';

interface Props {
    copyHerbicida: (id_aphe: number) => void;
    duplicateHerbicida: (aplicaciones: AplicacionesHerbicidas) => void;
    updateHerbicida: (aplicaciones: AplicacionesHerbicidas) => void;
    deleteHerbicida: (aplicaciones: AplicacionesHerbicidas) => void;
}

const ListHerbicidas: React.FC<Props> = ({ copyHerbicida, duplicateHerbicida, updateHerbicida, deleteHerbicida }) => {
    const { data, error, loading } = useQuery<GetAplicacionHerbicidaCorteResponse>(OBTENER_APLICACIONES_HERBICIDAS);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    const getTotalById = (id: number): string => {
        const item = data?.obtenerAplicacionesHerbicidas?.find((data) => data.id_aphe === id);

        const total = item?.listTratamientoHerbicida?.reduce((acc, curr) => acc + (curr?.valor ?? 0), 0) ?? 0;

        return total.toLocaleString();
    };

    return (
        <Grid2 container spacing={2}>
            {data?.obtenerAplicacionesHerbicidas?.length === 0 ? (
                <Typography>No hay herbicidas registradas</Typography>
            ) : (
                <div style={{ height: 'auto', width: '100%' }}>
                    <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
                        {data !== undefined &&
                            data?.obtenerAplicacionesHerbicidas?.length > 0 &&
                            data?.obtenerAplicacionesHerbicidas?.map((aplicaciones) => (
                                <div key={aplicaciones.id_aphe}>
                                    <ListItemButton
                                        onClick={() =>
                                            setOpenStates((prevState) => ({
                                                ...prevState,
                                                [aplicaciones.id_aphe]: !prevState[aplicaciones.id_aphe]
                                            }))
                                        }
                                        sx={{ border: '1px solid #000000', mb: 1, borderRadius: 2 }}
                                    >
                                        <ListItemIcon>
                                            <HikingOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                                    <Typography>
                                                        Fecha aplicación: {aplicaciones?.fecha} - {aplicaciones?.tipo}
                                                        <br />
                                                        Suertes: {aplicaciones?.suertes}
                                                    </Typography>
                                                    {rol === 1 && (
                                                        <>
                                                            <Button
                                                                className="!text-sm !normal-case"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    duplicateHerbicida({
                                                                        aphe_id: 0,
                                                                        corte_id: 0,
                                                                        id_aplicaciones_herbicidas: 0,
                                                                        aplicacionHerbicida: aplicaciones
                                                                    });
                                                                }}
                                                                variant="outlined"
                                                                color="success"
                                                            >
                                                                Duplicar
                                                            </Button>
                                                            <Button
                                                                className="!text-sm !normal-case"
                                                                variant="outlined"
                                                                color="warning"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    updateHerbicida({
                                                                        aphe_id: 0,
                                                                        corte_id: 0,
                                                                        id_aplicaciones_herbicidas: 0,
                                                                        aplicacionHerbicida: aplicaciones
                                                                    });
                                                                }}
                                                            >
                                                                Editar
                                                            </Button>
                                                            <Button
                                                                className="!text-sm !normal-case"
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    deleteHerbicida({
                                                                        aphe_id: 0,
                                                                        corte_id: 0,
                                                                        id_aplicaciones_herbicidas: 0,
                                                                        aplicacionHerbicida: aplicaciones
                                                                    });
                                                                }}
                                                            >
                                                                Eliminar
                                                            </Button>
                                                            <Button
                                                                className="!text-sm !normal-case"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    copyHerbicida(aplicaciones?.id_aphe);
                                                                }}
                                                                variant="outlined"
                                                                color="primary"
                                                            >
                                                                Aplicar en otra suerte
                                                            </Button>
                                                        </>
                                                    )}
                                                </Box>
                                            }
                                        />
                                        {openStates[aplicaciones.id_aphe] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={openStates[aplicaciones.id_aphe]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <TableContainer component={Paper} className="!min-w-full">
                                                <Table size="small" aria-label="a dense table">
                                                    <TableHead>
                                                        <TableRow className="bg-[#154360]">
                                                            <TableCell align="center" className="!text-white">
                                                                Producto
                                                            </TableCell>
                                                            <TableCell align="center" className="!text-white">
                                                                Dosis x Hta
                                                            </TableCell>
                                                            <TableCell align="center" className="!text-white">
                                                                Presentación
                                                            </TableCell>
                                                            <TableCell align="center" className="!text-white">
                                                                Valor x Hta
                                                            </TableCell>
                                                            <TableCell align="center" className="!text-white">
                                                                Aplicado por
                                                            </TableCell>
                                                            <TableCell align="center" className="!text-white">
                                                                Nota
                                                            </TableCell>
                                                            {/* {rol === 1 && (
                                                                <TableCell align="center" className="!text-white">
                                                                    Acciones
                                                                </TableCell>
                                                            )} */}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {aplicaciones?.listTratamientoHerbicida?.map((row) => (
                                                            <TableRow key={row.id_trahe}>
                                                                <TableCell align="center">{row.producto}</TableCell>
                                                                <TableCell align="center">{row.dosis}</TableCell>
                                                                <TableCell align="center">{row.presentacion}</TableCell>
                                                                <TableCell align="center">{row.valor}</TableCell>
                                                                <TableCell align="center">{row.aplico}</TableCell>
                                                                <TableCell align="center">{row.nota}</TableCell>
                                                                {/* <TableCell align="center">
                                                                    <Button
                                                                        className="!text-sm !normal-case !p-0 !rounded-md !mb-1"
                                                                        variant="outlined"
                                                                        color="warning"
                                                                        onClick={() => {
                                                                            updateHerbicida(aplicaciones);
                                                                        }}
                                                                    >
                                                                        Editar
                                                                    </Button>
                                                                    <Button
                                                                        className="!text-sm !normal-case !p-0 !rounded-md"
                                                                        variant="outlined"
                                                                        color="error"
                                                                        onClick={() => {
                                                                            deleteHerbicida(aplicaciones);
                                                                        }}
                                                                    >
                                                                        Eliminar
                                                                    </Button>
                                                                </TableCell> */}
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </List>
                                        <Typography className="!text-lg !font-bold !mt-2 !mb-2 !ml-2">
                                            {openStates[aplicaciones.id_aphe]
                                                ? `Valor total: ${getTotalById(aplicaciones.id_aphe)}`
                                                : ''}
                                        </Typography>
                                    </Collapse>
                                </div>
                            ))}
                    </List>
                </div>
            )}
        </Grid2>
    );
};

export default ListHerbicidas;
