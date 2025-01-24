import React, { useState } from 'react';
import { Grid2, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { ApolloError, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GetActualizarSuerteResponse, GetRenovarSuerteResponse, FormUpdateSuerte } from '@interfaces/cultivos/suerte';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { REGISTRAR_SUERTE_RENOVADA, ACTUALIZAR_SUERTE } from '@graphql/mutations';
import { OBTENER_SUERTE, OBTENER_SUERTES_RENOVADAS } from '@graphql/queries';
import useAppDispatch from '@hooks/useAppDispatch';
import { saveSuerte } from '@store/cultivos/actions';
import Loading from '@components/Loading';
import { AlertType } from '@interfaces/alerts';

const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    variedad: yup.string().required('La variedad es requerida'),
    zona: yup.string().required('La zona es requerida'),
    renovada: yup.string().required()
});

interface Props {
    formType: 'renovar' | 'editar' | 'eliminar';
    handleClose: () => void;
    setMessageType: React.Dispatch<React.SetStateAction<AlertType>>;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateSuerte: React.FC<Props> = ({ formType, handleClose, setMessageType, setInfoMessage, setShowMessage }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { nombre, variedad, zona, renovada, id_suerte } = useAppSelector((state: IRootState) => state.cultivosReducer.suerte);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormUpdateSuerte>({
        values: {
            nombre,
            variedad,
            zona,
            renovada
        },
        resolver: yupResolver(schema)
    });
    const [agregarSuerteRenovada] = useMutation<GetRenovarSuerteResponse>(REGISTRAR_SUERTE_RENOVADA);
    const [actualizarSuerte] = useMutation<GetActualizarSuerteResponse>(ACTUALIZAR_SUERTE);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitSuerte = async (dataForm: FormUpdateSuerte) => {
        const { nombre, variedad, zona, renovada } = dataForm;
        setSubmitting(true);

        try {
            if (formType === 'editar') {
                await actualizarSuerte({
                    variables: {
                        updateSuerteInput: {
                            id_suerte,
                            nombre,
                            variedad,
                            zona,
                            renovada
                        }
                    },
                    refetchQueries: [{ query: OBTENER_SUERTE, variables: { idSuerte: id_suerte } }]
                });
                dispatch(
                    saveSuerte({
                        id_suerte,
                        nombre,
                        variedad,
                        zona,
                        renovada
                    })
                );
            }
            if (formType === 'renovar') {
                await agregarSuerteRenovada({
                    variables: {
                        createSuerteInput: {
                            nombre,
                            variedad,
                            zona,
                            renovada
                        }
                    },
                    refetchQueries: [
                        { query: OBTENER_SUERTES_RENOVADAS },
                        { query: OBTENER_SUERTE, variables: { idSuerte: id_suerte } }
                    ]
                });
                router.replace('/suerte');
            }

            setMessageType('success');
            setInfoMessage(
                `${
                    formType === 'renovar'
                        ? 'La suerte se ha renovado exitosamente.'
                        : formType === 'editar'
                        ? 'La suerte se ha actualizado exitosamente.'
                        : 'La suerte se eliminó exitosamente.'
                }`
            );
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
        <form className="mt-5" onSubmit={handleSubmit(submitSuerte)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('nombre')}
                        disabled={formType === 'renovar'}
                        label="Nombre"
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('variedad')}
                        label="Variedad"
                        error={!!errors.variedad}
                        helperText={errors.variedad?.message}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('zona')}
                        label="Zona agroecológica"
                        error={!!errors.zona}
                        helperText={errors.zona?.message}
                    />
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="center" gap={4}>
                    <Button
                        disabled={submitting}
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
                    >
                        {submitting ? (
                            <Loading />
                        ) : formType === 'renovar' ? (
                            'Renovar'
                        ) : formType === 'editar' ? (
                            'Actualizar'
                        ) : (
                            'Eliminar'
                        )}
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            reset();
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

export default UpdateSuerte;
