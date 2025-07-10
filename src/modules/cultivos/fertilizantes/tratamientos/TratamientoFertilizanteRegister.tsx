import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    FormDataTratamientoFertilizante,
    GetTratamientoFertilizanteRegister,
    GetTratamientoFertilizanteUpdate,
    TratamientoFertilizante
} from '@interfaces/cultivos/fertilizantes/tratamientos';
import { ACTUALIZAR_TRATAMIENTO_FERTILIZANTE, REGISTRAR_TRATAMIENTO_FERTILIZANTE } from '@graphql/mutations';
import { OBTENER_APLICACIONES_FERTILIZANTES, OBTENER_APLICACIONES_FERTILIZANTES_CORTE } from '@graphql/queries';
import { handleKeyDownLetter, handleKeyDownLetterAndNumber, handleKeyDownNumber } from '@utils/validations';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { AplicacionesFertilizantes } from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

const schema = yup.object({
    producto: yup.string().required('El producto es requerido.'),
    dosis: yup
        .number()
        .required('La dosis es obligatoria')
        .typeError('La dosis debe ser numérica.')
        .positive('La dosis debe ser positiva.'),
    presentacion: yup.string().required('La presentación es requerida.'),
    valor: yup.number().optional(),
    aplico: yup.string().optional(),
    nota: yup.string().optional()
});

interface Props {
    handleClose: () => void;
    tratamientoFertilizante: TratamientoFertilizante;
    aplicacionFertilizanteEdit: AplicacionesFertilizantes;
    formType: 'delete' | 'update' | 'create';
}

const TratamientoFertilizanteRegister: React.FC<Props> = ({
    handleClose,
    tratamientoFertilizante,
    aplicacionFertilizanteEdit,
    formType
}) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const [agregarTratamientoFertilizante] = useMutation<GetTratamientoFertilizanteRegister>(REGISTRAR_TRATAMIENTO_FERTILIZANTE);
    const [actualizarTratamientoFertilizante] = useMutation<GetTratamientoFertilizanteUpdate>(
        ACTUALIZAR_TRATAMIENTO_FERTILIZANTE
    );
    const [submitting, setSubmitting] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormDataTratamientoFertilizante>({
        resolver: yupResolver(schema),
        defaultValues: {
            producto: formType === 'create' ? '' : tratamientoFertilizante?.producto,
            dosis: formType === 'create' ? undefined : tratamientoFertilizante?.dosis,
            presentacion: formType === 'create' ? '' : tratamientoFertilizante?.presentacion,
            valor: formType === 'create' ? undefined : tratamientoFertilizante?.valor,
            aplico: formType === 'create' ? '' : tratamientoFertilizante?.aplico,
            nota: formType === 'create' ? '' : tratamientoFertilizante?.nota
        }
    });

    const submitTratamientoHerbicida = async (data: FormDataTratamientoFertilizante) => {
        setSubmitting(true);
        try {
            if (formType === 'create') {
                await agregarTratamientoFertilizante({
                    variables: {
                        createTratamientoFertilizanteInput: {
                            ...data,
                            apfe_id: aplicacionFertilizanteEdit?.aplicacionFertilizante?.id_apfe
                        }
                    },
                    refetchQueries: [
                        {
                            query: OBTENER_APLICACIONES_FERTILIZANTES
                        },
                        { query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE, variables: { corteId: id_corte } }
                    ]
                });
            } else {
                await actualizarTratamientoFertilizante({
                    variables: {
                        updateTratamientoFertilizanteInput: {
                            ...data,
                            id_trafe: tratamientoFertilizante?.id_trafe,
                            apfe_id: aplicacionFertilizanteEdit?.aplicacionFertilizante?.id_apfe
                        }
                    },
                    refetchQueries: [
                        {
                            query: OBTENER_APLICACIONES_FERTILIZANTES
                        },
                        { query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE, variables: { corteId: id_corte } }
                    ]
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
        <form onSubmit={handleSubmit(submitTratamientoHerbicida)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Producto"
                        {...register('producto')}
                        onKeyDown={handleKeyDownLetterAndNumber}
                        helperText={errors.producto?.message}
                        error={!!errors.producto}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Dosis"
                        {...register('dosis')}
                        onKeyDown={handleKeyDownNumber}
                        helperText={errors.dosis?.message ?? '(Ej: 5 - 20 - 0.34)'}
                        error={!!errors.dosis}
                        sx={{
                            '& .MuiFormHelperText-root': {
                                color: errors.dosis ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)'
                            }
                        }}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Presentación"
                        {...register('presentacion')}
                        onKeyDown={handleKeyDownLetter}
                        helperText={errors.presentacion?.message ?? '(Ej: BTO - KL - LT)'}
                        error={!!errors.presentacion}
                        sx={{
                            '& .MuiFormHelperText-root': {
                                color: errors.dosis ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)'
                            }
                        }}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Valor"
                        {...register('valor')}
                        onKeyDown={handleKeyDownNumber}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        type="text"
                        label="Realizado por"
                        {...register('aplico')}
                        onKeyDown={handleKeyDownLetter}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField fullWidth size="small" type="text" label="Nota" {...register('nota')} />
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

export default TratamientoFertilizanteRegister;
