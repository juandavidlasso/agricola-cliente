import React, { useContext, useState } from 'react';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import {
    Button,
    Checkbox,
    FormControl,
    Grid2,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormPluviometro, GetPluviometroRegister } from '@interfaces/pluviometros';
import { GetSuertesRenovadasResponse } from '@interfaces/cultivos/suerte';
import { OBTENER_PLUVIOMETROS_Y_LLUVIAS, OBTENER_SUERTES_RENOVADAS } from '@graphql/queries';
import ModalLoading from '@components/Modal';
import Alert from '@components/Alert';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { REGISTRAR_PLUVIOMETRO } from '@graphql/mutations';
import Loading from '@components/Loading';
import { handleKeyDownNumber } from '@utils/validations';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

const schema = yup.object({
    nombre: yup.number().required('El nombre es requerido').typeError('El nombre es requerido'),
    suertesAsociadas: yup.array().min(1, 'Debe seleccionar al menos una suerte').required('Debe seleccionar al menos una suerte')
});

interface Props {}

const PluviometroRegister: React.FC<Props> = ({}) => {
    const [suerteNames, setSuerteNames] = useState<string[]>([]);
    const [errorSuertes, setErrorSuertes] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { setOpenModal } = useContext(PluviometroContext);
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const { data, loading, error } = useQuery<GetSuertesRenovadasResponse>(OBTENER_SUERTES_RENOVADAS);
    const [agregarPluviometro] = useMutation<GetPluviometroRegister>(REGISTRAR_PLUVIOMETRO);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<FormPluviometro>({
        resolver: yupResolver(schema),
        defaultValues: {
            nombre: undefined,
            suertesAsociadas: ['']
        }
    });

    if (error) return <Alert message={error.message} />;
    if (loading) return <ModalLoading isOpen={loading} />;

    const handleChange = (event: SelectChangeEvent<typeof suerteNames>) => {
        const {
            target: { value }
        } = event;
        setSuerteNames(typeof value === 'string' ? value.split(',') : value);
        if (errorSuertes) {
            setErrorSuertes(false);
        }
    };

    const submitPluviometro = async (dataForm: FormPluviometro) => {
        if (suerteNames.length === 0) return setErrorSuertes(true);
        setSubmitting(true);
        const listSuertes = suerteNames.join('-');

        try {
            await agregarPluviometro({
                variables: {
                    createPluviometroInput: {
                        nombre: dataForm.nombre,
                        suertesAsociadas: listSuertes
                    }
                },
                refetchQueries: [
                    {
                        query: OBTENER_PLUVIOMETROS_Y_LLUVIAS,
                        variables: {
                            filterLluviasInput: {
                                month: new Date().getFullYear(),
                                year: new Date().getMonth() + 1
                            }
                        }
                    }
                ]
            });

            setMessageType('success');
            setInfoMessage('El pluviómetro se registro exitosamente.');
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
        <form onSubmit={handleSubmit(submitPluviometro)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        label="Número"
                        {...register('nombre')}
                        helperText={errors.nombre?.message}
                        error={!!errors.nombre}
                        onKeyDown={handleKeyDownNumber}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <FormControl
                        fullWidth
                        sx={{
                            label: {
                                color: errorSuertes ? '#d32f2f !important' : 'rgba(0, 0, 0, 0.6) !important'
                            },
                            fieldset: {
                                border: errorSuertes ? '1px solid #d32f2f !important' : '1px solid rgba(0, 0, 0, 0.23) !important'
                            }
                        }}
                    >
                        <InputLabel shrink={true} id="demo-multiple-checkbox-label">
                            Seleccione la(s) suerte(s)
                        </InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={suerteNames}
                            onChange={handleChange}
                            input={<OutlinedInput notched label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {data?.obtenerSuertesRenovadas.length !== 0 &&
                                data?.obtenerSuertesRenovadas.map((suerte) => (
                                    <MenuItem key={suerte.id_suerte} value={suerte.nombre}>
                                        <Checkbox
                                            checked={suerteNames.includes(suerte.nombre)}
                                            sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                        />
                                        <ListItemText primary={suerte.nombre} />
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    {errorSuertes ? (
                        <Typography
                            sx={{
                                color: '#d32f2f',
                                fontSize: '0.75rem',
                                fontWeight: 400,
                                lineHeight: 1.66,
                                textAlign: 'left',
                                mt: '3px',
                                ml: '14px'
                            }}
                        >
                            {'Debe seleccionar al menos una suerte'}
                        </Typography>
                    ) : null}
                </Grid2>
                <Grid2 size={12} display={'flex'} gap={3} justifyContent={'center'}>
                    <Button variant="contained" color="primary" type="submit">
                        {submitting ? <Loading /> : 'Registrar'}
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setOpenModal(false)}>
                        Cancelar
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default PluviometroRegister;
