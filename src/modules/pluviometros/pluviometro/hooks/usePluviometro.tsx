import { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { REGISTRAR_LLUVIA } from '@graphql/mutations';
import { OBTENER_LLUVIAS, OBTENER_PLUVIOMETROS_Y_LLUVIAS } from '@graphql/queries';
import { GetLluviaRegister } from '@interfaces/lluvias';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';

export const usePluviometro = () => {
    const { arrayLluvias, setArrayLluvias, setIsEnabled } = useContext(PluviometroContext);
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [agregarLluvia] = useMutation<GetLluviaRegister>(REGISTRAR_LLUVIA);

    const submitLluvia = async (year: number, month: number) => {
        setSubmitting(true);

        try {
            const { data } = await agregarLluvia({
                variables: {
                    createLluviaInput: arrayLluvias
                },
                refetchQueries: [
                    { query: OBTENER_LLUVIAS },
                    {
                        query: OBTENER_PLUVIOMETROS_Y_LLUVIAS,
                        variables: {
                            filterLluviasInput: {
                                month,
                                year
                            }
                        }
                    }
                ]
            });
            if (data?.agregarLluvia?.length !== 0) {
                setMessageType('success');
                setInfoMessage('Las lluvias se registraron exitosamente.');
                setShowMessage(true);
                setSubmitting(false);
                setArrayLluvias([]);
                setIsEnabled(false);
            }
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
        submitLluvia
    };
};
