import { useContext, useEffect, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { REGISTRAR_APLICACIONES_FERTILIZANTES } from '@graphql/mutations';
import { OBTENER_APLICACIONES_FERTILIZANTES, OBTENER_APLICACIONES_FERTILIZANTES_CORTE } from '@graphql/queries';
import {
    AplicacionesFertilizantes,
    GetAplicacionesFertilizantesCorteResponse,
    GetAplicacionesFertilizantesRegister
} from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';
import { TratamientoFertilizante } from '@interfaces/cultivos/fertilizantes/tratamientos';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

export const useFertilizantes = (data: GetAplicacionesFertilizantesCorteResponse | undefined, rol: number) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});
    const [totals, setTotals] = useState<{ [key: number]: number }>({});
    const [aplicacionFertilizanteEdit, setAplicacionFertilizanteEdit] = useState<AplicacionesFertilizantes>();
    const [tratamientoFertilizanteEdit, setTratamientoFertilizanteEdit] = useState<TratamientoFertilizante>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [formType, setFormType] = useState<'create' | 'update' | 'delete'>('create');
    const [typeModal, setTypeModal] = useState<'aplicacion' | 'tratamiento'>('aplicacion');
    const [modalSuertes, setModalSuertes] = useState<boolean>(false);
    const [agregarAplicacionesFertilizantes] = useMutation<GetAplicacionesFertilizantesRegister>(
        REGISTRAR_APLICACIONES_FERTILIZANTES
    );

    useEffect(() => {
        const trueKey = Object.keys(openStates).filter((key) => openStates[parseInt(key)] === true);
        if (trueKey.length !== 0) {
            for (let index = 0; index < trueKey.length; index++) {
                const tratamientos = data?.obtenerAplicacionesFertilizantesCorte?.find(
                    (data) => data.id_aplicaciones_fertilizantes === Number(trueKey[index])
                );
                const total =
                    tratamientos?.aplicacionFertilizante?.listTratamientoFertilizante?.reduce(
                        (acc, cr) => acc + (cr?.valor ?? 0),
                        0
                    ) ?? 0;
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
                                className="!text-[10px] !py-1 !px-3 !min-w-fit"
                                variant="outlined"
                                color="warning"
                                onClick={() => {
                                    setTypeModal('tratamiento');
                                    setFormType('update');
                                    setTratamientoFertilizanteEdit(params.row);
                                    setOpenModal(true);
                                }}
                            >
                                Editar
                            </Button>
                            <Button
                                className="!text-[10px] !py-1 !px-3 !min-w-fit"
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    setTypeModal('tratamiento');
                                    setFormType('delete');
                                    setTratamientoFertilizanteEdit(params.row);
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
        if (rol !== 1) {
            columns.pop();
        }
        return columns;
    };

    const handleSubmitAplicacionesFertilizantes = async (corteId: number) => {
        try {
            const data = await agregarAplicacionesFertilizantes({
                variables: {
                    createAplicacionesFertilizanteInput: [
                        {
                            corte_id: corteId,
                            apfe_id: aplicacionFertilizanteEdit?.apfe_id
                        }
                    ]
                },
                refetchQueries: [
                    { query: OBTENER_APLICACIONES_FERTILIZANTES },
                    { query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE, variables: { corteId } }
                ]
            });

            if (data.data?.agregarAplicacionesFertilizantes.length !== 0) {
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
        openStates,
        totals,
        openModal,
        typeModal,
        formType,
        aplicacionFertilizanteEdit,
        tratamientoFertilizanteEdit,
        modalSuertes,
        handleToggle,
        setAplicacionFertilizanteEdit,
        setOpenModal,
        setFormType,
        setTypeModal,
        setModalSuertes,
        getColumns,
        handleSubmitAplicacionesFertilizantes
    };
};
