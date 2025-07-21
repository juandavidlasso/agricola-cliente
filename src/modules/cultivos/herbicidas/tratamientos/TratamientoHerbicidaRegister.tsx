import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Button, Grid2, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    FormDataTratamientoHerbicidas,
    GetTratamientoHerbicidaRegister,
    GetTratamientoHerbicidaUpdate,
    TratamientoHerbicidas
} from '@interfaces/cultivos/herbicidas/tratamientos';
import Loading from '@components/Loading';
import { ACTUALIZAR_TRATAMIENTO_HERBICIDA, REGISTRAR_TRATAMIENTO_HERBICIDA } from '@graphql/mutations';
import { OBTENER_APLICACIONES_HERBICIDAS, OBTENER_APLICACIONES_HERBICIDAS_CORTE } from '@graphql/queries';
import { handleKeyDownLetter, handleKeyDownNumber } from '@utils/validations';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
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
    tratamientoHerbicida: TratamientoHerbicidas;
    idHerbicida: number | undefined;
    handleClose: () => void;
    formType: 'delete' | 'update' | 'create' | 'duplicate';
}

const TratamientoHerbicidaRegister: React.FC<Props> = ({ tratamientoHerbicida, idHerbicida, handleClose, formType }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const [agregarTratamientoHerbicida] = useMutation<GetTratamientoHerbicidaRegister>(REGISTRAR_TRATAMIENTO_HERBICIDA);
    const [actualizarTratamientoHerbicida] = useMutation<GetTratamientoHerbicidaUpdate>(ACTUALIZAR_TRATAMIENTO_HERBICIDA);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormDataTratamientoHerbicidas>({
        resolver: yupResolver(schema),
        defaultValues: {
            producto: formType === 'create' ? '' : tratamientoHerbicida?.producto,
            dosis: formType === 'create' ? undefined : tratamientoHerbicida?.dosis,
            presentacion: formType === 'create' ? '' : tratamientoHerbicida?.presentacion,
            valor: formType === 'create' ? undefined : tratamientoHerbicida?.valor,
            aplico: formType === 'create' ? '' : tratamientoHerbicida?.aplico,
            nota: formType === 'create' ? '' : tratamientoHerbicida?.nota
        }
    });

    const submitTratamientoHerbicida = async (data: FormDataTratamientoHerbicidas) => {
        setSubmitting(true);
        try {
            if (formType === 'create') {
                await agregarTratamientoHerbicida({
                    variables: {
                        createTratamientoHerbicidaInput: {
                            ...data,
                            aphe_id: idHerbicida
                        }
                    },
                    refetchQueries: [
                        { query: OBTENER_APLICACIONES_HERBICIDAS },
                        { query: OBTENER_APLICACIONES_HERBICIDAS_CORTE, variables: { corteId: id_corte } }
                    ]
                });
            } else {
                await actualizarTratamientoHerbicida({
                    variables: {
                        updateTratamientoHerbicidaInput: {
                            ...data,
                            id_trahe: tratamientoHerbicida?.id_trahe,
                            aphe_id: idHerbicida
                        }
                    },
                    refetchQueries: [
                        { query: OBTENER_APLICACIONES_HERBICIDAS },
                        { query: OBTENER_APLICACIONES_HERBICIDAS_CORTE, variables: { corteId: id_corte } }
                    ]
                });
            }

            setMessageType('success');
            setInfoMessage(`El tratamiento se ${formType === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
            setShowMessage(true);
            reset();
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
                        onKeyDown={handleKeyDownLetter}
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

export default TratamientoHerbicidaRegister;
