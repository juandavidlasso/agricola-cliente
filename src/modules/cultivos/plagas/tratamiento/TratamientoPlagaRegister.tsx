import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid2, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    DataTypePlaga,
    FormDataPlaga,
    GetTratamientoPlagaRegister,
    GetTratamientoPlagaUpdate,
    TratamientoPlaga
} from '@interfaces/cultivos/plagas/tratamiento';
import Loading from '@components/Loading';
import { ApolloError, useMutation } from '@apollo/client';
import { ACTUALIZAR_TRATAMIENTO_PLAGAS, REGISTRAR_TRATAMIENTO_PLAGAS } from '@graphql/mutations';
import { OBTENER_TRATAMIENTO_PLAGAS } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const schema = yup.object({
    producto: yup.string().required('El producto es requerido.'),
    unidad: yup.string().required('La unidad es requerida.'),
    cantidad: yup.number().typeError('La cantidad es requerida.').required(),
    tiempo: yup.string().required('El tiempo es requerido.')
});

interface Props {
    handleClose: () => void;
    formType: DataTypePlaga;
    tratamientoPlaga: TratamientoPlaga | undefined;
}

const TratamientoPlagaRegister: React.FC<Props> = ({ handleClose, formType, tratamientoPlaga }) => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormDataPlaga>({
        resolver: yupResolver(schema),
        defaultValues: {
            producto: formType === 'create' ? '' : tratamientoPlaga?.producto,
            unidad: formType === 'create' ? '' : tratamientoPlaga?.unidad,
            cantidad: formType === 'create' ? undefined : tratamientoPlaga?.cantidad,
            tiempo: formType === 'create' ? '' : tratamientoPlaga?.tiempo
        }
    });
    const [agregarTratamientoPlagas] = useMutation<GetTratamientoPlagaRegister>(REGISTRAR_TRATAMIENTO_PLAGAS);
    const [actualizarTratamientoPlagas] = useMutation<GetTratamientoPlagaUpdate>(ACTUALIZAR_TRATAMIENTO_PLAGAS);

    const submitForm = async (formData: FormDataPlaga) => {
        setSubmitting(true);

        try {
            if (formType === 'create') {
                await agregarTratamientoPlagas({
                    variables: {
                        createTratamientoPlagasInput: {
                            producto: formData.producto,
                            unidad: formData.unidad,
                            cantidad: formData.cantidad,
                            tiempo: formData.tiempo
                        }
                    },
                    refetchQueries: [{ query: OBTENER_TRATAMIENTO_PLAGAS }]
                });
            } else {
                await actualizarTratamientoPlagas({
                    variables: {
                        updateTratamientoPlagasInput: {
                            id_trapl: tratamientoPlaga?.id_trapl,
                            producto: formData.producto,
                            unidad: formData.unidad,
                            cantidad: formData.cantidad,
                            tiempo: formData.tiempo
                        }
                    },
                    refetchQueries: [{ query: OBTENER_TRATAMIENTO_PLAGAS }]
                });
            }

            setMessageType('success');
            setInfoMessage(`El tratamiento se ${formType === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
            setShowMessage(true);
            handleClose();
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
        <form onSubmit={handleSubmit(submitForm)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12} mt={2}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Producto"
                        {...register('producto')}
                        error={!!errors.producto}
                        helperText={errors.producto?.message}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Unidad"
                        {...register('unidad')}
                        error={!!errors.unidad}
                        helperText={
                            !!errors.unidad ? (
                                errors.unidad?.message
                            ) : (
                                <Typography
                                    sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                    className="!font-normal !text-[0.75rem] !text-left !mt-[3px] !mr-0 !mb-0 !ml-0"
                                >
                                    (Ej: GRAMOS - UNIDAD - can pul2)
                                </Typography>
                            )
                        }
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Dósis"
                        {...register('cantidad')}
                        error={!!errors.cantidad}
                        helperText={
                            !!errors.cantidad ? (
                                errors.cantidad?.message
                            ) : (
                                <Typography
                                    sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                    className="!font-normal !text-[0.75rem] !text-left !mt-[3px] !mr-0 !mb-0 !ml-0"
                                >
                                    (Ej: 2 - 30 - 5.2)
                                </Typography>
                            )
                        }
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Tiempo Aplicación"
                        {...register('tiempo')}
                        error={!!errors.tiempo}
                        helperText={
                            !!errors.tiempo ? (
                                errors.tiempo?.message
                            ) : (
                                <Typography
                                    sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                    className="!font-normal !text-[0.75rem] !text-left !mt-[3px] !mr-0 !mb-0 !ml-0"
                                >
                                    (Ej: 0-3 MESES)
                                </Typography>
                            )
                        }
                    />
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="center" gap={3}>
                    <Button color="primary" variant="contained" type="submit" disabled={submitting}>
                        {submitting ? <Loading /> : formType === 'create' ? 'Registrar' : 'Actualizar'}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            reset();
                            handleClose();
                        }}
                    >
                        Cancelar
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default TratamientoPlagaRegister;
