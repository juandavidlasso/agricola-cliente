import React, { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowClassNameParams } from '@mui/x-data-grid';
import { Lluvia } from '@interfaces/lluvias';
import { FormTypePluviometro, PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { DataType } from 'src/context/cultivos/CultivosContext';
import styles from './styles.module.css';
import { AplicacionLluvia } from '@interfaces/lluvias/aplicacion';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

const getColumns = (
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setFormType: React.Dispatch<React.SetStateAction<FormTypePluviometro>>,
    setHeight: React.Dispatch<React.SetStateAction<number>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setType: React.Dispatch<React.SetStateAction<DataType>>,
    setAplicacionLluviaEdit: React.Dispatch<React.SetStateAction<AplicacionLluvia | undefined>>,
    rol: number
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
                            setFormType('lluvia');
                            setType('delete');
                            setTitle('Eliminar lluvia');
                            setHeight(40);
                            setAplicacionLluviaEdit(param.row);
                            setOpenModal(true);
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
    if (rol !== 1) {
        columns.pop();
    }
    return columns;
};

interface Props {
    lluvias: AplicacionLluvia[] | undefined;
}

const ListLluvias: React.FC<Props> = ({ lluvias }) => {
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { setOpenModal, setFormType, setHeight, setTitle, setType, setAplicacionLluviaEdit } = useContext(PluviometroContext);
    const rows =
        lluvias?.length === 0
            ? []
            : lluvias?.map((lluvia) => ({
                  id_aplicacion_lluvia: lluvia.id_aplicacion_lluvia,
                  lluvia_id: lluvia.lluvia_id,
                  pluviometro_id: lluvia.pluviometro_id,
                  id_lluvia: lluvia.lluviaPadre!.id_lluvia,
                  fecha: lluvia.lluviaPadre!.fecha,
                  cantidad: lluvia.lluviaPadre!.cantidad
              }));
    return (
        <>
            {lluvias?.length === 0 ? (
                <Typography>No hay lluvias registradas</Typography>
            ) : (
                <DataGrid
                    getRowClassName={(params: GridRowClassNameParams<AplicacionLluvia>) => {
                        const row = params.row as unknown as Lluvia;
                        const numberMonth = Number(row.fecha.split('-')[1]);
                        const classColor = `bg_month_${numberMonth}`;
                        return styles[classColor];
                    }}
                    rows={rows}
                    columns={getColumns(setOpenModal, setFormType, setHeight, setTitle, setType, setAplicacionLluviaEdit, rol)}
                    disableVirtualization
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 }
                        }
                    }}
                    getRowId={(row: AplicacionLluvia) => row.id_aplicacion_lluvia}
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
        </>
    );
};

export default ListLluvias;
