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
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { OBTENER_APLICACIONES_LABORES, OBTENER_LABORES } from '@graphql/queries';
import { GetLaboresResponse, GetRegisterAplicacionLabor, Labores } from '@interfaces/cultivos/labores';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { REGISTRAR_LABORES_CORTES } from '@graphql/mutations';
import { InformationContext } from 'src/context/cultivos/information/InformationContext';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { CultivosContext, DataType } from 'src/context/cultivos/CultivosContext';

const getColumns = (
    showButton: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setFormType: React.Dispatch<React.SetStateAction<DataType>>,
    setEditLabor: React.Dispatch<React.SetStateAction<Labores | undefined>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setHeight: React.Dispatch<React.SetStateAction<number>>
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
                            setHeight(40);
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
                            const { __typename, ...restData } = param.row;
                            setEditLabor(restData);
                            setFormType('update');
                            setTitle('Actualizar labor');
                            setHeight(90);
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
    if (showButton) {
        columns.pop();
    }
    return columns;
};

interface Props {
    showButton?: boolean;
}

const ListLabores: React.FC<Props> = ({ showButton = false }) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { data, error, loading } = useQuery<GetLaboresResponse>(OBTENER_LABORES);
    const { selectedLabores, setOpenModal, setFormType, setEditLabor, setSelectedLabores, setTitle, setHeight } =
        useContext(CultivosContext);
    const { setMessageType, setInfoMessage, setShowMessage, totalItems } = useContext(InformationContext);
    const [agregarAplicacionLabores] = useMutation<GetRegisterAplicacionLabor>(REGISTRAR_LABORES_CORTES);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    const handleSubmitLabor = async () => {
        let aplicacionesLabores = [];

        for (let index = 0; index < selectedLabores.length; index++) {
            const obj = {
                corte_id: id_corte,
                labor_id: selectedLabores[index]
            };
            aplicacionesLabores.push(obj);
        }

        try {
            const data = await agregarAplicacionLabores({
                variables: {
                    createAplicacionLaboresInput: aplicacionesLabores
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_LABORES, variables: { corteId: id_corte } }]
            });
            for (let index = 0; index < selectedLabores.length; index++) {
                if (data.data?.agregarAplicacionLabores.includes(selectedLabores[index])) {
                    setMessageType('success');
                    setInfoMessage(`La labor se aplico exitosamente.`);
                    setShowMessage(true);
                }
            }
        } catch (error) {
            if (error instanceof ApolloError) {
                setMessageType('error');
                setInfoMessage(error.message.replace('Error:', ''));
                setShowMessage(true);
                return;
            }
            setMessageType('error');
            setInfoMessage(error as string);
            setShowMessage(true);
            return;
        }
    };

    return (
        <Grid2 container>
            <Grid2 size={12}>
                <div style={{ height: 'auto', width: '100%' }}>
                    <DataGrid
                        rows={data === undefined ? [] : data.obtenerLabores}
                        columns={getColumns(showButton, setOpenModal, setFormType, setEditLabor, setTitle, setHeight)}
                        onRowSelectionModelChange={(rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => {
                            setSelectedLabores(rowSelectionModel as number[]);
                        }}
                        disableVirtualization
                        getRowHeight={(params: GridRowHeightParams) => 'auto'}
                        isRowSelectable={(params: GridRowParams<Labores>) => !totalItems.includes(params.row.id_labor)}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 }
                            }
                        }}
                        getRowId={(row: Labores) => row.id_labor}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
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
            </Grid2>
            {showButton && selectedLabores.length > 0 && (
                <Grid2 size={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Button variant="contained" sx={{ mt: 5 }} onClick={handleSubmitLabor}>
                        Aplicar {selectedLabores.length} labores
                    </Button>
                </Grid2>
            )}
        </Grid2>
    );
};

export default ListLabores;
