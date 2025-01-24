import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApolloError, useQuery, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Card, CardContent, Grid2, TextField, Typography } from '@mui/material';
import { ThemeProps } from '@interfaces/theme';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import { FormDataUpdate, GetUsuarioResponse, UpdateUserResponse } from '@interfaces/user';
import { GET_USER } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import ModalLoading from '@components/Modal';
import Alert from '@components/Alert';
import Loading from '@components/Loading';
import { UPDATE_USER } from '@graphql/mutations';
import useAppDispatch from '@hooks/useAppDispatch';
import { saveUser } from '@store/user/actions';
import { useRouter } from 'next/router';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    apellido: yup.string().required('El apellido es requerido'),
    email: yup.string().required('El email es requerido').email('El email no tiene el formato correcto'),
    password: yup.string().nullable()
});

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const AccountView: React.FC<Props> = ({ toogleTheme }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user } = useAppSelector((state: IRootState) => state.userReducer);
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { data, loading, error } = useQuery<GetUsuarioResponse>(GET_USER, {
        variables: { idUsuario: user.id_usuario }
    });
    const [actualizarUsuario] = useMutation<UpdateUserResponse>(UPDATE_USER);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataUpdate>({
        resolver: yupResolver(schema),
        values: {
            nombre: data?.obtenerUsuario.nombre || '',
            apellido: data?.obtenerUsuario.apellido || '',
            email: data?.obtenerUsuario.email || '',
            password: ''
        }
    });

    if (error) return <Alert message={error.message} />;

    const submitUser = async (dataForm: FormDataUpdate) => {
        const { nombre, apellido, email, password } = dataForm;
        setSubmitting(true);

        const updateUsuarioInput = password
            ? {
                  id_usuario: user.id_usuario,
                  nombre,
                  apellido,
                  email,
                  password
              }
            : {
                  id_usuario: user.id_usuario,
                  nombre,
                  apellido,
                  email
              };

        try {
            const { data } = await actualizarUsuario({
                variables: {
                    updateUsuarioInput
                },
                refetchQueries: [{ query: GET_USER, variables: { idUsuario: user.id_usuario } }]
            });

            dispatch(
                saveUser({
                    id_usuario: data?.actualizarUsuario.id_usuario!,
                    nombre: data?.actualizarUsuario.nombre!,
                    apellido: data?.actualizarUsuario.apellido!,
                    email: data?.actualizarUsuario.email!,
                    rol: data?.actualizarUsuario.rol!
                })
            );

            setMessageType('success');
            setInfoMessage('Sus datos se actualizaron exitosamente. Por seguridad deberá volver a iniciar sesión.');
            setShowMessage(true);
            setTimeout(() => {
                sessionStorage.clear();
                router.replace('/user/login');
            }, 4000);
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
        <>
            <ModalLoading isOpen={loading} />
            <Layout toogleTheme={toogleTheme} navItems={routesCultivos}>
                <form onSubmit={handleSubmit(submitUser)}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Card sx={{ width: '40%', pl: 4, pr: 4, pt: 2 }}>
                            <CardContent sx={{ padding: 0 }}>
                                <Grid2 container display="block" justifyContent="center">
                                    <Grid2 size={12} sx={{ margin: 'auto', pt: 2, pb: 2 }}>
                                        <Typography variant="h4" component="h4" color="text.primary" className="text-center">
                                            Actualiza tus datos
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size={12} sx={{ margin: 'auto', padding: 2 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="text"
                                            label="Nombre"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
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
                                            InputLabelProps={{
                                                shrink: true
                                            }}
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
                                            InputLabelProps={{
                                                shrink: true
                                            }}
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
                                            {submitting ? <Loading /> : 'Actualizar'}
                                        </Button>
                                    </Grid2>
                                </Grid2>
                            </CardContent>
                        </Card>
                    </Box>
                </form>
            </Layout>
        </>
    );
};

export default AccountView;
