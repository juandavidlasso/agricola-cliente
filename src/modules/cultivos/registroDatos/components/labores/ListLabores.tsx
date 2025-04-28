import React, { useContext } from 'react';
import {
    DataGrid,
    GridCallbackDetails,
    GridColDef,
    GridRenderCellParams,
    GridRowHeightParams,
    GridRowParams,
    GridRowSelectionModel
} from '@mui/x-data-grid';
import { Box, Button, Grid2, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { OBTENER_LABORES } from '@graphql/queries';
import { AplicacionLabores, GetLaboresResponse, Labores } from '@interfaces/cultivos/labores';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { CultivosContext, DataType } from 'src/context/cultivos/CultivosContext';

const getColumns = (
    setOpenModalForms: React.Dispatch<React.SetStateAction<boolean>>,
    setFormType: React.Dispatch<React.SetStateAction<DataType>>,
    setEditLabor: React.Dispatch<React.SetStateAction<Labores | AplicacionLabores | undefined>>
) => {
    const columns: GridColDef[] = [
        { field: 'fecha', headerName: 'Fecha', flex: 0.1 },
        { field: 'suertes', headerName: 'Suertes', flex: 0.1 },
        { field: 'actividad', headerName: 'Labor', flex: 0.1 },
        { field: 'equipo', headerName: 'Equipo', flex: 0.1 },
        { field: 'estado', headerName: 'Estado', flex: 0.08 },
        { field: 'pases', headerName: 'No. Pases', flex: 0.1 },
        { field: 'aplico', headerName: 'Realizado Por', flex: 0.1 },
        { field: 'costo', headerName: 'Costo x Hta', flex: 0.1 },
        { field: 'nota', headerName: 'Nota', flex: 0.24 },
        {
            field: '',
            headerName: 'Acciones',
            flex: 0.08,
            renderCell: (param: GridRenderCellParams) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <Button
                        onClick={() => {
                            setEditLabor(param.row);
                            setFormType('delete');
                            setOpenModalForms(true);
                        }}
                        variant="outlined"
                        color="error"
                        sx={{
                            fontSize: 8,
                            minWidth: 60,
                            maxWidth: 70,
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
                            const { __typename, ...restData } = param.row;
                            setEditLabor(restData);
                            setFormType('update');
                            setOpenModalForms(true);
                        }}
                        variant="outlined"
                        color="error"
                        sx={{
                            fontSize: 8,
                            minWidth: 60,
                            maxWidth: 70,
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
                    <Button
                        onClick={() => {
                            const { __typename, ...restData } = param.row;
                            setEditLabor(restData);
                            setFormType('duplicar');
                            setOpenModalForms(true);
                        }}
                        variant="outlined"
                        color="primary"
                        sx={{
                            fontSize: 8,
                            minWidth: 60,
                            maxWidth: 70,
                            border: '1px solid #1f618d !important',
                            ':hover': {
                                background: '#1f618d !important',
                                border: '1px solid #1f618d !important',
                                color: '#FFFFFF !important'
                            }
                        }}
                    >
                        Duplicar
                    </Button>
                </Box>
            )
        }
    ];
    return columns;
};

interface Props {}

const ListLabores: React.FC<Props> = () => {
    const { data, error, loading } = useQuery<GetLaboresResponse>(OBTENER_LABORES);
    const { selectedLabores, setOpenModalForms, setFormType, setEditLabor, setSelectedLabores, setOpenModalSuertes } =
        useContext(CultivosContext);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <Grid2 container>
            <Grid2 size={12}>
                <Typography sx={{ fontWeight: 700 }}>
                    Si desea registrar la misma labor en otra suerte, selecione una o varias y click en el botón verde.
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>
                    Si desea registrar una labor en otra suerte pero necesita modificar algún dato, click en el botón duplicar.
                </Typography>
            </Grid2>
            {selectedLabores.length > 0 && (
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => setOpenModalSuertes(true)}
                    className="!fixed !z-50 !top-[10%]"
                    sx={{
                        ml: 22
                    }}
                >
                    Aplicar {selectedLabores.length} labores
                </Button>
            )}
            <Button
                variant="contained"
                size="small"
                onClick={() => {
                    setFormType('create');
                    setOpenModalForms(true);
                }}
                className="!fixed !z-50 !top-[10%]"
            >
                Registrar labor
            </Button>
            <Grid2 size={12}>
                <div style={{ height: 'auto', width: '100%', marginTop: 60 }}>
                    <DataGrid
                        rows={data === undefined ? [] : data.obtenerLabores}
                        columns={getColumns(setOpenModalForms, setFormType, setEditLabor)}
                        onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => {
                            setSelectedLabores(rowSelectionModel as number[]);
                        }}
                        disableVirtualization
                        getRowHeight={(params: GridRowHeightParams) => 'auto'}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 }
                            }
                        }}
                        getRowId={(row: Labores) => row.id_labor}
                        pageSizeOptions={[10, 20]}
                        checkboxSelection
                        sx={{
                            '&.MuiDataGrid-root': {
                                width: '97% !important',
                                margin: '0 auto'
                            },
                            '& .MuiDataGrid-row': {
                                fontSize: '10px'
                            },
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
                </div>
            </Grid2>
        </Grid2>
    );
};

export default ListLabores;
