import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Card, CardContent, Grid2, Typography, TextField, Button } from '@mui/material';
import Loading from '@components/Loading';
import { ThemeProps } from '@interfaces/theme';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import { FormDataRegister, UserRegisterResponse } from '@interfaces/user';
import { USER_REGISTER } from '@graphql/mutations';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    apellido: yup.string().required('El apellido es requerido'),
    email: yup.string().required('El email es requerido').email('El email no tiene el formato correcto'),
    password: yup.string().required('La contraseña es requerida')
});

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const RegisterView: React.FC<Props> = ({ toogleTheme }) => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [crearUsuario] = useMutation<UserRegisterResponse>(USER_REGISTER);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormDataRegister>({
        resolver: yupResolver(schema)
    });

    const submitUser = async (dataForm: FormDataRegister) => {
        const { nombre, apellido, email, password } = dataForm;
        setSubmitting(true);

        try {
            await crearUsuario({
                variables: {
                    createUsuarioInput: {
                        nombre,
                        apellido,
                        email,
                        password
                    }
                }
            });

            setMessageType('success');
            setInfoMessage('Se ha registrado exitosamente. Ahora puede iniciar sesión');
            setShowMessage(true);
            setSubmitting(false);
            reset();
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
        <Layout toogleTheme={toogleTheme} navItems={routesCultivos}>
            <form onSubmit={handleSubmit(submitUser)}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Card sx={{ width: '40%', pl: 4, pr: 4, pt: 2 }}>
                        <CardContent sx={{ padding: 0 }}>
                            <Grid2 container display="block" justifyContent="center">
                                <Grid2 size={12} sx={{ margin: 'auto', pt: 2, pb: 2 }}>
                                    <Typography variant="h4" component="h4" color="text.primary" className="text-center">
                                        Registrar Usuario
                                    </Typography>
                                </Grid2>
                                <Grid2 size={12} sx={{ margin: 'auto', padding: 2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="text"
                                        label="Nombre"
                                        {...register('nombre')}
                                        error={!!errors.nombre}
                                        helperText={errors.nombre?.message}
                                    />
                                </Grid2>
                                <Grid2 size={12} sx={{ margin: 'auto', padding: 2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="text"
                                        label="Apellido"
                                        {...register('apellido')}
                                        error={!!errors.apellido}
                                        helperText={errors.apellido?.message}
                                    />
                                </Grid2>
                                <Grid2 size={12} sx={{ margin: 'auto', padding: 2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="email"
                                        label="Email"
                                        {...register('email')}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Grid2>
                                <Grid2 size={12} sx={{ margin: 'auto', padding: 2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="password"
                                        label="Contraseña"
                                        {...register('password')}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                </Grid2>
                                <Grid2 size={12} sx={{ margin: 'auto', padding: 2 }} className="text-center">
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        sx={{ mb: 2, height: '44px' }}
                                        disabled={submitting}
                                    >
                                        {submitting ? <Loading /> : 'Registrar usuario'}
                                    </Button>
                                </Grid2>
                            </Grid2>
                        </CardContent>
                    </Card>
                </Box>
            </form>
        </Layout>
    );
};

export default RegisterView;
