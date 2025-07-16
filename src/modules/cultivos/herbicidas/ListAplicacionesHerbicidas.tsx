import React from 'react';
import { Box, Button, Collapse, Grid2, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { DataGrid, GridRowHeightParams } from '@mui/x-data-grid';
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
import { TratamientoHerbicidas } from '@interfaces/cultivos/herbicidas/tratamientos';
import { useHerbicidas } from './hooks/useHerbicidas';
import PopoverHerbicida from './PopoverHerbicida';
import DialogModal from '@components/Dialog';
import ListSuertes from '../registroDatos/suertes/ListSuertes';
import ListHerbicidas from './ListHerbicidas';

interface Props {}

const ListAplicacionesHerbicidas: React.FC<Props> = ({}) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, error, loading } = useQuery<GetAplicacionesHerbicidasResponse>(OBTENER_APLICACIONES_HERBICIDAS_CORTE, {
        variables: { corteId: id_corte }
    });
    const {
        openHerbicidas,
        openStates,
        aplicacionHerbicidaEdit,
        openModal,
        formType,
        typeModal,
        tratamientoHerbicidaEdit,
        modalSuertes,
        setIdHerbicida,
        setTypeModal,
        setFormType,
        setOpenModal,
        setAplicacionHerbicidaEdit,
        setOpenStates,
        getColumns,
        setModalSuertes,
        handleSubmitAplicacionHerbicidas,
        setOpenHerbicidas,
        getTotalById
    } = useHerbicidas(data, rol);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {openModal && (
                <PopoverHerbicida
                    formType={formType}
                    typeModal={typeModal}
                    aplicacionHerbicidaEdit={aplicacionHerbicidaEdit!}
                    tratamientoHerbicida={tratamientoHerbicidaEdit!}
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
                    title="Selecciona la suerte y el corte"
                    height={90}
                    id="modal-suertes"
                    width="80%"
                >
                    <ListSuertes handleSubmit={(corteId: number) => handleSubmitAplicacionHerbicidas(corteId)} />
                </DialogModal>
            )}
            {openHerbicidas && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => setOpenHerbicidas(false)}
                    title="Listado de herbicidas"
                    height={90}
                    id="modal-herbicidas"
                    width="95%"
                >
                    <ListHerbicidas setIdHerbicida={setIdHerbicida} setModalSuertes={setModalSuertes} />
                </DialogModal>
            )}
            <Grid2 container>
                {rol === 1 && (
                    <Grid2 size={12}>
                        <Button
                            variant="contained"
                            className="!normal-case !mr-2"
                            size="small"
                            onClick={() => {
                                setTypeModal('aplicacion');
                                setFormType('create');
                                setOpenModal(true);
                            }}
                        >
                            Registrar aplicación herbicida
                        </Button>
                        <Button variant="contained" className="!normal-case" size="small" onClick={() => setOpenHerbicidas(true)}>
                            Ver todos los herbicidas
                        </Button>
                    </Grid2>
                )}
                <Grid2 size={12}>
                    {data?.obtenerAplicacionesHerbicidasCorte?.length === 0 ? (
                        <Typography>No hay aplicaciones registradas</Typography>
                    ) : (
                        <div style={{ height: 'auto', width: '100%' }}>
                            <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
                                {data !== undefined &&
                                    data?.obtenerAplicacionesHerbicidasCorte?.length > 0 &&
                                    data?.obtenerAplicacionesHerbicidasCorte?.map((aplicaciones) => (
                                        <div key={aplicaciones.id_aplicaciones_herbicidas}>
                                            <ListItemButton
                                                onClick={() =>
                                                    setOpenStates((prevState) => ({
                                                        ...prevState,
                                                        [aplicaciones.id_aplicaciones_herbicidas]:
                                                            !prevState[aplicaciones.id_aplicaciones_herbicidas]
                                                    }))
                                                }
                                                sx={{ border: '1px solid #000000', mb: 1, borderRadius: 2 }}
                                            >
                                                <ListItemIcon>
                                                    <HikingOutlinedIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Box
                                                            display={'flex'}
                                                            alignItems={'center'}
                                                            justifyContent={'space-between'}
                                                        >
                                                            <Typography>
                                                                Fecha aplicación: {aplicaciones?.aplicacionHerbicida?.fecha} -{' '}
                                                                {aplicaciones?.aplicacionHerbicida?.tipo}
                                                                <br />
                                                                Suertes: {aplicaciones?.suertes}
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
                                                                            setIdHerbicida(
                                                                                aplicaciones?.aplicacionHerbicida?.id_aphe
                                                                            );
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
                                                                            setAplicacionHerbicidaEdit(aplicaciones);
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
                                                                            setAplicacionHerbicidaEdit(aplicaciones);
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
                                                                            setAplicacionHerbicidaEdit(aplicaciones);
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
                                                {openStates[aplicaciones.id_aplicaciones_herbicidas] ? (
                                                    <ExpandLess />
                                                ) : (
                                                    <ExpandMore />
                                                )}
                                            </ListItemButton>
                                            <Collapse
                                                in={openStates[aplicaciones.id_aplicaciones_herbicidas]}
                                                timeout="auto"
                                                unmountOnExit
                                            >
                                                <List component="div" disablePadding>
                                                    <DataGrid
                                                        rows={
                                                            aplicaciones?.aplicacionHerbicida?.listTratamientoHerbicida
                                                                ?.length === 0
                                                                ? []
                                                                : aplicaciones?.aplicacionHerbicida?.listTratamientoHerbicida!
                                                        }
                                                        columns={getColumns()}
                                                        disableVirtualization
                                                        getRowHeight={(params: GridRowHeightParams) => 'auto'}
                                                        initialState={{
                                                            pagination: {
                                                                paginationModel: { page: 0, pageSize: 10 }
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
                                                <Typography className="!text-lg !font-bold !mt-2 !mb-2 !ml-2">
                                                    {openStates[aplicaciones.id_aplicaciones_herbicidas]
                                                        ? `Valor total: ${getTotalById(aplicaciones.id_aplicaciones_herbicidas)}`
                                                        : ''}
                                                </Typography>
                                            </Collapse>
                                        </div>
                                    ))}
                            </List>
                        </div>
                    )}
                </Grid2>
            </Grid2>
        </>
    );
};

export default ListAplicacionesHerbicidas;
