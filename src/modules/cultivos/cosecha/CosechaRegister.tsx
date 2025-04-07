import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Button, Grid2, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Loading from '@components/Loading';
import { FormDataCosecha, GetCosechaRegister, GetCosechaUpdate } from '@interfaces/cultivos/cosechas';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { handleKeyDownNumber } from '@utils/validations';
import { ACTUALIZAR_COSECHA, REGISTRAR_COSECHA } from '@graphql/mutations';
import { OBTENER_COSECHA_CORTE } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

const schema = yup.object({
    peso: yup.number().required('El peso es requerido.').typeError('El peso es requerido.'),
    rendimiento: yup.number().optional(),
    numeroVagones: yup.number().optional(),
    numeroMulas: yup.number().optional(),
    nota: yup.string().optional()
});

interface Props {}

const CosechaRegister: React.FC<Props> = () => {
    const { corte } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const { formType, cosechaEdit, setInfoMessage, setShowMessage, setMessageType, setOpenModalForms, setValidateCosecha } =
        useContext(CultivosContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormDataCosecha>({
        resolver: yupResolver(schema),
        defaultValues: {
            peso: formType === 'create' ? undefined : cosechaEdit?.peso,
            rendimiento: formType === 'create' ? undefined : cosechaEdit?.rendimiento,
            numeroVagones: formType === 'create' ? undefined : cosechaEdit?.numeroVagones,
            numeroMulas: formType === 'create' ? undefined : cosechaEdit?.numeroMulas,
            nota: formType === 'create' ? '' : cosechaEdit?.nota
        }
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [agregarCosecha] = useMutation<GetCosechaRegister>(REGISTRAR_COSECHA);
    const [actualizarCosecha] = useMutation<GetCosechaUpdate>(ACTUALIZAR_COSECHA);

    const submitForm = async (formData: FormDataCosecha) => {
        setSubmitting(true);

        try {
            if (formType === 'create') {
                await agregarCosecha({
                    variables: {
                        createCosechaInput: {
                            peso: formData.peso,
                            rendimiento: formData.rendimiento,
                            numeroMulas: formData.numeroMulas,
                            numeroVagones: formData.numeroVagones,
                            nota: formData.nota,
                            corte_id: corte.id_corte
                        }
                    },
                    refetchQueries: [{ query: OBTENER_COSECHA_CORTE, variables: { idCorte: corte.id_corte } }]
                });
            } else {
                await actualizarCosecha({
                    variables: {
                        updateCosechaInput: {
                            id_cosecha: cosechaEdit?.id_cosecha,
                            peso: formData.peso,
                            rendimiento: formData.rendimiento,
                            numeroMulas: formData.numeroMulas,
                            numeroVagones: formData.numeroVagones,
                            nota: formData.nota,
                            corte_id: corte.id_corte
                        }
                    },
                    refetchQueries: [{ query: OBTENER_COSECHA_CORTE, variables: { idCorte: corte.id_corte } }]
                });
            }

            setMessageType('success');
            setInfoMessage(`La cosecha se ${formType === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
            setShowMessage(true);
            setOpenModalForms(false);
            if (formType === 'create') return setValidateCosecha(true);
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
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Peso"
                        {...register('peso')}
                        error={!!errors.peso}
                        helperText={errors.peso?.message}
                        onKeyDown={handleKeyDownNumber}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Rendimiento"
                        {...register('rendimiento')}
                        onKeyDown={handleKeyDownNumber}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="# Vagones"
                        {...register('numeroVagones')}
                        onKeyDown={handleKeyDownNumber}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="# Mulas"
                        {...register('numeroMulas')}
                        onKeyDown={handleKeyDownNumber}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField fullWidth size="small" type="text" label="Nota" {...register('nota')} />
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="center" gap={3} mt={2}>
                    <Button color="primary" variant="contained" type="submit" disabled={submitting}>
                        {submitting ? <Loading /> : formType === 'create' ? 'Registrar' : 'Actualizar'}
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

export default CosechaRegister;
