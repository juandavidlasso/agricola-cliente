import React, { useContext } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowHeightParams } from '@mui/x-data-grid';
import { Box, Button, Grid2 } from '@mui/material';
import { TratamientoFertilizante } from '@interfaces/cultivos/fertilizantes/tratamientos';
import { CultivosContext, DataType } from 'src/context/cultivos/CultivosContext';

const getColumns = (
    setOpenModalForms: React.Dispatch<React.SetStateAction<boolean>>,
    setFormType: React.Dispatch<React.SetStateAction<DataType>>,
    setTratamientoFertilizanteEdit: React.Dispatch<React.SetStateAction<TratamientoFertilizante | undefined>>,
    setDataType: React.Dispatch<React.SetStateAction<'' | 'aplicacion' | 'tratamiento'>>
) => {
    const columns: GridColDef[] = [
        { field: 'producto', headerName: 'Producto', flex: 0.12 },
        { field: 'dosis', headerName: 'Dosis x Hta', flex: 0.1 },
        { field: 'presentacion', headerName: 'Presentación', flex: 0.12 },
        { field: 'valor', headerName: 'Valor x Hta', flex: 0.11 },
        { field: 'aplico', headerName: 'Aplicado por', flex: 0.12 },
        { field: 'nota', headerName: 'Nota', flex: 0.33 },
        {
            field: '',
            headerName: 'Acciones',
            flex: 0.1,
            renderCell: (param: GridRenderCellParams) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Button
                        onClick={() => {
                            setTratamientoFertilizanteEdit(param.row);
                            setFormType('delete');
                            setDataType('tratamiento');
                            setOpenModalForms(true);
                        }}
                        variant="outlined"
                        color="error"
                        sx={{
                            fontSize: 8,
                            minWidth: 70,
                            maxWidth: 80,
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
                            setTratamientoFertilizanteEdit(restData);
                            setFormType('update');
                            setDataType('tratamiento');
                            setOpenModalForms(true);
                        }}
                        variant="outlined"
                        color="error"
                        sx={{
                            fontSize: 8,
                            minWidth: 70,
                            maxWidth: 80,
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
                </Box>
            )
        }
    ];
    return columns;
};

interface Props {
    listTratamientoFertilizante?: TratamientoFertilizante[];
}

const ListTratamientosFertilizantes: React.FC<Props> = ({ listTratamientoFertilizante }) => {
    const { setOpenModalForms, setFormType, setTratamientoFertilizanteEdit, setDataType } = useContext(CultivosContext);
    return (
        <Grid2 container>
            <Grid2 size={12}>
                <div style={{ height: 'auto', width: '100%' }}>
                    <DataGrid
                        rows={listTratamientoFertilizante}
                        columns={getColumns(setOpenModalForms, setFormType, setTratamientoFertilizanteEdit, setDataType)}
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
                            '& .MuiDataGrid-row': {
                                fontSize: '12px'
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

export default ListTratamientosFertilizantes;
