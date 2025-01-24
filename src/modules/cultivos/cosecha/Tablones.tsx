import React, { useContext, useEffect, useState } from 'react';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid2, TextField, Typography } from '@mui/material';
import Alert from '@components/Alert';
import { OBTENER_TABLONES_CORTE, OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { GetRegistrarTablon, GetResponseTablonesCorte, TablonState } from '@interfaces/cultivos/tablones';
import { IRootState } from '@interfaces/store';
import { handleKeyDownNumber } from '@utils/validations';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { REGISTRAR_TABLON } from '@graphql/mutations';

interface Props {
    corteId: number;
}

const Tablones: React.FC<Props> = ({ corteId }) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { setOpenModal, setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { data, loading, error } = useQuery<GetResponseTablonesCorte>(OBTENER_TABLONES_CORTE, {
        variables: { idCorte: id_corte }
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [arrayData, setArrayData] = useState<TablonState[]>([]);
    const [tablones, setTablones] = useState<TablonState[]>([]);
    const [tempData, setTempData] = useState<number[]>([]);
    const [agregarTablon] = useMutation<GetRegistrarTablon>(REGISTRAR_TABLON);

    useEffect(() => {
        if (!error) {
            setArrayData(data?.obtenerTablonesPorCorte ?? []);
        }
    }, [loading]);

    if (error) return <Alert message={error.message} />;

    if (loading) return <CircularProgress />;

    const handleChange = (index: number, value: string) => {
        const newData = arrayData.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    area: Number(value)
                };
            }
            return item;
        });
        setArrayData(newData);
    };
    const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, idTablon: number) => {
        const tablon = arrayData.find((data) => data.id_tablon === idTablon);
        if (checked) {
            setTablones([...tablones, tablon!]);
        } else {
            const newTablones = tablones.filter((tablon) => tablon.id_tablon !== idTablon);
            setTablones(newTablones);
        }
    };

    const submitForm = async () => {
        setSubmitting(true);
        const newTablones = tablones.map((tablon) => ({
            numero: tablon?.numero,
            area: tablon?.area,
            estado: true,
            corte_id: corteId
        }));
        const ids = tablones.map((t) => t.id_tablon);
        setTempData([...tempData, ...ids]);

        try {
            await agregarTablon({
                variables: {
                    createTabloneInput: newTablones
                },
                refetchQueries: [
                    { query: OBTENER_TABLONES_CORTE, variables: { idCorte: corteId } },
                    { query: OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS, variables: { idCorte: corteId } }
                ]
            });

            setMessageType('success');
            setInfoMessage('El tablón se registro exitosamente.');
            setShowMessage(true);
            setSubmitting(false);
        } catch (error) {
            if (error instanceof ApolloError) {
                setMessageType('error');
                setInfoMessage(error.message.replace('Error:', ''));
                setShowMessage(true);
                setSubmitting(false);
                return;
            }
            setMessageType('error');
            setInfoMessage(error as string);
            setShowMessage(true);
            setSubmitting(false);
            return;
        }
    };

    return (
        <Grid2 container spacing={2} overflow={'auto'}>
            <Grid2 size={12}>
                <Typography>Seleccione y edite los tablones que desea agregar al nuevo corte</Typography>
            </Grid2>
            {arrayData.map((tablon, index) => (
                <Grid2 key={tablon.id_tablon} size={12} display={'flex'} gap={'10px'} mt={1} alignItems={'center'}>
                    <TextField label="Número" value={tablon.numero} sx={{ flex: 1 }} disabled />
                    <TextField
                        label="Área"
                        value={tablon.area}
                        onChange={(e) => handleChange(index, e.target.value)}
                        sx={{ flex: 1 }}
                        onKeyDown={handleKeyDownNumber}
                        disabled={tempData.includes(tablon.id_tablon)}
                    />
                    <FormGroup>
                        <FormControlLabel
                            disabled={submitting || tempData.includes(tablon.id_tablon)}
                            control={
                                <Checkbox
                                    sx={{ color: '#000000' }}
                                    checked={tablones.includes(tablon)}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
                                        handleChangeCheck(event, checked, tablon.id_tablon)
                                    }
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label="Agregar"
                        />
                    </FormGroup>
                </Grid2>
            ))}
            <Grid2 size={12} mt={2} textAlign={'center'} display={'flex'} justifyContent={'center'} gap={2}>
                <Button variant="contained" disabled={submitting} onClick={submitForm}>
                    Agregar
                </Button>
                <Button variant="contained" onClick={() => setOpenModal(false)}>
                    Terminar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default Tablones;
