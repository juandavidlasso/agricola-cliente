import React, { ChangeEvent, useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CultivosContext } from '@context/cultivos/CultivosContext';
import { INote, INoteForm, NoteRegisterResponse, NoteUpdateResponse } from '@interfaces/notes';
import Loading from '@components/Loading';
import { ACTUALIZAR_NOTA, AGREGAR_NOTA } from '@graphql/mutations';
import { OBTENER_NOTAS } from '@graphql/queries';

const schema = yup.object({
    date: yup.string().required('La fecha es requerida'),
    description: yup.string().required('La descripción es requerida'),
    cost: yup.string().optional()
});

interface Props {
    noteEdit: INote | undefined;
    formType: 'register' | 'update';
    handleClose: () => void;
}

const NoteRegister: React.FC<Props> = ({ noteEdit, formType, handleClose }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<INoteForm>({
        resolver: yupResolver(schema),
        values: {
            date: formType === 'register' ? '' : (noteEdit?.date as string),
            description: formType === 'register' ? '' : (noteEdit?.description as string),
            cost: formType === 'register' ? '' : (noteEdit?.cost as string)
        }
    });
    const [agregarNota] = useMutation<NoteRegisterResponse>(AGREGAR_NOTA);
    const [actualizarNota] = useMutation<NoteUpdateResponse>(ACTUALIZAR_NOTA);
    //
    const { setInfoMessage, setMessageType, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitSuerte = async (dataForm: INoteForm) => {
        const { date, description, cost } = dataForm;
        setSubmitting(true);

        try {
            if (formType === 'register') {
                await agregarNota({
                    variables: {
                        createNoteInput: {
                            date,
                            description,
                            cost: Number(cost)
                        }
                    },
                    refetchQueries: [{ query: OBTENER_NOTAS }]
                });
            } else {
                await actualizarNota({
                    variables: {
                        updateNoteInput: {
                            id_note: noteEdit?.id_note,
                            date,
                            description,
                            cost: Number(cost)
                        }
                    },
                    refetchQueries: [{ query: OBTENER_NOTAS }]
                });
            }

            setMessageType('success');
            setInfoMessage(`La nota se ${formType === 'register' ? 'registro' : 'actualizo'} exitosamente.`);
            setShowMessage(true);
            reset();
            setValue('date', '');
            setSubmitting(false);
            if (formType === 'update') handleClose();
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
        <form className="mt-5" onSubmit={handleSubmit(submitSuerte)} style={{ height: '90%' }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha"
                            onChange={(value) => {
                                const newValue = dayjs(value as any).format('YYYY-MM-DD');
                                setValue('date', newValue);
                            }}
                            format="DD/MM/YYYY"
                            defaultValue={formType === 'update' ? dayjs(noteEdit?.date, 'YYYY-MM-DD') : undefined}
                        />
                    </LocalizationProvider>
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('description')}
                        label="Descripción"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        {...register('cost')}
                        label="Costo"
                        error={!!errors.cost}
                        helperText={errors.cost?.message}
                        onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                            const value = event.target.value;
                            const formatValue = value.replace(/[^0-9]/g, '');
                            setValue('cost', formatValue);
                        }}
                    />
                </Grid2>
                <Grid2 size={12} display="flex" justifyContent="center" gap={4} mt={3}>
                    <Button
                        disabled={submitting}
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
                    >
                        {submitting ? <Loading /> : formType === 'register' ? 'Registrar' : 'Actualizar'}
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

export default NoteRegister;
