import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Button, Checkbox, Collapse, Grid2, List, ListItemButton, ListItemText } from '@mui/material';
import { OBTENER_APLICACIONES_FERTILIZANTES } from '@graphql/queries';
import { GetAplicacionFertilizanteResponse } from '@interfaces/cultivos/fertilizantes/aplicacion';
import { InformationContext } from 'src/context/cultivos/information/InformationContext';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import ListTratamientosFertilizantes from './tratamientos/ListTratamientosFertilizantes';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const ListAplicacionFertilizantes: React.FC<Props> = () => {
    const { data, error, loading } = useQuery<GetAplicacionFertilizanteResponse>(OBTENER_APLICACIONES_FERTILIZANTES);
    const {
        selectedAplicacionFertilizantes,
        setFormType,
        setAplicacionFertilizanteEdit,
        setOpenModal,
        setSelectedAplicacionFertilizantes,
        setDataType,
        setTitle,
        setHeight,
        setType,
        setDuplicate
    } = useContext(CultivosContext);
    const { totalItems } = useContext(InformationContext);
    const [openItems, setOpenItems] = useState<any>({});

    const handleClick = (id: any) => {
        setOpenItems((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

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

    return (
        <Grid2 container>
            <Button
                className="!fixed !z-50"
                variant="contained"
                onClick={(e) => {
                    e.stopPropagation();
                    setFormType('create');
                    setDataType('aplicacion');
                    setTitle('Registrar aplicación fertilizante');
                    setHeight(60);
                    setType('fertilizantes');
                    setAplicacionFertilizanteEdit(undefined);
                    setDuplicate(false);
                    setOpenModal(true);
                }}
            >
                Agregar aplicación fertilizante
            </Button>
            {selectedAplicacionFertilizantes.length > 0 && (
                <Button
                    className="!fixed !z-50 !ml-80"
                    variant="contained"
                    onClick={(e) => {
                        e.stopPropagation();
                        setType('fertilizantes');
                        setTitle('Selecciona la suerte y el corte');
                        setHeight(80);
                        setDataType('suertes');
                        setDuplicate(false);
                        setOpenModal(true);
                    }}
                >
                    Aplicar fertilizante
                </Button>
            )}
            <Grid2 size={12} sx={{ p: 1 }}>
                {data?.obtenerAplicacionesFertilizantes.length === 0
                    ? 'No hay aplicaciones registradas'
                    : data?.obtenerAplicacionesFertilizantes.map((aplicacion) => (
                          <List
                              key={aplicacion.id_apfe}
                              sx={{ width: '100%', border: '1px solid gray', mb: 2, borderRadius: 3, mt: 7 }}
                              component="nav"
                          >
                              <ListItemButton onClick={() => handleClick(aplicacion.id_apfe)}>
                                  <Checkbox
                                      sx={{
                                          color: '#000000'
                                      }}
                                      checked={selectedAplicacionFertilizantes.includes(aplicacion.id_apfe)}
                                      onChange={(e) => handleCheckboxChange(e, aplicacion.id_apfe)}
                                      onClick={(e) => e.stopPropagation()}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                      disabled={totalItems.includes(aplicacion.id_apfe)}
                                  />
                                  <ListItemText
                                      primary={`Fecha aplicación: ${dayjs(aplicacion.fecha).format('DD-MM-YYYY')} - ${
                                          aplicacion.tipo
                                      }`}
                                  />

                                  {selectedAplicacionFertilizantes.length > 0 &&
                                      selectedAplicacionFertilizantes.includes(aplicacion.id_apfe) && (
                                          <Button
                                              variant="outlined"
                                              color="error"
                                              onClick={(e) => {
                                                  e.stopPropagation();
                                                  setAplicacionFertilizanteEdit(aplicacion);
                                                  setFormType('update');
                                                  setDataType('aplicacion');
                                                  setTitle('Duplicar aplicación fertilizante');
                                                  setHeight(60);
                                                  setType('fertilizantes');
                                                  setDuplicate(true);
                                                  setOpenModal(true);
                                              }}
                                          >
                                              Duplicar Fertilizante
                                          </Button>
                                      )}
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
                                              setType('fertilizantes');
                                              setDuplicate(false);
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
                                              setType('fertilizantes');
                                              setDuplicate(false);
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
                                              setType('fertilizantes');
                                              setDuplicate(false);
                                              setOpenModal(true);
                                          }}
                                      >
                                          Eliminar
                                      </Button>
                                  </Box>
                                  {openItems[aplicacion.id_apfe] ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={openItems[aplicacion.id_apfe]} timeout="auto" unmountOnExit>
                                  <List component="div" disablePadding>
                                      <ListTratamientosFertilizantes
                                          listTratamientoFertilizante={aplicacion.listTratamientoFertilizante}
                                      />
                                  </List>
                              </Collapse>
                          </List>
                      ))}
            </Grid2>
        </Grid2>
    );
};

export default ListAplicacionFertilizantes;
