import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Loading from '@components/Loading';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { FormLluvia, GetLluviaRegister, GetLluviaUpdate, Lluvia } from '@interfaces/lluvias';
import { handleKeyDownNumber } from '@utils/validations';
import { ACTUALIZAR_LLUVIA, REGISTRAR_LLUVIA } from '@graphql/mutations';
import { OBTENER_LLUVIAS, OBTENER_PLUVIOMETROS_Y_LLUVIAS } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const schema = yup.object({
    cantidad: yup.number().required('La cantidad es requerida').typeError('La cantidad es requerida'),
    fecha: yup.string().required('La fecha es requerida')
});

interface Props {
    lluvia?: Lluvia;
}

const LluviaRegister: React.FC<Props> = ({ lluvia }) => {
    const { type, setOpenModalLluvia } = useContext(PluviometroContext);
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [agregarLluvia] = useMutation<GetLluviaRegister>(REGISTRAR_LLUVIA);
    const [actualizarLluvia] = useMutation<GetLluviaUpdate>(ACTUALIZAR_LLUVIA);

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm<FormLluvia>({
        resolver: yupResolver(schema),
        defaultValues: {
            cantidad: type === 'update' ? lluvia?.cantidad : undefined,
            fecha: type === 'update' ? dayjs(lluvia?.fecha).format('YYYY-MM-DD') : ''
        }
    });

    const submitLluvia = async (dataForm: FormLluvia) => {
        setSubmitting(true);

        try {
            if (type === 'create') {
                await agregarLluvia({
                    variables: {
                        createLluviaInput: {
                            cantidad: dataForm.cantidad,
                            fecha: dataForm.fecha
                        }
                    },
                    refetchQueries: [{ query: OBTENER_LLUVIAS }, { query: OBTENER_PLUVIOMETROS_Y_LLUVIAS }]
                });
            } else {
                await actualizarLluvia({
                    variables: {
                        updateLluviaInput: {
                            id_lluvia: lluvia?.id_lluvia,
                            cantidad: dataForm.cantidad,
                            fecha: dataForm.fecha
                        }
                    },
                    refetchQueries: [{ query: OBTENER_LLUVIAS }, { query: OBTENER_PLUVIOMETROS_Y_LLUVIAS }]
                });
            }

            setOpenModalLluvia(false);
            setMessageType('success');
            setInfoMessage(`La lluvia se ${type === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
            setShowMessage(true);
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
        <form onSubmit={handleSubmit(submitLluvia)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <TextField
                        label="Cantidad"
                        fullWidth
                        {...register('cantidad')}
                        error={!!errors.cantidad}
                        helperText={errors.cantidad?.message}
                        onKeyDown={handleKeyDownNumber}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha de lluvia"
                            onChange={(value) => {
                                const newValue = dayjs(value as any).format('YYYY-MM-DD');
                                setValue('fecha', newValue);
                            }}
                            format="DD/MM/YYYY"
                            defaultValue={type === 'update' ? dayjs(lluvia?.fecha, 'YYYY-MM-DD') : undefined}
                            sx={{ mb: 2 }}
                        />
                    </LocalizationProvider>
                </Grid2>
                <Grid2 size={12} display={'flex'} gap={3} justifyContent={'center'}>
                    <Button variant="contained" color="primary" type="submit">
                        {submitting ? <Loading /> : type === 'create' ? 'Registrar' : 'Actualizar'}
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setOpenModalLluvia(false)}>
                        Cancelar
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default LluviaRegister;
