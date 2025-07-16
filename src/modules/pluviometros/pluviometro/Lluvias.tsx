import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Grid2, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { GetLluviasResponse, Lluvia } from '@interfaces/lluvias';
import { FormTypePluviometro, PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { DataType } from 'src/context/cultivos/CultivosContext';
import { OBTENER_LLUVIAS } from '@graphql/queries';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';

const getColumns = (
    setType: React.Dispatch<React.SetStateAction<DataType>>,
    setLluviaEdit: React.Dispatch<React.SetStateAction<Lluvia | undefined>>,
    setFormType: React.Dispatch<React.SetStateAction<FormTypePluviometro>>
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
                            setType('delete');
                            setLluviaEdit(param.row);
                            setFormType('lluvia');
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
    const { setType, setFormType, setLluviaEdit } = useContext(PluviometroContext);
    const { data, error, loading } = useQuery<GetLluviasResponse>(OBTENER_LLUVIAS);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                {data?.obtenerLluvias.length === 0 ? (
                    <Typography>No hay lluvias registradas</Typography>
                ) : (
                    <DataGrid
                        rows={data?.obtenerLluvias}
                        columns={getColumns(setType, setLluviaEdit, setFormType)}
                        disableVirtualization
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 }
                            }
                        }}
                        getRowId={(row: Lluvia) => row.id_lluvia}
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
                )}
            </Grid2>
        </Grid2>
    );
};

export default Lluvias;
