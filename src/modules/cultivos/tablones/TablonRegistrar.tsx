import React, { useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid2, TextField } from '@mui/material';
import Loading from '@components/Loading';
import { AlertType } from '@interfaces/alerts';
import { FormDataTablones, GetRegistrarTablon } from '@interfaces/cultivos/tablones';
import { REGISTRAR_TABLON } from '@graphql/mutations';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { OBTENER_TABLONES_CORTE, OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS } from '@graphql/queries';

const schema = yup.object({
    numero: yup.number().typeError('El número es requerido').required(),
    area: yup.number().typeError('El área es requerida').required()
});

interface Props {
    handleClose: () => void;
    setMessageType: React.Dispatch<React.SetStateAction<AlertType>>;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const TablonRegistrar: React.FC<Props> = ({ handleClose, setMessageType, setInfoMessage, setShowMessage }) => {
    const {
        corte: { id_corte }
    } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormDataTablones>({
        resolver: yupResolver(schema)
    });
    const [agregarTablon] = useMutation<GetRegistrarTablon>(REGISTRAR_TABLON);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitForm = async (formData: FormDataTablones) => {
        setSubmitting(true);
        const { numero, area } = formData;

        try {
            const { data } = await agregarTablon({
                variables: {
                    createTabloneInput: [
                        {
                            numero,
                            area,
                            estado: true,
                            corte_id: id_corte
                        }
                    ]
                },
                refetchQueries: [
                    { query: OBTENER_TABLONES_CORTE, variables: { idCorte: id_corte } },
                    { query: OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS, variables: { idCorte: id_corte } }
                ]
            });

            if (data?.agregarTablon.length !== 0) {
                setMessageType('success');
                setInfoMessage('El tablón se registro exitosamente.');
                setShowMessage(true);
                setSubmitting(false);
                reset();
            } else {
                setMessageType('error');
                setInfoMessage('El tablón ya esta registrado.');
                setShowMessage(true);
                setSubmitting(false);
            }
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
                        label="Número"
                        {...register('numero')}
                        error={!!errors.numero}
                        helperText={errors.numero?.message}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Área"
                        {...register('area')}
                        error={!!errors.area}
                        helperText={errors.area?.message}
                    />
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="center" gap={3}>
                    <Button color="primary" variant="contained" type="submit" disabled={submitting}>
                        {submitting ? <Loading /> : 'Registrar'}
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

export default TablonRegistrar;
