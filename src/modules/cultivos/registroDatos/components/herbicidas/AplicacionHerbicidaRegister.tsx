import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    AplicacionHerbicidas,
    FormDataAplicacionHerbicidas,
    GetAplicacionHerbicidaRegister,
    GetAplicacionHerbicidaUpdate
} from '@interfaces/cultivos/herbicidas/aplicacion';
import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Loading from '@components/Loading';
import { ApolloError, useMutation } from '@apollo/client';
import { ACTUALIZAR_APLICACION_HERBICIDA, REGISTAR_APLICACION_HERBICIDA } from '@graphql/mutations';
import { OBTENER_APLICACIONES_HERBICIDAS } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const schema = yup.object({
    tipo: yup.string().required('El tipo de aplicación es requerido.'),
    fecha: yup.string().required('La fecha es requerida.')
});

interface Props {}

const AplicacionHerbicidaRegister: React.FC<Props> = ({}) => {
    const { aplicacionHerbicidaEdit, formType, setOpenModalForms, setMessageType, setInfoMessage, setShowMessage } =
        useContext(CultivosContext);
    const [agregarAplicacionHerbicida] = useMutation<GetAplicacionHerbicidaRegister>(REGISTAR_APLICACION_HERBICIDA);
    const [actualizarAplicacionHerbicida] = useMutation<GetAplicacionHerbicidaUpdate>(ACTUALIZAR_APLICACION_HERBICIDA);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const aplicacionHerbicida = aplicacionHerbicidaEdit as AplicacionHerbicidas;
    const {
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        control
    } = useForm<FormDataAplicacionHerbicidas>({
        resolver: yupResolver(schema),
        defaultValues: {
            fecha: formType === 'create' ? '' : dayjs(aplicacionHerbicida?.fecha).format('YYYY-MM-DD'),
            tipo: formType === 'create' ? '' : aplicacionHerbicida?.tipo
        }
    });

    const submitAplicacionHerbicida = async (data: FormDataAplicacionHerbicidas) => {
        setSubmitting(true);
        try {
            if (formType === 'create') {
                await agregarAplicacionHerbicida({
                    variables: {
                        createAplicacionHerbicidaInput: {
                            tipo: data.tipo,
                            fecha: data.fecha
                        }
                    },
                    refetchQueries: [{ query: OBTENER_APLICACIONES_HERBICIDAS }]
                });
            } else {
                await actualizarAplicacionHerbicida({
                    variables: {
                        updateAplicacionHerbicidaInput: {
                            id_aphe: aplicacionHerbicida?.id_aphe,
                            tipo: data.tipo,
                            fecha: data.fecha,
                            duplicate: formType === 'duplicar'
                        }
                    },
                    refetchQueries: [{ query: OBTENER_APLICACIONES_HERBICIDAS }]
                });
            }

            setMessageType('success');
            setInfoMessage(
                `La aplicación se ${
                    formType === 'create' ? 'registro' : formType === 'update' ? 'actualizo' : 'duplico'
                } exitosamente.`
            );
            setShowMessage(true);
            setOpenModalForms(false);
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
        <form onSubmit={handleSubmit(submitAplicacionHerbicida)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12} mt={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha aplicación herbicida"
                            onChange={(value) => {
                                const newValue = dayjs(value as any).format('YYYY-MM-DD');
                                setValue('fecha', newValue);
                            }}
                            format="DD/MM/YYYY"
                            defaultValue={formType === 'create' ? undefined : dayjs(aplicacionHerbicida?.fecha, 'YYYY-MM-DD')}
                        />
                        {!!errors.fecha && (
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
                                {errors.fecha.message}
                            </Typography>
                        )}
                    </LocalizationProvider>
                </Grid2>
                <Grid2 size={12}>
                    <FormControl fullWidth>
                        <InputLabel id="tipoApliHer">Tipo de aplicación</InputLabel>
                        <Controller
                            name="tipo"
                            control={control}
                            rules={{ required: 'El tipo de aplicación es requerido.' }}
                            render={({ field }) => (
                                <Select {...field} label="Tipo de aplicación">
                                    <MenuItem value={''}></MenuItem>
                                    <MenuItem value={'PRE-EMERGENTE'}>PRE-EMERGENTE</MenuItem>
                                    <MenuItem value={'POST-EMERGENTE'}>POST-EMERGENTE</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="center" gap={3}>
                    <Button color="primary" variant="contained" type="submit" disabled={submitting}>
                        {submitting ? (
                            <Loading />
                        ) : formType === 'create' ? (
                            'Registrar'
                        ) : formType === 'duplicar' ? (
                            'Duplicar'
                        ) : (
                            'Actualizar'
                        )}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            reset();
                            setOpenModalForms(false);
                        }}
                    >
                        Cancelar
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default AplicacionHerbicidaRegister;
