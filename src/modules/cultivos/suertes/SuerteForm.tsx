import React, { useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid2, TextField } from '@mui/material';
import { FormDataSuerte, GetAgregarSuerteResponse } from '@interfaces/cultivos/suerte';
import Loading from '@components/Loading';
import { REGISTRAR_SUERTE } from '@graphql/mutations';
import { OBTENER_SUERTES_RENOVADAS } from '@graphql/queries';
import { AlertType } from '@interfaces/alerts';

const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    variedad: yup.string().required('La variedad es requerida'),
    zona: yup.string().required('La zona es requerida')
});

interface Props {
    handleClose: () => void;
    setMessageType: React.Dispatch<React.SetStateAction<AlertType>>;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuerteForm: React.FC<Props> = ({ handleClose, setMessageType, setInfoMessage, setShowMessage }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormDataSuerte>({
        resolver: yupResolver(schema)
    });
    const [agregarSuerte] = useMutation<GetAgregarSuerteResponse>(REGISTRAR_SUERTE);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitSuerte = async (dataForm: FormDataSuerte) => {
        const { nombre, variedad, zona } = dataForm;
        setSubmitting(true);

        try {
            await agregarSuerte({
                variables: {
                    createSuerteInput: {
                        nombre,
                        variedad,
                        zona,
                        renovada: 'SI'
                    }
                },
                refetchQueries: [{ query: OBTENER_SUERTES_RENOVADAS }]
            });

            setMessageType('success');
            setInfoMessage('La suerte se registro exitosamente.');
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
        <form className="mt-5" onSubmit={handleSubmit(submitSuerte)} style={{ height: '90%' }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('nombre')}
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
                <Grid2 size={12} display="flex" justifyContent="center" gap={4} mt={3}>
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

export default SuerteForm;
