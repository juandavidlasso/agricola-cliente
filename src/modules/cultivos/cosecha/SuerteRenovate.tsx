import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormDataSuerte, GetRenovarSuerteResponse } from '@interfaces/cultivos/suerte';
import { OBTENER_SUERTES_RENOVADAS } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import Loading from '@components/Loading';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { REGISTRAR_SUERTE_RENOVADA } from '@graphql/mutations';
import useAppDispatch from '@hooks/useAppDispatch';
import { saveSuerte } from '@store/cultivos/actions';

const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    variedad: yup.string().required('La variedad es requerida'),
    zona: yup.string().required('La zona es requerida')
});

interface Props {}

const SuerteRenovate: React.FC<Props> = ({}) => {
    const dispatch = useAppDispatch();
    const { setMessageType, setInfoMessage, setShowMessage, setOpenModal } = useContext(CultivosContext);
    const { suerte } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataSuerte>({
        resolver: yupResolver(schema),
        defaultValues: {
            nombre: suerte.nombre,
            variedad: '',
            zona: ''
        }
    });
    const [agregarSuerteRenovada] = useMutation<GetRenovarSuerteResponse>(REGISTRAR_SUERTE_RENOVADA);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitSuerte = async (dataForm: FormDataSuerte) => {
        setSubmitting(true);
        const { nombre, variedad, zona } = dataForm;

        try {
            const { data } = await agregarSuerteRenovada({
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

            dispatch(saveSuerte(data!.agregarSuerteRenovada));
            setMessageType('success');
            setInfoMessage('La suerte se renovo exitosamente.');
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
    return (
        <form onSubmit={handleSubmit(submitSuerte)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <TextField fullWidth {...register('nombre')} label="Nombre" disabled />
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
                        {submitting ? <Loading /> : 'Renovar'}
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default SuerteRenovate;
