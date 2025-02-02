import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Grid2, Typography } from '@mui/material';
import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridRowSelectionModel } from '@mui/x-data-grid';
import { GetLluviasResponse, Lluvia } from '@interfaces/lluvias';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { DataType } from 'src/context/cultivos/CultivosContext';
import { OBTENER_LLUVIAS } from '@graphql/queries';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';

const getColumns = (
    setOpenModalLluvia: React.Dispatch<React.SetStateAction<boolean>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setType: React.Dispatch<React.SetStateAction<DataType>>,
    setLluviaEdit: React.Dispatch<React.SetStateAction<Lluvia | undefined>>
) => {
    const columns: GridColDef[] = [
        { field: 'fecha', headerName: 'Fecha', flex: 1 },
        { field: 'cantidad', headerName: 'Cantidad', flex: 1 },
        {
            field: '',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (param: GridRenderCellParams) => (
                <Box
                    sx={{
                        textAlign: 'center',
                        display: 'block',
                        flexDirection: 'column',
                        height: '100%',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'center'
                    }}
                >
                    <Button
                        onClick={() => {
                            setType('update');
                            setTitle('Actualizar lluvia');
                            setLluviaEdit(param.row);
                            setOpenModalLluvia(true);
                        }}
                        variant="contained"
                        sx={{
                            mr: 1,
                            fontSize: 8,
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
                    <Button
                        onClick={() => {
                            setType('delete');
                            setTitle('Eliminar lluvia');
                            setLluviaEdit(param.row);
                            setOpenModalLluvia(true);
                        }}
                        variant="contained"
                        sx={{
                            ml: 1,
                            fontSize: 8,
                            minWidth: 70,
                            maxWidth: 80,
                            border: '1px solid #922B21 !important',
                            background: '#922B21 !important',
                            ':hover': {
                                background: '#922B2190 !important',
                                border: '1px solid #922B21 !important',
                                color: '#FFFFFF !important'
                            }
                        }}
                    >
                        Eliminar
                    </Button>
                </Box>
            )
        }
    ];
    return columns;
};

interface Props {}

const Lluvias: React.FC<Props> = ({}) => {
    const { selectedLluvias, setSelectedLluvias, setOpenModalLluvia, setTitle, setType, setLluviaEdit } =
        useContext(PluviometroContext);
    const { data, error, loading } = useQuery<GetLluviasResponse>(OBTENER_LLUVIAS);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTitle('Registrar lluvia');
                        setType('create');
                        setOpenModalLluvia(true);
                    }}
                    sx={{ width: { xs: '100%' } }}
                >
                    Registrar lluvia
                </Button>
            </Grid2>
            {selectedLluvias.length > 0 && (
                <Grid2 size={{ xs: 12, sm: 3 }}>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={() => {
                            setTitle('Registrar lluvia');
                            setType('aplicar');
                            setOpenModalLluvia(true);
                        }}
                        sx={{ width: { xs: '100%' } }}
                    >
                        Aplicar lluvias
                    </Button>
                </Grid2>
            )}
            <Grid2 size={12}>
                {data?.obtenerLluvias.length === 0 ? (
                    <Typography>No hay lluvias registradas</Typography>
                ) : (
                    <DataGrid
                        rows={data?.obtenerLluvias}
                        columns={getColumns(setOpenModalLluvia, setTitle, setType, setLluviaEdit)}
                        onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => {
                            const selectedRows = rowSelectionModel.map((id) => {
                                return data?.obtenerLluvias.find((row) => row.id_lluvia === id);
                            });
                            setSelectedLluvias(selectedRows as Lluvia[]);
                        }}
                        disableVirtualization
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 }
                            }
                        }}
                        getRowId={(row: Lluvia) => row.id_lluvia}
                        pageSizeOptions={[10, 20]}
                        checkboxSelection
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
                )}
            </Grid2>
        </Grid2>
    );
};

export default Lluvias;
