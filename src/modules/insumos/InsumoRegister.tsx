import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import Loading from '@components/Loading';
import { FormDataInsumo, GetInsumoRegister, GetInsumoUpdate, Insumo } from '@interfaces/insumos';
import { ACTUALIZAR_INSUMO, REGISTRAR_INSUMO } from '@graphql/mutations';
import { OBTENER_INSUMOS } from '@graphql/queries';

const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido.'),
    referencia: yup.string().required('La referencia es requerida.'),
    marca: yup.string().required('La marca es requerida.'),
    cantidad: yup.string().required('La cantidad es requerida.')
});

interface Props {
    insumo: Insumo | undefined;
    formType: 'delete' | 'create' | 'update';
    handleClose: () => void;
}

const InsumoRegister: React.FC<Props> = ({ insumo, formType, handleClose }) => {
    const { setShowMessage, setInfoMessage, setMessageType } = useContext(CultivosContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormDataInsumo>({
        resolver: yupResolver(schema),
        defaultValues: {
            nombre: formType === 'update' ? insumo?.nombre : '',
            referencia: formType === 'update' ? insumo?.referencia : '',
            marca: formType === 'update' ? insumo?.marca : '',
            cantidad: formType === 'update' ? insumo?.cantidad : ''
        }
    });
    const [agregarInsumo] = useMutation<GetInsumoRegister>(REGISTRAR_INSUMO);
    const [actualizarInsumo] = useMutation<GetInsumoUpdate>(ACTUALIZAR_INSUMO);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitMaquinaria = async (dataForm: FormDataInsumo) => {
        setSubmitting(true);

        try {
            if (formType === 'create') {
                await agregarInsumo({
                    variables: {
                        createInsumoInput: dataForm
                    },
                    refetchQueries: [{ query: OBTENER_INSUMOS }]
                });
            } else {
                await actualizarInsumo({
                    variables: {
                        updateInsumoInput: {
                            ...dataForm,
                            idInsumo: insumo?.idInsumo
                        }
                    },
                    refetchQueries: [{ query: OBTENER_INSUMOS }]
                });
            }

            setMessageType('success');
            setInfoMessage(`El insumo se ${formType === 'create' ? 'registro' : 'actualizo'} exitosamente.`);
            setShowMessage(true);
            handleClose();
            return;
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
                        {...register('nombre')}
                        label="Nombre"
                        error={!!errors.nombre}
                        helperText={errors.nombre?.message}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('referencia')}
                        label="Referencia"
                        error={!!errors.referencia}
                        helperText={errors.referencia?.message}
                    />
                </Grid2>
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
                        {...register('cantidad')}
                        label="Cantidad"
                        error={!!errors.cantidad}
                        helperText={errors.cantidad?.message}
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
                        {submitting ? <Loading /> : formType === 'create' ? 'Registrar' : 'Actualizar'}
                    </Button>
                    <Button
                        onClick={() => {
                            reset();
                            handleClose();
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

export default InsumoRegister;
