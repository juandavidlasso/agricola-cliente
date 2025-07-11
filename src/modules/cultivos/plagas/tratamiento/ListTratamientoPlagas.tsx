import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Grid2, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { OBTENER_TRATAMIENTO_PLAGAS } from '@graphql/queries';
import { DataTypePlaga, GetTratamientoPlagasResponse, TratamientoPlaga } from '@interfaces/cultivos/plagas/tratamiento';

const getColumns = (
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setFormType: React.Dispatch<React.SetStateAction<DataTypePlaga>>,
    setTypeModal: React.Dispatch<React.SetStateAction<'aplicacion' | 'tratamiento'>>,
    setTratamientoPlagaEdit: React.Dispatch<React.SetStateAction<TratamientoPlaga | undefined>>
) => {
    const columns: GridColDef[] = [
        { field: 'producto', headerName: 'Producto', flex: 1 },
        { field: 'unidad', headerName: 'Unidad', flex: 1 },
        { field: 'cantidad', headerName: 'Cantidad', flex: 1 },
        { field: 'tiempo', headerName: 'Tiempo', flex: 1 },
        {
            field: '',
            headerName: 'Acciones',
            flex: 0,
            width: 250,
            renderCell: (param: GridRenderCellParams) => (
                <Box
                    sx={{
                        display: 'block',
                        textAlign: 'center',
                        height: '100%',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'center'
                    }}
                >
                    <Button
                        onClick={() => {
                            setFormType('update');
                            setTypeModal('tratamiento');
                            setTratamientoPlagaEdit(param.row);
                            setOpenModal(true);
                        }}
                        variant="outlined"
                        color="error"
                        sx={{
                            mr: 0.5,
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
                    <Button
                        onClick={() => {
                            setFormType('delete');
                            setTypeModal('tratamiento');
                            setTratamientoPlagaEdit(param.row);
                            setOpenModal(true);
                        }}
                        variant="outlined"
                        color="error"
                        sx={{
                            mr: 0.5,
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
                            setFormType('aplicar');
                            setOpenModal(true);
                        }}
                        variant="outlined"
                        color="info"
                        sx={{
                            fontSize: 8,
                            minWidth: 70,
                            maxWidth: 80,
                            border: '1px solid #0288d1 !important',
                            ':hover': {
                                background: '#0288d1 !important',
                                border: '1px solid #0288d1 !important',
                                color: '#FFFFFF !important'
                            }
                        }}
                    >
                        Aplicar
                    </Button>
                </Box>
            )
        }
    ];
    return columns;
};

interface Props {
    setFormType: React.Dispatch<React.SetStateAction<DataTypePlaga>>;
    setTypeModal: React.Dispatch<React.SetStateAction<'aplicacion' | 'tratamiento'>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setTratamientoPlagaEdit: React.Dispatch<React.SetStateAction<TratamientoPlaga | undefined>>;
}

const ListTratamientoPlagas: React.FC<Props> = ({ setFormType, setOpenModal, setTypeModal, setTratamientoPlagaEdit }) => {
    const { data, loading, error } = useQuery<GetTratamientoPlagasResponse>(OBTENER_TRATAMIENTO_PLAGAS);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <Grid2 container spacing={2}>
            {data?.obtenerTratamientoPlagas.length === 0 ? (
                <Typography>No hay productos registrados</Typography>
            ) : (
                <Grid2 size={12}>
                    <DataGrid
                        rows={data?.obtenerTratamientoPlagas}
                        columns={getColumns(setOpenModal, setFormType, setTypeModal, setTratamientoPlagaEdit)}
                        disableVirtualization
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 }
                            }
                        }}
                        getRowId={(row: TratamientoPlaga) => row.id_trapl}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection={false}
                        sx={{
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
                </Grid2>
            )}
        </Grid2>
    );
};

export default ListTratamientoPlagas;
