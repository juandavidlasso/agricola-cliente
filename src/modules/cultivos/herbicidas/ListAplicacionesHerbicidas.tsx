import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Collapse, Grid2, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowHeightParams } from '@mui/x-data-grid';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import { useQuery } from '@apollo/client';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useAppSelector from '@hooks/useAppSelector';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { IRootState } from '@interfaces/store';
import { OBTENER_APLICACIONES_HERBICIDAS_CORTE } from '@graphql/queries';
import { GetAplicacionesHerbicidasResponse } from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';
import { InformationContext } from 'src/context/cultivos/information/InformationContext';
import { TratamientoHerbicidas } from '@interfaces/cultivos/herbicidas/tratamientos';

const columns: GridColDef[] = [
    { field: 'producto', headerName: 'Producto', flex: 1 },
    { field: 'dosis', headerName: 'Dosis x Hta', flex: 1 },
    { field: 'presentacion', headerName: 'Presentación', flex: 1 },
    { field: 'valor', headerName: 'Valor x Hta', flex: 1 },
    { field: 'aplico', headerName: 'Aplicado por', flex: 1 },
    { field: 'nota', headerName: 'Nota', flex: 1 }
];

interface Props {}

const ListAplicacionesHerbicidas: React.FC<Props> = ({}) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, error, loading } = useQuery<GetAplicacionesHerbicidasResponse>(OBTENER_APLICACIONES_HERBICIDAS_CORTE, {
        variables: { corteId: id_corte }
    });
    const { setOpenModal, setDeleteData, setHeight, setTitle, setTotalItems, setFormType } = useContext(InformationContext);
    const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        if (data !== undefined && data?.obtenerAplicacionesHerbicidasCorte?.length !== 0) {
            setTotalItems(data!.obtenerAplicacionesHerbicidasCorte.map((aplicacion) => aplicacion.aphe_id));
        }

        return () => {
            setTotalItems([]);
        };
    }, [data]);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    const handleToggle = (id: number) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <Grid2 container>
            <Grid2 size={12}>
                {data?.obtenerAplicacionesHerbicidasCorte.length === 0 ? (
                    <Typography>No hay aplicaciones registradas</Typography>
                ) : null}
                <div style={{ height: 'auto', width: '100%' }}>
                    <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
                        {data !== undefined &&
                            data.obtenerAplicacionesHerbicidasCorte.length > 0 &&
                            data.obtenerAplicacionesHerbicidasCorte.map((aplicaciones) => (
                                <div key={aplicaciones.id_aplicaciones_herbicidas}>
                                    <ListItemButton
                                        onClick={() => handleToggle(aplicaciones.id_aplicaciones_herbicidas)}
                                        sx={{ border: '1px solid #000000', mb: 1, borderRadius: 2 }}
                                    >
                                        <ListItemIcon>
                                            <HikingOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                                    <Typography>
                                                        Fecha aplicación: {aplicaciones.aplicacionHerbicida.fecha} -{' '}
                                                        {aplicaciones.aplicacionHerbicida.tipo}
                                                    </Typography>
                                                    {rol === 1 && (
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setDeleteData(aplicaciones);
                                                                setHeight(40);
                                                                setTitle('Eliminar aplicación herbicida');
                                                                setFormType('herbicidas');
                                                                setOpenModal(true);
                                                            }}
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    )}
                                                </Box>
                                            }
                                        />
                                        {openStates[aplicaciones.id_aplicaciones_herbicidas] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse
                                        in={openStates[aplicaciones.id_aplicaciones_herbicidas]}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding>
                                            <DataGrid
                                                rows={
                                                    aplicaciones?.aplicacionHerbicida?.listTratamientoHerbicida?.length === 0
                                                        ? []
                                                        : aplicaciones?.aplicacionHerbicida?.listTratamientoHerbicida!
                                                }
                                                columns={columns}
                                                disableVirtualization
                                                getRowHeight={(params: GridRowHeightParams) => 'auto'}
                                                initialState={{
                                                    pagination: {
                                                        paginationModel: { page: 0, pageSize: 5 }
                                                    }
                                                }}
                                                getRowId={(row: TratamientoHerbicidas) => row.id_trahe}
                                                pageSizeOptions={[10, 20]}
                                                checkboxSelection={false}
                                                sx={{
                                                    '& .MuiDataGrid-row--borderBottom': {
                                                        background: '#154360 !important',
                                                        color: '#FFFFFF !important'
                                                    },
                                                    '& .MuiCheckbox-root': {
                                                        color: '#000000'
                                                    }
                                                }}
                                                disableRowSelectionOnClick
                                                localeText={{
                                                    MuiTablePagination: {
                                                        labelRowsPerPage: 'Filas por página'
                                                    }
                                                }}
                                            />
                                        </List>
                                    </Collapse>
                                </div>
                            ))}
                    </List>
                </div>
            </Grid2>
        </Grid2>
    );
};

export default ListAplicacionesHerbicidas;
