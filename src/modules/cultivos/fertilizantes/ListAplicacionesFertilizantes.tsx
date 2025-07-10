import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Collapse, Grid2, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { DataGrid, GridRowHeightParams } from '@mui/x-data-grid';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { OBTENER_APLICACIONES_FERTILIZANTES_CORTE } from '@graphql/queries';
import { GetAplicacionesFertilizantesCorteResponse } from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';
import { TratamientoFertilizante } from '@interfaces/cultivos/fertilizantes/tratamientos';
import { useFertilizantes } from './hooks/useFertilizantes';
import PopoverFertilizante from './PopoverFertilizante';
import DialogModal from '@components/Dialog';
import ListSuertes from '../registroDatos/suertes/ListSuertes';

interface Props {}

const ListAplicacionesFertilizantes: React.FC<Props> = ({}) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, error, loading } = useQuery<GetAplicacionesFertilizantesCorteResponse>(
        OBTENER_APLICACIONES_FERTILIZANTES_CORTE,
        {
            variables: { corteId: id_corte }
        }
    );
    const {
        openStates,
        totals,
        openModal,
        typeModal,
        formType,
        aplicacionFertilizanteEdit,
        tratamientoFertilizanteEdit,
        modalSuertes,
        handleToggle,
        setAplicacionFertilizanteEdit,
        setOpenModal,
        setFormType,
        setTypeModal,
        setModalSuertes,
        getColumns,
        handleSubmitAplicacionesFertilizantes
    } = useFertilizantes(data, rol);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {openModal && (
                <PopoverFertilizante
                    formType={formType}
                    typeModal={typeModal}
                    aplicacionFertilizanteEdit={aplicacionFertilizanteEdit!}
                    tratamientoFertilizante={tratamientoFertilizanteEdit!}
                    handleClose={() => {
                        setTypeModal('aplicacion');
                        setFormType('create');
                        setOpenModal(false);
                    }}
                />
            )}
            {modalSuertes && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => setModalSuertes(false)}
                    title={'Selecciona la suerte y el corte'}
                    height={90}
                    id="modal-suertes"
                    width="80%"
                >
                    <ListSuertes handleSubmit={(corteId: number) => handleSubmitAplicacionesFertilizantes(corteId)} />
                </DialogModal>
            )}
            <Grid2 container>
                {rol === 1 && (
                    <Grid2 size={12}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                                setTypeModal('aplicacion');
                                setFormType('create');
                                setOpenModal(true);
                            }}
                        >
                            Registrar aplicación fertilizante
                        </Button>
                    </Grid2>
                )}
                <Grid2 size={12}>
                    {data?.obtenerAplicacionesFertilizantesCorte.length === 0 ? (
                        <Typography>No hay aplicaciones registradas</Typography>
                    ) : null}
                    <div style={{ height: 'auto', width: '100%' }}>
                        <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
                            {data !== undefined &&
                                data.obtenerAplicacionesFertilizantesCorte.length > 0 &&
                                data.obtenerAplicacionesFertilizantesCorte.map((aplicaciones) => (
                                    <div key={aplicaciones.id_aplicaciones_fertilizantes}>
                                        <ListItemButton
                                            onClick={() => handleToggle(aplicaciones.id_aplicaciones_fertilizantes)}
                                            sx={{ border: '1px solid #000000', mb: 1, borderRadius: 2 }}
                                        >
                                            <ListItemIcon>
                                                <HikingOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                                        <Typography>
                                                            Fecha aplicación: {aplicaciones.aplicacionFertilizante.fecha} -{' '}
                                                            {aplicaciones.aplicacionFertilizante.tipo}
                                                        </Typography>
                                                        {rol === 1 && (
                                                            <Box className="flex gap-2">
                                                                {/* <Button
                                                                    className="!text-sm !normal-case"
                                                                    onClick={() => {}}
                                                                    variant="outlined"
                                                                    color="success"
                                                                >
                                                                    Duplicar
                                                                </Button> */}
                                                                <Button
                                                                    className="!text-sm !normal-case"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setAplicacionFertilizanteEdit(aplicaciones);
                                                                        setModalSuertes(true);
                                                                    }}
                                                                    variant="outlined"
                                                                    color="primary"
                                                                >
                                                                    Aplicar en otra suerte
                                                                </Button>
                                                                <Button
                                                                    className="!text-sm !normal-case"
                                                                    variant="outlined"
                                                                    color="warning"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setTypeModal('aplicacion');
                                                                        setFormType('update');
                                                                        setAplicacionFertilizanteEdit(aplicaciones);
                                                                        setOpenModal(true);
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
                                                                        setTypeModal('aplicacion');
                                                                        setFormType('delete');
                                                                        setAplicacionFertilizanteEdit(aplicaciones);
                                                                        setOpenModal(true);
                                                                    }}
                                                                >
                                                                    Eliminar
                                                                </Button>
                                                                <Button
                                                                    className="!text-sm !normal-case"
                                                                    variant="outlined"
                                                                    color="info"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setTypeModal('tratamiento');
                                                                        setFormType('create');
                                                                        setAplicacionFertilizanteEdit(aplicaciones);
                                                                        setOpenModal(true);
                                                                    }}
                                                                >
                                                                    Agregar tratamiento
                                                                </Button>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                }
                                            />
                                            {openStates[aplicaciones.id_aplicaciones_fertilizantes] ? (
                                                <ExpandLess />
                                            ) : (
                                                <ExpandMore />
                                            )}
                                        </ListItemButton>
                                        <Collapse
                                            in={openStates[aplicaciones.id_aplicaciones_fertilizantes]}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List component="div" disablePadding>
                                                <DataGrid
                                                    rows={
                                                        aplicaciones?.aplicacionFertilizante?.listTratamientoFertilizante
                                                            ?.length === 0
                                                            ? []
                                                            : aplicaciones?.aplicacionFertilizante?.listTratamientoFertilizante!
                                                    }
                                                    columns={getColumns()}
                                                    disableVirtualization
                                                    getRowHeight={(params: GridRowHeightParams) => 'auto'}
                                                    initialState={{
                                                        pagination: {
                                                            paginationModel: { page: 0, pageSize: 10 }
                                                        }
                                                    }}
                                                    getRowId={(row: TratamientoFertilizante) => row.id_trafe}
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
                                            <Typography className="!text-lg !font-bold !mt-2 !mb-2 !ml-2">
                                                {openStates[aplicaciones.id_aplicaciones_fertilizantes]
                                                    ? `Valor total: ${totals[aplicaciones.id_aplicaciones_fertilizantes]}`
                                                    : ''}
                                            </Typography>
                                        </Collapse>
                                    </div>
                                ))}
                        </List>
                    </div>
                </Grid2>
            </Grid2>
        </>
    );
};

export default ListAplicacionesFertilizantes;
