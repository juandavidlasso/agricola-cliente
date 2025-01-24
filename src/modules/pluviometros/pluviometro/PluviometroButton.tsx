import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import { REGISTRAR_APLICACION_LLUVIA } from '@graphql/mutations';
import { GetAplicacionLluviaRegister } from '@interfaces/lluvias/aplicacion';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import { OBTENER_LLUVIAS_MES_ACTUAL, OBTENER_PLUVIOMETROS_Y_LLUVIAS } from '@graphql/queries';

interface Props {}

const PluviometroButton: React.FC<Props> = ({}) => {
    const { arrayPluviometros, selectedLluvias } = useContext(PluviometroContext);
    const { setMessageType, setInfoMessage, setShowMessage } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [agregarAplicacionLluvia] = useMutation<GetAplicacionLluviaRegister>(REGISTRAR_APLICACION_LLUVIA);
    const submitForm = async (pluviometro_id: number) => {
        const arrayData = [];
        setSubmitting(true);
        for (let index = 0; index < selectedLluvias.length; index++) {
            const obj = {
                pluviometro_id,
                lluvia_id: selectedLluvias[index].id_lluvia
            };
            arrayData.push(obj);
        }

        try {
            await agregarAplicacionLluvia({
                variables: {
                    createAplicacionLluviaInput: arrayData
                },
                refetchQueries: [{ query: OBTENER_PLUVIOMETROS_Y_LLUVIAS }, { query: OBTENER_LLUVIAS_MES_ACTUAL }]
            });

            setMessageType('success');
            setInfoMessage(`La lluvia se registro exitosamente.`);
            setShowMessage(true);
            setSubmitting(false);
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
            <Grid2 size={12}>
                <Typography>Seleccione los pluviometros donde sea registrar la lluvia</Typography>
            </Grid2>
            {arrayPluviometros.length > 0 &&
                arrayPluviometros.map((pluviometro) => (
                    <Grid2 size={{ xs: 12, sm: 4 }} key={pluviometro.id_pluviometro}>
                        <Button variant="outlined" onClick={() => submitForm(pluviometro.id_pluviometro)} disabled={submitting}>
                            Pluviómetro {pluviometro.nombre}
                        </Button>
                    </Grid2>
                ))}
        </Grid2>
    );
};

export default PluviometroButton;
