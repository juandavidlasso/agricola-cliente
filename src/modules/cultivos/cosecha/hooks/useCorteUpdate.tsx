import { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { ACTUALIZAR_CORTE, REGISTRAR_CORTE } from '@graphql/mutations';
import {
    OBTENER_CORTE,
    OBTENER_CORTE_ACTUAL,
    OBTENER_CORTES_POR_SUERTE,
    OBTENER_CORTES_RENOVADOS,
    OBTENER_COSECHA_CORTE
} from '@graphql/queries';
import useAppDispatch from '@hooks/useAppDispatch';
import { saveCorte } from '@store/cultivos/actions';
import { FormDataCorte, GetActualizarCorteResponse, GetRegisterCorte } from '@interfaces/cultivos/cortes';

export const useCorteUpdate = () => {
    const dispatch = useAppDispatch();
    const { corte, suerte } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const { setInfoMessage, setShowMessage, setMessageType, setValidateCosecha } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [step, setStep] = useState<number>(0);
    const [corteId, setCorteId] = useState<number>(0);
    const [agregarCorte] = useMutation<GetRegisterCorte>(REGISTRAR_CORTE);
    const [actualizarCorte] = useMutation<GetActualizarCorteResponse>(ACTUALIZAR_CORTE);

    const submitFormFechaCorte = async (formData: FormDataCorte) => {
        setSubmitting(true);

        try {
            await actualizarCorte({
                variables: {
                    updateCorteInput: {
                        id_corte: corte.id_corte,
                        numero: corte.numero,
                        fecha_inicio: corte.fecha_inicio,
                        fecha_siembra: corte.fecha_siembra,
                        fecha_corte: formData.fecha_corte,
                        activo: false,
                        estado: true,
                        suerte_id: corte.suerte_id
                    }
                },
                refetchQueries: [{ query: OBTENER_CORTE, variables: { idCorte: corte.id_corte } }]
            });

            const { data } = await agregarCorte({
                variables: {
                    createCorteInput: {
                        numero: corte.numero + 1,
                        fecha_inicio: formData.fecha_corte,
                        fecha_siembra: corte.fecha_siembra,
                        activo: true,
                        estado: true,
                        suerte_id: suerte.id_suerte
                    }
                },
                refetchQueries: [
                    { query: OBTENER_CORTES_POR_SUERTE, variables: { idSuerte: suerte.id_suerte } },
                    { query: OBTENER_CORTES_RENOVADOS, variables: { nombre: suerte.nombre } },
                    { query: OBTENER_CORTE_ACTUAL, variables: { idSuerte: suerte.id_suerte } },
                    { query: OBTENER_COSECHA_CORTE, variables: { idCorte: corte.id_corte } }
                ]
            });

            dispatch(
                saveCorte({
                    id_corte: corte.id_corte,
                    numero: corte.numero,
                    fecha_inicio: corte.fecha_inicio,
                    fecha_siembra: corte.fecha_siembra,
                    fecha_corte: formData.fecha_corte,
                    activo: false,
                    estado: true,
                    suerte_id: corte.suerte_id
                })
            );
            setMessageType('success');
            setInfoMessage('La fecha de corte se registro exitosamente.');
            setShowMessage(true);
            //Registrar tablones
            setCorteId(data!.agregarCorte.id_corte);
            setStep(1);
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

    const submitFormPendienteRenovar = async (formData: FormDataCorte) => {
        setSubmitting(true);

        try {
            await actualizarCorte({
                variables: {
                    updateCorteInput: {
                        id_corte: corte.id_corte,
                        numero: corte.numero,
                        fecha_inicio: corte.fecha_inicio,
                        fecha_siembra: corte.fecha_siembra,
                        fecha_corte: formData.fecha_corte,
                        activo: false,
                        estado: true,
                        suerte_id: corte.suerte_id
                    }
                },
                refetchQueries: [
                    { query: OBTENER_CORTE, variables: { idCorte: corte.id_corte } },
                    { query: OBTENER_CORTES_POR_SUERTE, variables: { idSuerte: suerte.id_suerte } },
                    { query: OBTENER_CORTES_RENOVADOS, variables: { nombre: suerte.nombre } },
                    { query: OBTENER_CORTE_ACTUAL, variables: { idSuerte: suerte.id_suerte } },
                    { query: OBTENER_COSECHA_CORTE, variables: { idCorte: corte.id_corte } }
                ]
            });

            setMessageType('success');
            setInfoMessage('La fecha de corte se registro exitosamente.');
            setShowMessage(true);
            setValidateCosecha(false);
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

    const submitFormRenovarSuerte = async (formData: FormDataCorte) => {
        setSubmitting(true);

        try {
            await actualizarCorte({
                variables: {
                    updateCorteInput: {
                        id_corte: corte.id_corte,
                        numero: corte.numero,
                        fecha_inicio: corte.fecha_inicio,
                        fecha_siembra: corte.fecha_siembra,
                        fecha_corte: formData.fecha_corte,
                        activo: false,
                        estado: true,
                        suerte_id: corte.suerte_id
                    }
                },
                refetchQueries: [{ query: OBTENER_CORTE, variables: { idCorte: corte.id_corte } }]
            });

            dispatch(
                saveCorte({
                    id_corte: corte.id_corte,
                    numero: corte.numero,
                    fecha_inicio: corte.fecha_inicio,
                    fecha_siembra: corte.fecha_siembra,
                    fecha_corte: formData.fecha_corte,
                    activo: false,
                    estado: true,
                    suerte_id: corte.suerte_id
                })
            );
            setMessageType('success');
            setInfoMessage('La fecha de corte se registro exitosamente.');
            setShowMessage(true);
            // Renovar suerte
            setStep(2);
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
        corte,
        step,
        corteId,
        setStep,
        submitFormFechaCorte,
        submitFormPendienteRenovar,
        submitFormRenovarSuerte
    };
};
