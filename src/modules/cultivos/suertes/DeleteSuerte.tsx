import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import Loading from '@components/Loading';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { GetEliminarSuerteResponse } from '@interfaces/cultivos/suerte';
import { ELIMINAR_SUERTE } from '@graphql/mutations';
import { AlertType } from '@interfaces/alerts';
import { OBTENER_SUERTES_RENOVADAS } from '@graphql/queries';

interface Props {
    handleClose: () => void;
    setMessageType: React.Dispatch<React.SetStateAction<AlertType>>;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteSuerte: React.FC<Props> = ({ handleClose, setMessageType, setInfoMessage, setShowMessage }) => {
    const router = useRouter();
    const { id_suerte, nombre } = useAppSelector((state: IRootState) => state.cultivosReducer.suerte);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [eliminarSuerte] = useMutation<GetEliminarSuerteResponse>(ELIMINAR_SUERTE);

    const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { data } = await eliminarSuerte({
                variables: {
                    idSuerte: id_suerte
                },
                refetchQueries: [{ query: OBTENER_SUERTES_RENOVADAS }]
            });

            if (data?.eliminarSuerte) {
                setMessageType('success');
                setInfoMessage('La suerte se eliminó exitosamente.');
                setShowMessage(true);
                setSubmitting(false);
                handleClose();
                router.replace('/suerte');
                return;
            }

            setMessageType('error');
            setInfoMessage('No se pudo eliminar la suerte, intente nuevamente en un momento.');
            setShowMessage(true);
            setSubmitting(false);
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
        <Grid2 container spacing={2}>
            <Grid2 size={12} marginBottom={3}>
                <Typography color="text.primary" sx={{ marginBottom: 1 }}>
                    ¿Realmente desea eliminar la suerte?
                </Typography>
                <Typography color="error">Esta acción eliminará la suerte y todos los datos asociados a ella.</Typography>
                <Typography color="text.primary" className="!text-center !font-bold" mt={2}>
                    Suerte {nombre}
                </Typography>
            </Grid2>
            <Grid2 size={12} display="flex" justifyContent="center" gap={4}>
                <Button
                    disabled={submitting}
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}
                    onClick={(e) => submitForm(e)}
                >
                    {submitting ? <Loading /> : 'Eliminar'}
                </Button>
                <Button onClick={() => handleClose()} color="primary" variant="contained" sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}>
                    Cancelar
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default DeleteSuerte;
