import React, { useContext, useState } from 'react';
import { Box, Button, Checkbox, Collapse, Grid2, List, ListItemButton, ListItemText } from '@mui/material';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Alert from '@components/Alert';
import { OBTENER_APLICACIONES_HERBICIDAS } from '@graphql/queries';
import { GetAplicacionHerbicidaCorteResponse } from '@interfaces/cultivos/herbicidas/aplicacion';
import ModalLoading from '@components/Modal';
import ListTratamientosHerbicidas from './tratamientos/ListTratamientosHerbicidas';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const ListAplicacionHerbicidas: React.FC<Props> = () => {
    const { data, error, loading } = useQuery<GetAplicacionHerbicidaCorteResponse>(OBTENER_APLICACIONES_HERBICIDAS);
    const {
        selectedAplicacionHerbicidas,
        totalItems,
        setFormType,
        setAplicacionHerbicidaEdit,
        setSelectedAplicacionHerbicidas,
        setDataType,
        setOpenModalSuertes,
        setOpenModalForms
    } = useContext(CultivosContext);
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
            setSelectedAplicacionHerbicidas((prevSelected) => [...prevSelected, id]);
        } else {
            setSelectedAplicacionHerbicidas((prevSelected) => prevSelected.filter((itemId) => itemId !== id));
        }
    };

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <Grid2 container>
            <Button
                className="!fixed !z-50"
                variant="contained"
                onClick={() => {
                    setFormType('create');
                    setDataType('aplicacion');
                    setOpenModalForms(true);
                }}
            >
                Registrar aplicación herbicida
            </Button>
            {selectedAplicacionHerbicidas.length > 0 && (
                <Button className="!fixed !ml-72 !z-50" variant="contained" onClick={() => setOpenModalSuertes(true)}>
                    Aplicar herbicida
                </Button>
            )}
            <Grid2 size={12} sx={{ p: 1 }}>
                {data?.obtenerAplicacionesHerbicidas.length === 0
                    ? 'No hay aplicaciones registradas'
                    : data?.obtenerAplicacionesHerbicidas.map((aplicacion) => (
                          <List
                              key={aplicacion.id_aphe}
                              sx={{ width: '100%', border: '1px solid gray', mb: 2, borderRadius: 3, mt: 7 }}
                              component="nav"
                          >
                              <ListItemButton
                                  onClick={() => {
                                      handleClick(aplicacion.id_aphe);
                                      setAplicacionHerbicidaEdit(aplicacion);
                                  }}
                              >
                                  <Checkbox
                                      sx={{
                                          color: '#000000'
                                      }}
                                      checked={selectedAplicacionHerbicidas.includes(aplicacion.id_aphe)}
                                      onChange={(e) => handleCheckboxChange(e, aplicacion.id_aphe)}
                                      onClick={(e) => e.stopPropagation()}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                      disabled={totalItems.includes(aplicacion.id_aphe)}
                                  />
                                  <ListItemText
                                      primary={`Fecha aplicación: ${dayjs(aplicacion.fecha).format('DD-MM-YYYY')} - ${
                                          aplicacion.tipo
                                      }`}
                                  />
                                  <Box sx={{ p: 0.2, display: 'flex', gap: 1 }}>
                                      <Button
                                          variant="outlined"
                                          color="error"
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              setAplicacionHerbicidaEdit(aplicacion);
                                              setFormType('duplicar');
                                              setDataType('aplicacion');
                                              setOpenModalForms(true);
                                          }}
                                      >
                                          Duplicar Herbicida
                                      </Button>
                                      <Button
                                          variant="outlined"
                                          color="info"
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              setAplicacionHerbicidaEdit(aplicacion);
                                              setFormType('create');
                                              setDataType('tratamiento');
                                              setOpenModalForms(true);
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
                                              setOpenModalForms(true);
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
                                              setOpenModalForms(true);
                                          }}
                                      >
                                          Eliminar
                                      </Button>
                                  </Box>
                                  {openItems[aplicacion.id_aphe] ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={openItems[aplicacion.id_aphe]} timeout="auto" unmountOnExit>
                                  <List component="div" disablePadding>
                                      <ListTratamientosHerbicidas
                                          listTratamientoHerbicida={aplicacion.listTratamientoHerbicida}
                                      />
                                  </List>
                              </Collapse>
                          </List>
                      ))}
            </Grid2>
        </Grid2>
    );
};

export default ListAplicacionHerbicidas;
