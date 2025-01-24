import { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { ACTUALIZAR_CORTE } from '@graphql/mutations';
import { GetActualizarCorteResponse } from '@interfaces/cultivos/cortes';
import { OBTENER_CORTE, OBTENER_CORTES_RENOVADOS } from '@graphql/queries';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

export const useCorte = () => {
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [actualizarCorte] = useMutation<GetActualizarCorteResponse>(ACTUALIZAR_CORTE);
    const { nombre } = useAppSelector((state: IRootState) => state.cultivosReducer.suerte);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);

    const submitForm = async (id_corte: number, handleClose: () => void) => {
        setSubmitting(true);

        try {
            await actualizarCorte({
                variables: {
                    updateCorteInput: {
                        id_corte,
                        estado: false
                    }
                },
                refetchQueries: [
                    { query: OBTENER_CORTE, variables: { idCorte: id_corte } },
                    { query: OBTENER_CORTES_RENOVADOS, variables: { nombre } }
                ]
            });
            setMessageType('success');
            setInfoMessage('El corte se cerro exitosamente.');
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

    return {
        submitting,
        submitForm
    };
};
