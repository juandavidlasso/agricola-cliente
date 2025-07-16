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
import { OBTENER_APLICACIONES_FERTILIZANTES } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { GetAplicacionFertilizanteResponse } from '@interfaces/cultivos/fertilizantes/aplicacion';
import Alert from '@components/Alert';
import { IRootState } from '@interfaces/store';
import ModalLoading from '@components/Modal';

interface Props {
    setIdFertilizante: React.Dispatch<React.SetStateAction<number | undefined>>;
    setModalSuertes: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListFertilizantes: React.FC<Props> = ({ setIdFertilizante, setModalSuertes }) => {
    const { data, error, loading } = useQuery<GetAplicacionFertilizanteResponse>(OBTENER_APLICACIONES_FERTILIZANTES);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    const getTotalById = (id: number): string => {
        const item = data?.obtenerAplicacionesFertilizantes?.find((data) => data.id_apfe === id);

        const total = item?.listTratamientoFertilizante?.reduce((acc, curr) => acc + (curr?.valor ?? 0), 0) ?? 0;

        return total.toLocaleString();
    };
    return (
        <Grid2 container spacing={2}>
            {data?.obtenerAplicacionesFertilizantes?.length === 0 ? (
                <Typography>No hay herbicidas registradas</Typography>
            ) : (
                <div style={{ height: 'auto', width: '100%' }}>
                    <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
                        {data !== undefined &&
                            data?.obtenerAplicacionesFertilizantes?.length > 0 &&
                            data?.obtenerAplicacionesFertilizantes?.map((aplicaciones) => (
                                <div key={aplicaciones.id_apfe}>
                                    <ListItemButton
                                        onClick={() =>
                                            setOpenStates((prevState) => ({
                                                ...prevState,
                                                [aplicaciones.id_apfe]: !prevState[aplicaciones.id_apfe]
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
                                                        <Button
                                                            className="!text-sm !normal-case"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setIdFertilizante(aplicaciones?.id_apfe);
                                                                setModalSuertes(true);
                                                            }}
                                                            variant="outlined"
                                                            color="primary"
                                                        >
                                                            Aplicar en otra suerte
                                                        </Button>
                                                    )}
                                                </Box>
                                            }
                                        />
                                        {openStates[aplicaciones.id_apfe] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={openStates[aplicaciones.id_apfe]} timeout="auto" unmountOnExit>
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
                                                            <TableCell align="center" className="!text-white">
                                                                Acciones
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {aplicaciones?.listTratamientoFertilizante?.map((row) => (
                                                            <TableRow key={row.id_trafe}>
                                                                <TableCell align="center">{row.producto}</TableCell>
                                                                <TableCell align="center">{row.dosis}</TableCell>
                                                                <TableCell align="center">{row.presentacion}</TableCell>
                                                                <TableCell align="center">{row.valor}</TableCell>
                                                                <TableCell align="center">{row.aplico}</TableCell>
                                                                <TableCell align="center">{row.nota}</TableCell>
                                                                <TableCell align="center"></TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </List>
                                        <Typography className="!text-lg !font-bold !mt-2 !mb-2 !ml-2">
                                            {openStates[aplicaciones.id_apfe]
                                                ? `Valor total: ${getTotalById(aplicaciones.id_apfe)}`
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

export default ListFertilizantes;
