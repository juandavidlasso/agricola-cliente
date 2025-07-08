import { useContext, useEffect, useState } from 'react';
import {
    AplicacionesHerbicidas,
    GetAplicacionesHerbicidasResponse,
    GetRegistrarAplicacionesHerbicidas
} from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';
import { GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { TratamientoHerbicidas } from '@interfaces/cultivos/herbicidas/tratamientos';
import { ApolloError, useMutation } from '@apollo/client';
import { REGISTRAR_APLICACIONES_HERBICIDAS } from '@graphql/mutations';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { OBTENER_APLICACIONES_HERBICIDAS, OBTENER_APLICACIONES_HERBICIDAS_CORTE } from '@graphql/queries';

export const useHerbicidas = (data: GetAplicacionesHerbicidasResponse | undefined) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});
    const [totals, setTotals] = useState<{ [key: number]: number }>({});
    const [aplicacionHerbicidaEdit, setAplicacionHerbicidaEdit] = useState<AplicacionesHerbicidas>();
    const [tratamientoHerbicidaEdit, setTratamientoHerbicidaEdit] = useState<TratamientoHerbicidas>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [formType, setFormType] = useState<'create' | 'update' | 'delete'>('create');
    const [typeModal, setTypeModal] = useState<'aplicacion' | 'tratamiento'>('aplicacion');
    const [modalSuertes, setModalSuertes] = useState<boolean>(false);
    const [agregarAplicacionesHerbicidas] = useMutation<GetRegistrarAplicacionesHerbicidas>(REGISTRAR_APLICACIONES_HERBICIDAS);

    useEffect(() => {
        const trueKey = Object.keys(openStates).filter((key) => openStates[parseInt(key)] === true);
        if (trueKey.length !== 0) {
            for (let index = 0; index < trueKey.length; index++) {
                const tratamientos = data?.obtenerAplicacionesHerbicidasCorte.find(
                    (data) => data.id_aplicaciones_herbicidas === Number(trueKey[index])
                );
                const total =
                    tratamientos?.aplicacionHerbicida.listTratamientoHerbicida?.reduce((acc, cr) => acc + (cr?.valor ?? 0), 0) ??
                    0;
                setTotals((prevTotals) => ({
                    ...prevTotals,
                    [trueKey[index]]: total.toLocaleString()
                }));
            }
        }
    }, [openStates]);

    const handleToggle = (id: number) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const getColumns = () => {
        const columns: GridColDef[] = [
            { field: 'producto', headerName: 'Producto', flex: 0.1, headerAlign: 'center' },
            { field: 'dosis', headerName: 'Dosis x Hta', flex: 0.09, headerAlign: 'center', align: 'center' },
            { field: 'presentacion', headerName: 'Presentación', flex: 0.1, headerAlign: 'center', align: 'center' },
            { field: 'valor', headerName: 'Valor x Hta', flex: 0.09, headerAlign: 'center', align: 'center' },
            { field: 'aplico', headerName: 'Aplicado por', flex: 0.1, headerAlign: 'center', align: 'center' },
            { field: 'nota', headerName: 'Nota', flex: 0.42 },
            {
                field: '',
                headerName: 'Acciones',
                flex: 0.1,
                renderCell(params) {
                    return (
                        <Box className="flex flex-col gap-1">
                            <Button
                                className="!text-sm"
                                variant="outlined"
                                color="warning"
                                onClick={() => {
                                    setTypeModal('tratamiento');
                                    setFormType('update');
                                    setTratamientoHerbicidaEdit(params.row);
                                    setOpenModal(true);
                                }}
                            >
                                Editar
                            </Button>
                            <Button
                                className="!text-sm"
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    setTypeModal('tratamiento');
                                    setFormType('delete');
                                    setTratamientoHerbicidaEdit(params.row);
                                    setOpenModal(true);
                                }}
                            >
                                Eliminar
                            </Button>
                        </Box>
                    );
                }
            }
        ];
        return columns;
    };

    const handleSubmitAplicacionHerbicidas = async (corteId: number) => {
        try {
            const data = await agregarAplicacionesHerbicidas({
                variables: {
                    createAplicacionesHerbicidaInput: [
                        {
                            aphe_id: aplicacionHerbicidaEdit?.aphe_id,
                            corte_id: corteId
                        }
                    ]
                },
                refetchQueries: [
                    { query: OBTENER_APLICACIONES_HERBICIDAS },
                    { query: OBTENER_APLICACIONES_HERBICIDAS_CORTE, variables: { corteId } }
                ]
            });

            if (data.data?.agregarAplicacionesHerbicidas.length !== 0) {
                setMessageType('success');
                setInfoMessage(`La aplicación se registro exitosamente.`);
                setShowMessage(true);
            } else {
                setMessageType('error');
                setInfoMessage(`La aplicación ya esta aplicada en el corte seleccionado.`);
                setShowMessage(true);
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

    return {
        aplicacionHerbicidaEdit,
        openStates,
        totals,
        openModal,
        formType,
        typeModal,
        tratamientoHerbicidaEdit,
        modalSuertes,
        setAplicacionHerbicidaEdit,
        handleToggle,
        setOpenModal,
        setFormType,
        setTypeModal,
        getColumns,
        setModalSuertes,
        handleSubmitAplicacionHerbicidas
    };
};
