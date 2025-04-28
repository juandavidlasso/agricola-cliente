import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Button, Checkbox, Collapse, Grid2, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { OBTENER_APLICACIONES_FERTILIZANTES } from '@graphql/queries';
import { GetAplicacionFertilizanteResponse } from '@interfaces/cultivos/fertilizantes/aplicacion';
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
        setOpenModalForms,
        setSelectedAplicacionFertilizantes,
        setDataType,
        setOpenModalSuertes
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
            setSelectedAplicacionFertilizantes((prevSelected) => [...prevSelected, id]);
        } else {
            setSelectedAplicacionFertilizantes((prevSelected) => prevSelected.filter((itemId) => itemId !== id));
        }
    };

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <Grid2 container>
            <Grid2 size={12}>
                <Typography sx={{ fontWeight: 700 }}>
                    Si desea registrar la misma aplicación y los mismos tratamientos en otra suerte, selecione uno o varios y
                    click en el botón verde.
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>
                    Si desea registrar una aplicación y los tratamientos en otra suerte pero necesita modificar algún dato, click
                    en el botón duplicar.
                </Typography>
            </Grid2>
            <Button
                className="!fixed !z-50 !top-[10%]"
                variant="contained"
                size="small"
                onClick={() => {
                    setFormType('create');
                    setDataType('aplicacion');
                    setOpenModalForms(true);
                }}
            >
                Registrar aplicación fertilizante
            </Button>
            {selectedAplicacionFertilizantes.length > 0 && (
                <Button
                    className="!fixed !z-50 !ml-[300px] !top-[10%]"
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => setOpenModalSuertes(true)}
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
                              <ListItemButton
                                  onClick={() => {
                                      handleClick(aplicacion.id_apfe);
                                      setAplicacionFertilizanteEdit(aplicacion);
                                  }}
                              >
                                  <Checkbox
                                      sx={{
                                          color: '#000000'
                                      }}
                                      checked={selectedAplicacionFertilizantes.includes(aplicacion.id_apfe)}
                                      onChange={(e) => handleCheckboxChange(e, aplicacion.id_apfe)}
                                      onClick={(e) => e.stopPropagation()}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                  />
                                  <ListItemText
                                      primary={`Fecha aplicación: ${dayjs(aplicacion.fecha).format('DD-MM-YYYY')} - ${
                                          aplicacion.tipo
                                      }`}
                                      secondary={`Aplicada en suertes: ${aplicacion?.suertes ?? ''}`}
                                      sx={{
                                          '& .MuiListItemText-secondary': {
                                              color: '#000000'
                                          }
                                      }}
                                  />
                                  <Box sx={{ p: 0.2, display: 'flex', gap: 1 }}>
                                      <Button
                                          className="!text-[14px]"
                                          variant="outlined"
                                          color="error"
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              setAplicacionFertilizanteEdit(aplicacion);
                                              setFormType('duplicar');
                                              setDataType('aplicacion');
                                              setOpenModalForms(true);
                                          }}
                                      >
                                          Duplicar Fertilizante
                                      </Button>
                                      <Button
                                          className="!text-[14px]"
                                          variant="outlined"
                                          color="info"
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              setAplicacionFertilizanteEdit(aplicacion);
                                              setFormType('create');
                                              setDataType('tratamiento');
                                              setOpenModalForms(true);
                                          }}
                                      >
                                          Agregar tratamiento
                                      </Button>
                                      <Button
                                          className="!text-[14px]"
                                          variant="outlined"
                                          color="warning"
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              setAplicacionFertilizanteEdit(aplicacion);
                                              setFormType('update');
                                              setDataType('aplicacion');
                                              setOpenModalForms(true);
                                          }}
                                      >
                                          Editar
                                      </Button>
                                      <Button
                                          className="!text-[14px]"
                                          variant="outlined"
                                          color="error"
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              setAplicacionFertilizanteEdit(aplicacion);
                                              setFormType('delete');
                                              setDataType('aplicacion');
                                              setOpenModalForms(true);
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
