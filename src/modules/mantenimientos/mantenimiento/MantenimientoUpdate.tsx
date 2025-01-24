import React, { useContext, useState } from 'react';
import { Box, Button, Grid2, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Loading from '@components/Loading';
import { FormDataMantenimiento, GetMantenimientoUpdate } from '@interfaces/mantenimientos/mantenimiento';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { OBTENER_APLICACIONES_MANTENIMIENTO, OBTENER_INSUMOS } from '@graphql/queries';
import { GetInsumosResponse } from '@interfaces/insumos';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { handleKeyDownNumber } from '@utils/validations';
import { MaquinariaContext } from 'src/context/maquinaria/MaquinariaContext';
import { ACTUALIZAR_MANTENIMIENTO } from '@graphql/mutations';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const schema = yup.object({
    insumoId: yup.number().required('El insumo es requerido.'),
    cantidad: yup.number().required('La cantidad es requerida.'),
    tipoCambio: yup.boolean().required('Debe seleccionar un tipo de cambio.'),
    horaCambio: yup.string().required('La hora o fecha de cambio es requerida.'),
    proximoCambio: yup.number().required('El próximo cambio es requerido.'),
    detalle: yup.string().optional()
});

interface Props {}

const MantenimientoUpdate: React.FC<Props> = ({}) => {
    const { data, loading, error } = useQuery<GetInsumosResponse>(OBTENER_INSUMOS);
    const { mantenimientoEdit, setOpenModal } = useContext(MaquinariaContext);
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [actualizarMantenimiento] = useMutation<GetMantenimientoUpdate>(ACTUALIZAR_MANTENIMIENTO);
    const { idMaquinaria } = useAppSelector((state: IRootState) => state.maquinariaReducer.maquinaria);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        control,
        formState: { errors }
    } = useForm<FormDataMantenimiento>({
        resolver: yupResolver(schema),
        defaultValues: {
            insumoId: mantenimientoEdit?.insumoId,
            cantidad: mantenimientoEdit?.cantidad,
            tipoCambio: mantenimientoEdit?.tipoCambio,
            horaCambio: mantenimientoEdit?.horaCambio,
            proximoCambio: mantenimientoEdit?.proximoCambio,
            detalle: mantenimientoEdit?.detalle
        }
    });
    const submitForm = async (data: FormDataMantenimiento) => {
        setSubmitting(true);
        try {
            await actualizarMantenimiento({
                variables: {
                    updateMantenimientoInput: {
                        ...data,
                        idMantenimiento: mantenimientoEdit?.idMantenimiento
                    }
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_MANTENIMIENTO, variables: { maquinariaId: idMaquinaria } }]
            });
            setMessageType('success');
            setInfoMessage('El mantenimiento se actualizo exitosamente.');
            setShowMessage(true);
            setOpenModal(false);
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
        <form className="mt-5" onSubmit={handleSubmit(submitForm)} style={{ height: '90%' }}>
            <Grid2 container spacing={1} className="!flex !flex-col !gap-5">
                <Grid2 size={12}>
                    <Controller
                        name="insumoId"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Insumo"
                                fullWidth
                                error={!!errors.insumoId}
                                helperText={errors.insumoId?.message}
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
                    <TextField
                        {...register('cantidad')}
                        label="Cantidad"
                        fullWidth
                        error={!!errors.cantidad}
                        helperText={errors.cantidad?.message}
                        onKeyDown={handleKeyDownNumber}
                    />
                </Grid2>

                <Grid2 size={12}>
                    <Stack direction="row" sx={{ alignItems: 'center' }}>
                        <Typography>Fecha</Typography>
                        <Switch
                            {...register('tipoCambio')}
                            defaultChecked={mantenimientoEdit?.tipoCambio}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Typography>Hora</Typography>
                    </Stack>
                </Grid2>

                <Grid2 size={12} display={'flex'} justifyContent={'space-between'}>
                    <Box className="!w-[50%]">
                        {!watch('tipoCambio') ? (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha"
                                    onChange={(value) => {
                                        const newValue = dayjs(value).format('YYYY-MM-DD');
                                        setValue('horaCambio', newValue);
                                    }}
                                    format="DD/MM/YYYY"
                                    defaultValue={dayjs(mantenimientoEdit?.horaCambio, 'YYYY-MM-DD')}
                                />
                                {!!errors.horaCambio && (
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
                                        {errors.horaCambio?.message}
                                    </Typography>
                                )}
                            </LocalizationProvider>
                        ) : (
                            <TextField
                                className="!w-[60%]"
                                {...register('horaCambio')}
                                label="Hora"
                                error={!!errors.horaCambio}
                                helperText={errors.horaCambio?.message}
                                onKeyDown={handleKeyDownNumber}
                            />
                        )}
                    </Box>

                    <Box className="!w-[50%]">
                        <TextField
                            {...register('proximoCambio')}
                            label="Próximo cambio"
                            fullWidth
                            error={!!errors.proximoCambio}
                            helperText={errors.proximoCambio?.message}
                            onKeyDown={handleKeyDownNumber}
                        />
                    </Box>
                </Grid2>

                <Grid2 size={12}>
                    <TextField {...register('detalle')} label="Detalle" fullWidth />
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="center" gap={4} mt={3} mb={2}>
                    <Button
                        disabled={submitting}
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
                    >
                        {submitting ? <Loading /> : 'Actualizar'}
                    </Button>
                    <Button
                        onClick={() => {
                            reset();
                            setOpenModal(false);
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

export default MantenimientoUpdate;
