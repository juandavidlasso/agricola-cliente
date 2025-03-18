import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Card, CardActions, CardContent, Grid2, TextField } from '@mui/material';
import { FormDataLogin, UserLoginResponse } from '@interfaces/user';
import { USER_LOGIN } from '@graphql/mutations';
import Loading from '@components/Loading';
import { useRouter } from 'next/router';
import useAppDispatch from '@hooks/useAppDispatch';
import { saveUser } from '@store/user/actions';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const schema = yup.object({
    email: yup.string().required('El email es requerido').email('El email no tiene el formato correcto'),
    password: yup.string().required('La contraseña es requerida')
});

const LoginView: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataLogin>({
        resolver: yupResolver(schema)
    });

    const [autenticarUsuario] = useMutation<UserLoginResponse>(USER_LOGIN);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitForm = async (data: FormDataLogin) => {
        setSubmitting(true);
        const { email, password } = data;

        try {
            const { data } = await autenticarUsuario({
                variables: {
                    authInput: {
                        email,
                        password
                    }
                }
            });

            sessionStorage.setItem('token', data?.autenticarUsuario.token || '');
            dispatch(saveUser(data?.autenticarUsuario.user!));
            router.replace('/user/profile');
        } catch (error: any) {
            setMessageType('error');
            setInfoMessage(error.message.replace('Error:', ''));
            setShowMessage(true);
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <Box className="flex justify-center items-center w-full min-h-screen">
                <Grid2 container spacing={2} className="!w-full !flex !justify-center">
                    <Grid2 size={12} display="flex" justifyContent="center" alignItems="center" className="!w-1/3 max-lg:!w-[90%]">
                        <Card className="p-2 w-full text-center rounded-2xl" style={{ boxShadow: '1px 1px 5px 3px #cbd5e1' }}>
                            <CardContent sx={{ mt: 0 }}>
                                <Grid2 size={12}>
                                    <Image
                                        src="/logo.png"
                                        alt="Logo"
                                        width={150}
                                        height={150}
                                        className="mx-auto mb-5"
                                        priority
                                        style={{ width: '200px', height: '200px' }}
                                    />
                                </Grid2>
                                <Grid2 size={12} marginBottom={4}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        {...register('email')}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        placeholder="Email"
                                    />
                                </Grid2>
                                <Grid2 size={12}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        type="password"
                                        label="Contraseña"
                                        {...register('password')}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                </Grid2>
                            </CardContent>

                            <CardActions
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: 3,
                                    marginTop: 1,
                                    flexDirection: 'column'
                                }}
                            >
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    sx={{ mb: 2, height: '44px' }}
                                    fullWidth
                                    disabled={submitting}
                                >
                                    {submitting ? <Loading /> : 'Iniciar Sesion'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                </Grid2>
            </Box>
        </form>
    );
};

export default LoginView;
