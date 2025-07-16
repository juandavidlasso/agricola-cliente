import React, { useContext, useState } from 'react';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Box, Button, Grid2, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Alert from '@components/Alert';
import Loading from '@components/Loading';
import ModalLoading from '@components/Modal';
import { OBTENER_APLICACIONES_MANTENIMIENTO, OBTENER_INSUMOS } from '@graphql/queries';
import { GetInsumosResponse } from '@interfaces/insumos';
import { FormDataValidation, GetMantenimientoRegister } from '@interfaces/mantenimientos/mantenimiento';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { handleKeyDownNumber } from '@utils/validations';
import { REGISTRAR_MANTENIMIENTOS } from '@graphql/mutations';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { AplicacionMantenimiento } from '@interfaces/mantenimientos/aplicaciones';

const schema = yup.object({
    mantenimientos: yup.array().of(
        yup.object({
            insumoId: yup.number().required('El insumo es requerido.'),
            cantidad: yup.string().required('La cantidad es requerida.'),
            tipoCambio: yup.boolean().required('Debe seleccionar un tipo de cambio.'),
            horaCambio: yup.string().required('La hora o fecha de cambio es requerida.'),
            proximoCambio: yup.number().required('El próximo cambio es requerido.'),
            detalle: yup.string().optional()
        })
    )
});

interface Props {
    aplicacionMantenimiento: AplicacionMantenimiento | undefined;
    handleClose: () => void;
}

const MantenimientoRegister: React.FC<Props> = ({ aplicacionMantenimiento, handleClose }) => {
    const { data, loading, error } = useQuery<GetInsumosResponse>(OBTENER_INSUMOS);
    const { setShowMessage, setInfoMessage, setMessageType } = useContext(CultivosContext);
    const { idMaquinaria } = useAppSelector((state: IRootState) => state.maquinariaReducer.maquinaria);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
        control
    } = useForm({
        resolver: yupResolver(schema)
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'mantenimientos' as never
    });
    const [agregarMantenimiento] = useMutation<GetMantenimientoRegister>(REGISTRAR_MANTENIMIENTOS);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitMantenimiento = async (dataForm: any) => {
        setSubmitting(true);
        const data = dataForm as FormDataValidation;
        const newData = data.mantenimientos.map((data) => ({
            ...data,
            ApMantId: aplicacionMantenimiento?.idApMant
        }));

        try {
            const { data } = await agregarMantenimiento({
                variables: {
                    createMantenimientoInput: newData
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_MANTENIMIENTO, variables: { maquinariaId: idMaquinaria } }]
            });
            if (data?.agregarMantenimiento.length !== 0) {
                setMessageType('success');
                setInfoMessage('El mantenimiento se registro exitosamente.');
                setShowMessage(true);
                handleClose();
                return;
            }
            setMessageType('error');
            setInfoMessage('No se pudo registrar el mantenimiento.');
            setShowMessage(true);
            handleClose();
            return;
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

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <form className="mt-5" onSubmit={handleSubmit(submitMantenimiento)} style={{ height: '90%' }}>
            <Grid2 container spacing={1}>
                {fields.map((item, index) => (
                    <Box key={item.id} className="!border-solid !border-gray-500 !border-2 !w-full !p-4 !flex !flex-col !gap-3">
                        <Grid2 size={12}>
                            <Controller
                                name={`mantenimientos.${index}.insumoId`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        select
                                        label="Insumo"
                                        {...field}
                                        fullWidth
                                        error={!!errors.mantenimientos?.[index]?.insumoId}
                                        helperText={errors.mantenimientos?.[index]?.insumoId?.message}
                                    >
                                        {data?.obtenerInsumos.map((option) => (
                                            <MenuItem key={option.idInsumo} value={option.idInsumo}>
                                                {option.nombre}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid2>

                        <Grid2 size={12}>
                            <Controller
                                name={`mantenimientos.${index}.cantidad`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Cantidad"
                                        fullWidth
                                        error={!!errors.mantenimientos?.[index]?.cantidad}
                                        helperText={errors.mantenimientos?.[index]?.cantidad?.message}
                                        onKeyDown={handleKeyDownNumber}
                                    />
                                )}
                            />
                        </Grid2>

                        <Grid2 size={12}>
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <Typography>Fecha</Typography>
                                <Switch
                                    {...register(`mantenimientos.${index}.tipoCambio`)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <Typography>Hora</Typography>
                            </Stack>
                        </Grid2>

                        <Grid2 size={12} mt={2} display={'flex'} justifyContent={'space-between'}>
                            <Box className="!w-[50%]">
                                {!watch(`mantenimientos.${index}.tipoCambio`) ? (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Fecha"
                                            value={dayjs(`mantenimientos.${index}.horaCambio`)}
                                            onChange={(value) => {
                                                const newValue = dayjs(value).format('YYYY-MM-DD');
                                                setValue(`mantenimientos.${index}.horaCambio`, newValue);
                                            }}
                                            format="DD/MM/YYYY"
                                        />
                                        {!!errors.mantenimientos?.[index]?.horaCambio && (
                                            <Typography
                                                sx={{
                                                    color: '#d32f2f',
                                                    fontSize: '0.75rem',
                                                    lineHeight: 1.66,
                                                    textAlign: 'left',
                                                    mt: '4px',
                                                    mr: '14px',
                                                    mb: 0,
                                                    ml: '14px'
                                                }}
                                            >
                                                {errors.mantenimientos[index]?.horaCambio?.message}
                                            </Typography>
                                        )}
                                    </LocalizationProvider>
                                ) : (
                                    <TextField
                                        className="!w-[60%]"
                                        {...register(`mantenimientos.${index}.horaCambio`)}
                                        label="Hora"
                                        error={!!errors.mantenimientos?.[index]?.horaCambio}
                                        helperText={errors.mantenimientos?.[index]?.horaCambio?.message}
                                        onKeyDown={handleKeyDownNumber}
                                    />
                                )}
                            </Box>

                            <Box className="!w-[50%]">
                                <TextField
                                    {...register(`mantenimientos.${index}.proximoCambio`)}
                                    label="Próximo cambio"
                                    fullWidth
                                    error={!!errors.mantenimientos?.[index]?.proximoCambio}
                                    helperText={errors.mantenimientos?.[index]?.proximoCambio?.message}
                                    onKeyDown={handleKeyDownNumber}
                                />
                            </Box>
                        </Grid2>

                        <Grid2 size={12}>
                            <TextField {...register(`mantenimientos.${index}.detalle`)} label="Detalle" fullWidth />
                        </Grid2>

                        <Button variant="outlined" color="error" onClick={() => remove(index)}>
                            Eliminar campo
                        </Button>
                    </Box>
                ))}
                {/* </Box> */}
                <Button variant="text" className="!text-sm !border-solid !border-[1px]" onClick={() => append({})}>
                    Agregar campos
                </Button>
                <Grid2 size={12} display="flex" justifyContent="center" gap={4} mt={3} mb={2}>
                    <Button
                        disabled={submitting}
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
                    >
                        {submitting ? <Loading /> : 'Registrar'}
                    </Button>
                    <Button
                        onClick={() => {
                            reset();
                            handleClose();
                        }}
                        color="primary"
                        variant="contained"
                        sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
                    >
                        Cancelar
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default MantenimientoRegister;
