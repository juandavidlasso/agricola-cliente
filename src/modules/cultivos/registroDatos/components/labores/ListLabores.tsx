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
import { Box, Button, Grid2 } from '@mui/material';
import { useQuery } from '@apollo/client';
import { OBTENER_LABORES } from '@graphql/queries';
import { GetLaboresResponse, Labores } from '@interfaces/cultivos/labores';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { InformationContext } from 'src/context/cultivos/information/InformationContext';
import { CultivosContext, DataType, DataTypeApplication, ModalDataType } from 'src/context/cultivos/CultivosContext';

const getColumns = (
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setFormType: React.Dispatch<React.SetStateAction<DataType>>,
    setEditLabor: React.Dispatch<React.SetStateAction<Labores | undefined>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setHeight: React.Dispatch<React.SetStateAction<number>>,
    setDuplicate: React.Dispatch<React.SetStateAction<boolean>>,
    setType: React.Dispatch<React.SetStateAction<ModalDataType>>,
    setDataType: React.Dispatch<React.SetStateAction<DataTypeApplication>>
) => {
    const columns: GridColDef[] = [
        { field: 'fecha', headerName: 'Fecha', flex: 0.1 },
        { field: 'actividad', headerName: 'Labor', flex: 0.1 },
        { field: 'equipo', headerName: 'Equipo', flex: 0.1 },
        { field: 'estado', headerName: 'Estado', flex: 0.08 },
        { field: 'pases', headerName: 'No. de Pases', flex: 0.1 },
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
                            setTitle('Eliminar labor');
                            setType('labores');
                            setDataType('');
                            setHeight(40);
                            setDuplicate(false);
                            setOpenModal(true);
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
                            setTitle('Actualizar labor');
                            setType('labores');
                            setDataType('');
                            setHeight(90);
                            setDuplicate(false);
                            setOpenModal(true);
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
                            setTitle('Duplicar labor');
                            setType('labores');
                            setDataType('');
                            setHeight(90);
                            setDuplicate(false);
                            setOpenModal(true);
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
    const {
        selectedLabores,
        setOpenModal,
        setFormType,
        setEditLabor,
        setSelectedLabores,
        setTitle,
        setHeight,
        setDuplicate,
        setType,
        setDataType
    } = useContext(CultivosContext);
    const { totalItems } = useContext(InformationContext);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <Grid2 container>
            {selectedLabores.length > 0 && (
                <Button
                    variant="contained"
                    onClick={() => {
                        setType('labores');
                        setTitle('Selecciona la suerte y el corte');
                        setHeight(80);
                        setDataType('suertes');
                        setDuplicate(false);
                        setOpenModal(true);
                    }}
                    className="!fixed !z-50"
                    sx={{
                        ml: 25
                    }}
                >
                    Aplicar {selectedLabores.length} labores
                </Button>
            )}
            <Button
                variant="contained"
                onClick={() => {
                    setFormType('create');
                    setHeight(90);
                    setTitle('Registrar labor');
                    setType('labores');
                    setEditLabor(undefined);
                    setDuplicate(false);
                    setOpenModal(true);
                }}
                className="!fixed !z-50"
            >
                Registrar labor
            </Button>
            <Grid2 size={12}>
                <div style={{ height: 'auto', width: '100%', marginTop: 60 }}>
                    <DataGrid
                        rows={data === undefined ? [] : data.obtenerLabores}
                        columns={getColumns(
                            setOpenModal,
                            setFormType,
                            setEditLabor,
                            setTitle,
                            setHeight,
                            setDuplicate,
                            setType,
                            setDataType
                        )}
                        onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => {
                            setSelectedLabores(rowSelectionModel as number[]);
                        }}
                        disableVirtualization
                        getRowHeight={(params: GridRowHeightParams) => 'auto'}
                        isRowSelectable={(params: GridRowParams<Labores>) => !totalItems.includes(params.row.id_labor)}
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
                                width: '95% !important',
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
