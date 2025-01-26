import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Grid2, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowHeightParams } from '@mui/x-data-grid';
import { AplicacionLabores, GetAplicacionLaboresResponse } from '@interfaces/cultivos/labores';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { OBTENER_APLICACIONES_LABORES } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { InformationContext, TypeData } from 'src/context/cultivos/information/InformationContext';

const getColumns = (
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setDeleteData: React.Dispatch<React.SetStateAction<TypeData<AplicacionLabores>>>,
    setHeight: React.Dispatch<React.SetStateAction<number>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setFormType: React.Dispatch<React.SetStateAction<'' | 'labores' | 'herbicidas' | 'fertilizantes'>>
) => {
    const columns: GridColDef[] = [
        { field: 'fecha', headerName: 'Fecha', flex: 1 },
        { field: 'actividad', headerName: 'Labor', flex: 1 },
        { field: 'equipo', headerName: 'Equipo', flex: 1 },
        { field: 'estado', headerName: 'Estado', flex: 1 },
        { field: 'pases', headerName: 'No. de Pases', flex: 1 },
        { field: 'aplico', headerName: 'Realizado Por', flex: 1 },
        { field: 'costo', headerName: 'Costo x Hta', flex: 1 },
        { field: 'nota', headerName: 'Nota', flex: 1 },
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
                            setDeleteData(param.row);
                            setHeight(40);
                            setTitle('Eliminar labor');
                            setFormType('labores');
                            setOpenModal(true);
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
    return columns;
};

interface Props {}

const ListAplicacionesLabores: React.FC<Props> = ({}) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { data, error, loading } = useQuery<GetAplicacionLaboresResponse>(OBTENER_APLICACIONES_LABORES, {
        variables: { corteId: id_corte }
    });
    const { setOpenModal, setDeleteData, setHeight, setTitle, setTotalItems, setFormType } = useContext(InformationContext);

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
                <div style={{ height: 'auto', width: '100%' }}>
                    {rows?.length === 0 ? (
                        <Typography>No hay labores registradas</Typography>
                    ) : (
                        <DataGrid
                            rows={rows}
                            columns={getColumns(setOpenModal, setDeleteData, setHeight, setTitle, setFormType)}
                            disableVirtualization
                            getRowHeight={(params: GridRowHeightParams) => 'auto'}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 }
                                }
                            }}
                            getRowId={(row: AplicacionLabores) => row.id_aplicacion_labores}
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
                    )}
                </div>
            </Grid2>
        </Grid2>
    );
};

export default ListAplicacionesLabores;
