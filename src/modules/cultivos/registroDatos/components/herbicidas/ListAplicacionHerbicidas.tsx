import React, { useContext } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Grid2, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import Alert from '@components/Alert';
import { OBTENER_APLICACIONES_HERBICIDAS, OBTENER_APLICACIONES_HERBICIDAS_CORTE } from '@graphql/queries';
import { GetAplicacionHerbicidaCorteResponse } from '@interfaces/cultivos/herbicidas/aplicacion';
import ModalLoading from '@components/Modal';
import ListTratamientosHerbicidas from './tratamientos/ListTratamientosHerbicidas';
import { InformationContext } from 'src/context/cultivos/information/InformationContext';
import { REGISTRAR_APLICACIONES_HERBICIDAS } from '@graphql/mutations';
import { GetRegistrarAplicacionesHerbicidas } from '@interfaces/cultivos/herbicidas/aplicaciones_herbicidas';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    showButton?: boolean;
}

const ListAplicacionHerbicidas: React.FC<Props> = ({ showButton = false }) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { data, error, loading } = useQuery<GetAplicacionHerbicidaCorteResponse>(OBTENER_APLICACIONES_HERBICIDAS);
    const {
        selectedAplicacionHerbicidas,
        setFormType,
        setAplicacionHerbicidaEdit,
        setOpenModal,
        setSelectedAplicacionHerbicidas,
        setTitle,
        setHeight,
        setDataType
    } = useContext(CultivosContext);
    const { totalItems, setMessageType, setInfoMessage, setShowMessage } = useContext(InformationContext);
    const [agregarAplicacionesHerbicidas] = useMutation<GetRegistrarAplicacionesHerbicidas>(REGISTRAR_APLICACIONES_HERBICIDAS);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        event.stopPropagation();
        if (event.target.checked) {
            setSelectedAplicacionHerbicidas((prevSelected) => [...prevSelected, id]);
        } else {
            setSelectedAplicacionHerbicidas((prevSelected) => prevSelected.filter((itemId) => itemId !== id));
        }
    };

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    const handleSubmitAplicacionesHerbicidas = async () => {
        let aplicacionesHerbicidas = [];

        for (let index = 0; index < selectedAplicacionHerbicidas.length; index++) {
            const obj = {
                corte_id: id_corte,
                aphe_id: selectedAplicacionHerbicidas[index]
            };
            aplicacionesHerbicidas.push(obj);
        }

        try {
            const data = await agregarAplicacionesHerbicidas({
                variables: {
                    createAplicacionesHerbicidaInput: aplicacionesHerbicidas
                },
                refetchQueries: [{ query: OBTENER_APLICACIONES_HERBICIDAS_CORTE, variables: { corteId: id_corte } }]
            });
            if (data.data?.agregarAplicacionesHerbicidas?.length !== 0) {
                setMessageType('success');
                setInfoMessage(`La herbicida se aplico exitosamente.`);
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
                {data?.obtenerAplicacionesHerbicidas.length === 0
                    ? 'No hay aplicaciones registradas'
                    : data?.obtenerAplicacionesHerbicidas.map((aplicacion) => (
                          <Accordion
                              key={aplicacion.id_aphe}
                              sx={{
                                  minWidth: '100%',
                                  height: 'fit-content !important',
                                  mt: 1,
                                  mb: 2,
                                  borderRadius: '5px !important'
                              }}
                              onChange={() => setAplicacionHerbicidaEdit(aplicacion)}
                          >
                              <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls={`panel${aplicacion.id_aphe}-content`}
                                  id={`panel${aplicacion.id_aphe}-header`}
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
                                              checked={selectedAplicacionHerbicidas.includes(aplicacion.id_aphe)}
                                              onChange={(e) => handleCheckboxChange(e, aplicacion.id_aphe)}
                                              onClick={(e) => e.stopPropagation()}
                                              inputProps={{ 'aria-label': 'controlled' }}
                                              disabled={showButton ? totalItems.includes(aplicacion.id_aphe) : false}
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
                                                      setAplicacionHerbicidaEdit(aplicacion);
                                                      setFormType('create');
                                                      setDataType('tratamiento');
                                                      setTitle('Registrar tratamiento herbicida');
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
                                                      setAplicacionHerbicidaEdit(aplicacion);
                                                      setFormType('update');
                                                      setDataType('aplicacion');
                                                      setTitle('Actualizar aplicación herbicida');
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
                                                      setAplicacionHerbicidaEdit(aplicacion);
                                                      setFormType('delete');
                                                      setDataType('aplicacion');
                                                      setTitle('Eliminar aplicación herbicida');
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
                                  <ListTratamientosHerbicidas
                                      listTratamientoHerbicida={aplicacion.listTratamientoHerbicida}
                                      showButton={showButton}
                                  />
                              </AccordionDetails>
                          </Accordion>
                      ))}
            </Grid2>
            {showButton && selectedAplicacionHerbicidas.length > 0 && (
                <Grid2 size={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Button variant="contained" sx={{ mt: 5 }} onClick={handleSubmitAplicacionesHerbicidas}>
                        Aplicar {selectedAplicacionHerbicidas.length} herbicidas
                    </Button>
                </Grid2>
            )}
        </Grid2>
    );
};

export default ListAplicacionHerbicidas;
