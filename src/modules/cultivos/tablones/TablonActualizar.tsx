import React, { useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormDataTablones, GetActualizarTablon } from '@interfaces/cultivos/tablones';
import { Button, Grid, TextField } from '@mui/material';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { ACTUALIZAR_TABLON } from '@graphql/mutations';
import { AlertType } from '@interfaces/alerts';
import { OBTENER_AREA_SUERTE, OBTENER_TABLONES_CORTE, OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS } from '@graphql/queries';
import Loading from '@components/Loading';

const schema = yup.object({
    numero: yup.number().typeError('El número debe ser numérico').required(),
    area: yup.number().typeError('El área debe ser numérica').required()
});

interface Props {
    handleClose: () => void;
    setMessageType: React.Dispatch<React.SetStateAction<AlertType>>;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const TablonActualizar: React.FC<Props> = ({ handleClose, setMessageType, setInfoMessage, setShowMessage }) => {
    const { id_tablon, numero, area, estado, corte_id } = useAppSelector((state: IRootState) => state.cultivosReducer.tablon);
    const { id_suerte } = useAppSelector((state: IRootState) => state.cultivosReducer.suerte);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataTablones>({
        defaultValues: {
            numero,
            area
        },
        resolver: yupResolver(schema)
    });
    const [actualizarTablon] = useMutation<GetActualizarTablon>(ACTUALIZAR_TABLON);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);

    const onSubmitUpdate = async (dataForm: FormDataTablones) => {
        setSubmitting(true);

        try {
            await actualizarTablon({
                variables: {
                    updateTabloneInput: {
                        id_tablon,
                        numero: dataForm.numero,
                        area: dataForm.area,
                        estado,
                        corte_id
                    }
                },
                refetchQueries: [
                    { query: OBTENER_TABLONES_CORTE, variables: { idCorte: corte_id } },
                    { query: OBTENER_AREA_SUERTE, variables: { idSuerte: id_suerte } },
                    { query: OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS, variables: { idCorte: corte_id } }
                ]
            });

            setMessageType('success');
            setInfoMessage('El tablón se actualizo exitosamente.');
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
        <form className="!mt-5" onSubmit={handleSubmit(onSubmitUpdate)}>
            <Grid container spacing={2} textAlign="center">
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        {...register('numero')}
                        label="Número"
                        error={!!errors.numero}
                        helperText={errors.numero?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        {...register('area')}
                        label="Área"
                        error={!!errors.area}
                        helperText={errors.area?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={submitting} type="submit" variant="contained" color="primary" className="!mr-5">
                        {submitting ? <Loading /> : 'Actualizar'}
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TablonActualizar;
