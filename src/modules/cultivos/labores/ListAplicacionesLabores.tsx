import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Grid2, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowHeightParams } from '@mui/x-data-grid';
import { AplicacionLabores, GetAplicacionLaboresResponse, Labores } from '@interfaces/cultivos/labores';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { OBTENER_APLICACIONES_LABORES } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { CultivosContext, DataType } from 'src/context/cultivos/CultivosContext';

const getColumns = (
    setOpenModalForms: React.Dispatch<React.SetStateAction<boolean>>,
    setFormType: React.Dispatch<React.SetStateAction<DataType>>,
    setEditLabor: React.Dispatch<React.SetStateAction<Labores | AplicacionLabores | undefined>>,
    rol: number
) => {
    const columns: GridColDef[] = [
        { field: 'fecha', headerName: 'Fecha', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'actividad', headerName: 'Labor', flex: 1, headerAlign: 'center' },
        { field: 'equipo', headerName: 'Equipo', flex: 1, headerAlign: 'center' },
        { field: 'estado', headerName: 'Estado', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'pases', headerName: 'No. de Pases', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'aplico', headerName: 'Realizado Por', flex: 1, headerAlign: 'center' },
        { field: 'costo', headerName: 'Costo x Hta', flex: 1, headerAlign: 'center' },
        { field: 'nota', headerName: 'Nota', flex: 1, headerAlign: 'center' },
        {
            field: '',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (param: GridRenderCellParams) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'center'
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
                </Box>
            )
        }
    ];
    if (rol === 2) {
        columns.pop();
    }
    return columns;
};

interface Props {}

const ListAplicacionesLabores: React.FC<Props> = ({}) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, error, loading } = useQuery<GetAplicacionLaboresResponse>(OBTENER_APLICACIONES_LABORES, {
        variables: { corteId: id_corte }
    });
    const { setOpenModalForms, setFormType, setEditLabor, setTotalItems } = useContext(CultivosContext);
    useEffect(() => {
        if (data !== undefined && data?.obtenerAplicacionesLabores?.length !== 0) {
            setTotalItems(data!.obtenerAplicacionesLabores.map((aplicacion) => aplicacion.labor!.id_labor));
        }

        return () => {
            setTotalItems([]);
        };
    }, [data]);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    const rows =
        data !== undefined && data?.obtenerAplicacionesLabores.length === 0
            ? []
            : data?.obtenerAplicacionesLabores.map((item) => ({
                  id_aplicacion_labores: item.id_aplicacion_labores,
                  corte_id: item.corte_id,
                  labor_id: item.labor_id,
                  fecha: item.labor?.fecha,
                  actividad: item.labor?.actividad,
                  equipo: item.labor?.equipo,
                  pases: item.labor?.pases,
                  aplico: item.labor?.aplico,
                  costo: item.labor?.costo,
                  nota: item.labor?.nota
              }));

    return (
        <Grid2 container>
            <Grid2 size={12}>
                <div style={{ height: 'auto', width: '98%' }}>
                    {rows?.length === 0 ? (
                        <Typography>No hay labores registradas</Typography>
                    ) : (
                        <DataGrid
                            rows={rows}
                            columns={getColumns(setOpenModalForms, setFormType, setEditLabor, rol)}
                            disableVirtualization
                            getRowHeight={(params: GridRowHeightParams) => 'auto'}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 }
                                }
                            }}
                            getRowId={(row: AplicacionLabores) => row.id_aplicacion_labores}
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
                    )}
                </div>
            </Grid2>
        </Grid2>
    );
};

export default ListAplicacionesLabores;
