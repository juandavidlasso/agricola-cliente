import React, { useContext } from 'react';
import moment from 'moment';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { AplicacionPlaga } from '@interfaces/cultivos/plagas/aplicacion';
import { TablonState } from '@interfaces/cultivos/tablones';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { CultivosContext, DataType, DataTypeApplication } from 'src/context/cultivos/CultivosContext';

const getColumns = (
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setHeight: React.Dispatch<React.SetStateAction<number>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setFormType: React.Dispatch<React.SetStateAction<DataType>>,
    setDataType: React.Dispatch<React.SetStateAction<DataTypeApplication>>,
    setAplicacionPlagaEdit: React.Dispatch<React.SetStateAction<AplicacionPlaga | undefined>>
) => {
    const columns: GridColDef[] = [
        { field: 'edad', headerName: 'Edad Actual (meses)', flex: 1 },
        { field: 'producto', headerName: 'Producto', flex: 1 },
        { field: 'unidad', headerName: 'Unidad', flex: 1 },
        { field: 'cantidad', headerName: 'Cantidad', flex: 1 },
        { field: 'tiempo', headerName: 'Tiempo', flex: 1 },
        { field: 'valor', headerName: 'Cantidad Aplicar', flex: 1 },
        { field: 'fecha', headerName: 'Fecha', flex: 1 },
        {
            field: '',
            headerName: 'Acciones',
            flex: 1,
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
                            setAplicacionPlagaEdit(param.row);
                            setDataType('aplicacion');
                            setHeight(40);
                            setTitle('Eliminar aplicación plaga');
                            setFormType('delete');
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
                    <Button
                        onClick={() => {
                            setAplicacionPlagaEdit(param.row);
                            setDataType('aplicacion');
                            setHeight(55);
                            setTitle('Actualizar aplicación plaga');
                            setFormType('update');
                            setOpenModal(true);
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
    tablon: TablonState;
    listAplicacionesPlagas: TablonState['listAplicacionesPlagas'];
}

const ListAplicacionesPlagas: React.FC<Props> = ({ listAplicacionesPlagas, tablon }) => {
    const { corte } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const { setOpenModal, setHeight, setTitle, setFormType, setDataType, setAplicacionPlagaEdit } = useContext(CultivosContext);
    const now = moment().format('YYYY-MM-DD');
    const factual = moment(now);
    const finicio = moment(corte.fecha_inicio);
    const edadActual = factual.diff(finicio, 'months', true).toFixed(1);
    const rows =
        listAplicacionesPlagas?.length === 0
            ? []
            : listAplicacionesPlagas?.map((plaga) => ({
                  id_apla: plaga.id_apla,
                  edad: edadActual,
                  producto: plaga.tratamientoPlagaPadre.producto,
                  unidad: plaga.tratamientoPlagaPadre.unidad,
                  cantidad: plaga.tratamientoPlagaPadre.cantidad,
                  tiempo: plaga.tratamientoPlagaPadre.tiempo,
                  valor: (plaga.tratamientoPlagaPadre.cantidad * tablon.area).toFixed(2),
                  fecha: plaga.fecha,
                  corte_id: plaga.corte_id,
                  tablon_id: plaga.tablon_id,
                  trapl_id: plaga.trapl_id
              }));
    return (
        <div style={{ height: 'auto', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={getColumns(setOpenModal, setHeight, setTitle, setFormType, setDataType, setAplicacionPlagaEdit)}
                disableVirtualization
                disableColumnSelector
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                    }
                }}
                getRowId={(row: AplicacionPlaga) => row.id_apla}
                pageSizeOptions={[5, 10]}
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
        </div>
    );
};

export default ListAplicacionesPlagas;
