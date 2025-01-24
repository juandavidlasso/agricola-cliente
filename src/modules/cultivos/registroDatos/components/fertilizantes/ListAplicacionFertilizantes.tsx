import React, { useContext } from 'react';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Grid2, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { OBTENER_APLICACIONES_FERTILIZANTES, OBTENER_APLICACIONES_FERTILIZANTES_CORTE } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { GetAplicacionFertilizanteResponse } from '@interfaces/cultivos/fertilizantes/aplicacion';
import { IRootState } from '@interfaces/store';
import { InformationContext } from 'src/context/cultivos/information/InformationContext';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import ListTratamientosFertilizantes from './tratamientos/ListTratamientosFertilizantes';
import { REGISTRAR_APLICACIONES_FERTILIZANTES } from '@graphql/mutations';
import { GetAplicacionesFertilizantesRegister } from '@interfaces/cultivos/fertilizantes/aplicaciones_fertilizantes';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    showButton?: boolean;
}

const ListAplicacionFertilizantes: React.FC<Props> = ({ showButton = false }) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { data, error, loading } = useQuery<GetAplicacionFertilizanteResponse>(OBTENER_APLICACIONES_FERTILIZANTES);
    const {
        selectedAplicacionFertilizantes,
        setFormType,
        setAplicacionFertilizanteEdit,
        setOpenModal,
        setSelectedAplicacionFertilizantes,
        setDataType,
        setTitle,
        setHeight
    } = useContext(CultivosContext);
    const { totalItems, setMessageType, setInfoMessage, setShowMessage } = useContext(InformationContext);
    const [agregarAplicacionesFertilizantes] = useMutation<GetAplicacionesFertilizantesRegister>(
        REGISTRAR_APLICACIONES_FERTILIZANTES
    );

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        event.stopPropagation();
        if (event.target.checked) {
            setSelectedAplicacionFertilizantes((prevSelected) => [...prevSelected, id]);
        } else {
            setSelectedAplicacionFertilizantes((prevSelected) => prevSelected.filter((itemId) => itemId !== id));
        }
    };

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    const handleSubmitAplicacionesFertilizantes = async () => {
        let aplicacionesFertilizantes = [];

        for (let index = 0; index < selectedAplicacionFertilizantes.length; index++) {
            const obj = {
                corte_id: id_corte,
                apfe_id: selectedAplicacionFertilizantes[index]
            };
            aplicacionesFertilizantes.push(obj);
        }

        try {
            const data = await agregarAplicacionesFertilizantes({
                variables: {
                    createAplicacionesFertilizanteInput: aplicacionesFertilizantes
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_FERTILIZANTES_CORTE, variables: { corteId: id_corte } }]
            });
            if (data.data?.agregarAplicacionesFertilizantes?.length !== 0) {
                setMessageType('success');
                setInfoMessage(`El fertilizante se aplico exitosamente.`);
                setShowMessage(true);
            }
        } catch (error) {
            if (error instanceof ApolloError) {
                setMessageType('error');
                setInfoMessage(error.message.replace('Error:', ''));
                setShowMessage(true);
                return;
            }
            setMessageType('error');
            setInfoMessage(error as string);
            setShowMessage(true);
            return;
        }
    };

    return (
        <Grid2 container>
            <Grid2 size={12} sx={{ p: 1 }}>
                {data?.obtenerAplicacionesFertilizantes.length === 0
                    ? 'No hay aplicaciones registradas'
                    : data?.obtenerAplicacionesFertilizantes.map((aplicacion) => (
                          <Accordion
                              key={aplicacion.id_apfe}
                              sx={{
                                  minWidth: '100%',
                                  height: 'fit-content !important',
                                  mt: 1,
                                  mb: 2,
                                  borderRadius: '5px !important'
                              }}
                              onChange={() => setAplicacionFertilizanteEdit(aplicacion)}
                          >
                              <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls={`panel${aplicacion.id_apfe}-content`}
                                  id={`panel${aplicacion.id_apfe}-header`}
                                  sx={{
                                      '& .MuiAccordionSummary-content': {
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between'
                                      }
                                  }}
                              >
                                  <Box display={'flex'} alignItems={'center'}>
                                      <Box>
                                          <Checkbox
                                              sx={{
                                                  color: '#000000'
                                              }}
                                              checked={selectedAplicacionFertilizantes.includes(aplicacion.id_apfe)}
                                              onChange={(e) => handleCheckboxChange(e, aplicacion.id_apfe)}
                                              onClick={(e) => e.stopPropagation()}
                                              inputProps={{ 'aria-label': 'controlled' }}
                                              disabled={showButton ? totalItems.includes(aplicacion.id_apfe) : false}
                                          />
                                      </Box>
                                      <Typography>
                                          Fecha aplicación: {dayjs(aplicacion.fecha).format('DD-MM-YYYY')} - {aplicacion.tipo}
                                      </Typography>
                                  </Box>
                                  {!showButton && (
                                      <>
                                          <Box sx={{ p: 0.2, display: 'flex', gap: 1 }}>
                                              <Button
                                                  variant="outlined"
                                                  color="info"
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                      setAplicacionFertilizanteEdit(aplicacion);
                                                      setFormType('create');
                                                      setDataType('tratamiento');
                                                      setTitle('Registrar tratamiento fertilizante');
                                                      setHeight(90);
                                                      setOpenModal(true);
                                                  }}
                                              >
                                                  Agregar tratamiento
                                              </Button>
                                              <Button
                                                  variant="outlined"
                                                  color="warning"
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                      setAplicacionFertilizanteEdit(aplicacion);
                                                      setFormType('update');
                                                      setDataType('aplicacion');
                                                      setTitle('Actualizar aplicación fertilizante');
                                                      setHeight(60);
                                                      setOpenModal(true);
                                                  }}
                                              >
                                                  Editar
                                              </Button>
                                              <Button
                                                  variant="outlined"
                                                  color="error"
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                      setAplicacionFertilizanteEdit(aplicacion);
                                                      setFormType('delete');
                                                      setDataType('aplicacion');
                                                      setTitle('Eliminar aplicación fertilizante');
                                                      setHeight(45);
                                                      setOpenModal(true);
                                                  }}
                                              >
                                                  Eliminar
                                              </Button>
                                          </Box>
                                      </>
                                  )}
                              </AccordionSummary>
                              <AccordionDetails>
                                  <ListTratamientosFertilizantes
                                      listTratamientoFertilizante={aplicacion.listTratamientoFertilizante}
                                      showButton={showButton}
                                  />
                              </AccordionDetails>
                          </Accordion>
                      ))}
            </Grid2>
            {showButton && selectedAplicacionFertilizantes.length > 0 && (
                <Grid2 size={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Button variant="contained" sx={{ mt: 5 }} onClick={handleSubmitAplicacionesFertilizantes}>
                        Aplicar {selectedAplicacionFertilizantes.length} fertilizantes
                    </Button>
                </Grid2>
            )}
        </Grid2>
    );
};

export default ListAplicacionFertilizantes;
