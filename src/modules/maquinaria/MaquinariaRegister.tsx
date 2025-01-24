import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Loading from '@components/Loading';
import { OBTENER_MAQUINARIAS } from '@graphql/queries';
import { MaquinariaContext } from 'src/context/maquinaria/MaquinariaContext';
import { FormDataMaquinaria, GetMaquinariaRegisterResponse, GetMaquinariaUpdateResponse } from '@interfaces/maquinaria';
import { ACTUALIZAR_MAQUINARIA, REGISTRAR_MAQUINARIA } from '@graphql/mutations';
import { handleKeyDownNumber } from '@utils/validations';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const schema = yup.object({
    marca: yup.string().required('La marca es requerida.'),
    serie: yup.string().required('La serie es requerida.'),
    modelo: yup.number().required('El modelo es obligatorio.').typeError('El modelo debe ser numérico.'),
    potencia: yup.number().required('La potencia es obligatoria.').typeError('El modelo debe ser numérico.'),
    color: yup.string().required('El color es requerido.')
});

interface Props {}

const MaquinariaRegister: React.FC<Props> = ({}) => {
    const { setOpenModal, maquinariaEdit, type } = useContext(MaquinariaContext);
    const { setShowMessage, setInfoMessage, setMessageType } = useContext(CultivosContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormDataMaquinaria>({
        resolver: yupResolver(schema),
        defaultValues: {
            marca: type === 'update' ? maquinariaEdit?.marca : '',
            serie: type === 'update' ? maquinariaEdit?.serie : '',
            modelo: type === 'update' ? maquinariaEdit?.modelo : undefined,
            potencia: type === 'update' ? maquinariaEdit?.potencia : undefined,
            color: type === 'update' ? maquinariaEdit?.color : ''
        }
    });
    const [agregarMaquinaria] = useMutation<GetMaquinariaRegisterResponse>(REGISTRAR_MAQUINARIA);
    const [actualizarMaquinaria] = useMutation<GetMaquinariaUpdateResponse>(ACTUALIZAR_MAQUINARIA);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitMaquinaria = async (dataForm: FormDataMaquinaria) => {
        setSubmitting(true);

        try {
            if (type === 'create') {
                await agregarMaquinaria({
                    variables: {
                        createMaquinariaInput: dataForm
                    },
                    refetchQueries: [{ query: OBTENER_MAQUINARIAS }]
                });
            } else {
                await actualizarMaquinaria({
                    variables: {
                        updateMaquinariaInput: {
                            ...dataForm,
                            idMaquinaria: maquinariaEdit?.idMaquinaria
                        }
                    },
                    refetchQueries: [{ query: OBTENER_MAQUINARIAS }]
                });
            }

            setMessageType('success');
            setInfoMessage(`La maquinaria se ${type === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
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
        <form className="mt-5" onSubmit={handleSubmit(submitMaquinaria)} style={{ height: '90%' }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('marca')}
                        label="Marca"
                        error={!!errors.marca}
                        helperText={errors.marca?.message}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('serie')}
                        label="Serie"
                        error={!!errors.serie}
                        helperText={errors.serie?.message}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('modelo')}
                        label="Modelo"
                        error={!!errors.modelo}
                        helperText={errors.modelo?.message}
                        onKeyDown={handleKeyDownNumber}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('potencia')}
                        label="Potencia"
                        error={!!errors.potencia}
                        helperText={errors.potencia?.message}
                        onKeyDown={handleKeyDownNumber}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('color')}
                        label="Color"
                        error={!!errors.color}
                        helperText={errors.color?.message}
                    />
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="center" gap={4} mt={3} mb={2}>
                    <Button
                        disabled={submitting}
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
                    >
                        {submitting ? <Loading /> : type === 'create' ? 'Registrar' : 'Actualizar'}
                    </Button>
                    <Button
                        onClick={() => {
                            reset();
                            setOpenModal(false);
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

export default MaquinariaRegister;
