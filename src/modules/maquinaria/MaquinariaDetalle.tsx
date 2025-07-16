import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Grid2, Typography } from '@mui/material';
import Layout from '@modules/layouts/Layout';
import { routesMaquinaria } from '@utils/routesMaquinaria';
import { ThemeProps } from '@interfaces/theme';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import MaquinariaPopover from './MaquinariaPopover';
import ListInsumos from '@modules/insumos/ListInsumos';
import ListAplicacionMantenimientos from '@modules/mantenimientos/aplicaciones/ListAplicacionMantenimientos';
import { useQuery } from '@apollo/client';
import { GetAplicacionesMantenimientoResponse } from '@interfaces/mantenimientos/aplicaciones';
import { OBTENER_APLICACIONES_MANTENIMIENTO } from '@graphql/queries';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { useMaquinaria } from './hooks/useMaquinaria';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const MaquinariaDetalle: React.FC<Props> = ({ toogleTheme }) => {
    const router = useRouter();
    const { maquinaria } = useAppSelector((state: IRootState) => state.maquinariaReducer);
    const { data, loading, error } = useQuery<GetAplicacionesMantenimientoResponse>(OBTENER_APLICACIONES_MANTENIMIENTO, {
        variables: { maquinariaId: maquinaria.idMaquinaria }
    });
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { marca, color, modelo, potencia, serie } = maquinaria;
    const {
        openModal,
        openModalInsumos,
        formType,
        typeModal,
        insumoEdit,
        aplicacionMantenimientoEdit,
        mantenimientoEdit,
        setOpenModal,
        setOpenModalInsumos,
        setFormType,
        setTypeModal,
        setInsumoEdit,
        setAplicacionMantenimientoEdit,
        setMantenimientoEdit
    } = useMaquinaria();

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {openModal && (
                <MaquinariaPopover
                    aplicacionMantenimiento={aplicacionMantenimientoEdit}
                    mantenimiento={mantenimientoEdit}
                    insumo={insumoEdit}
                    formType={formType}
                    typeModal={typeModal}
                    handleClose={() => setOpenModal(false)}
                />
            )}
            {openModalInsumos && (
                <ListInsumos
                    setFormType={setFormType}
                    setInsumoEdit={setInsumoEdit}
                    setOpenModal={setOpenModal}
                    setTypeModal={setTypeModal}
                    handleClose={() => setOpenModalInsumos(false)}
                />
            )}
            <Layout toogleTheme={toogleTheme} navItems={routesMaquinaria}>
                <Box display="flex" justifyContent="center" alignItems="center" className="!p-2">
                    <Grid2 container spacing={2} className="!w-full">
                        <Grid2 size={12} display={'flex'} justifyContent={'space-between'}>
                            <div>
                                <Button onClick={() => router.push('/maquinaria')} variant="outlined" color="error">
                                    Atrás
                                </Button>
                            </div>
                            <Button onClick={() => setOpenModalInsumos(true)} variant="outlined" size="small" className="!mr-3">
                                Insumos
                            </Button>
                            {rol === 1 && (
                                <Button
                                    onClick={() => {
                                        setTypeModal('aplicacion');
                                        setFormType('create');
                                        setOpenModal(true);
                                    }}
                                    variant="outlined"
                                    size="small"
                                >
                                    Registrar aplicación mantenimiento
                                </Button>
                            )}
                        </Grid2>
                        <Grid2 size={12} mb={2}>
                            <Typography className="!text-center !text-3xl !font-bold !uppercase">{marca}</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 2.4 }}>
                            <Card
                                className="!flex !items-center !justify-center !p-2 !pl-0 !pr-0"
                                sx={{ boxShadow: '0 0 3px #212f3c' }}
                            >
                                <CardContent>
                                    <Typography className="!text-center !text-2xl !font-bold !mb-2">Marca</Typography>
                                    <Typography className="!text-center !text-2xl !font-normal !uppercase">{marca}</Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 2.4 }}>
                            <Card
                                className="!flex !items-center !justify-center !p-2 !pl-0 !pr-0"
                                sx={{ boxShadow: '0 0 3px #212f3c' }}
                            >
                                <CardContent>
                                    <Typography className="!text-center !text-2xl !font-bold !mb-2">Serie</Typography>
                                    <Typography className="!text-center !text-2xl !font-normal !uppercase">{serie}</Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 2.4 }}>
                            <Card
                                className="!flex !items-center !justify-center !p-2 !pl-0 !pr-0"
                                sx={{ boxShadow: '0 0 3px #212f3c' }}
                            >
                                <CardContent>
                                    <Typography className="!text-center !text-2xl !font-bold !mb-2">Modelo</Typography>
                                    <Typography className="!text-center !text-2xl !font-normal !uppercase">{modelo}</Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 2.4 }}>
                            <Card
                                className="!flex !items-center !justify-center !p-2 !pl-0 !pr-0"
                                sx={{ boxShadow: '0 0 3px #212f3c' }}
                            >
                                <CardContent>
                                    <Typography className="!text-center !text-2xl !font-bold !mb-2">Potencia HP</Typography>
                                    <Typography className="!text-center !text-2xl !font-normal !uppercase">{potencia}</Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 2.4 }}>
                            <Card
                                className="!flex !items-center !justify-center !p-2 !pl-0 !pr-0"
                                sx={{ boxShadow: '0 0 3px #212f3c' }}
                            >
                                <CardContent>
                                    <Typography className="!text-center !text-2xl !font-bold !mb-2">Color</Typography>
                                    <Typography className="!text-center !text-2xl !font-normal !uppercase">{color}</Typography>
                                </CardContent>
                            </Card>
                        </Grid2>

                        {data?.obtenerAplicacionesMantenimiento?.length === 0
                            ? null
                            : data?.obtenerAplicacionesMantenimiento?.map((aplicacion) => (
                                  <ListAplicacionMantenimientos
                                      key={aplicacion.idApMant}
                                      aplicacion={aplicacion}
                                      setFormType={setFormType}
                                      setOpenModal={setOpenModal}
                                      setTypeModal={setTypeModal}
                                      setMantenimientoEdit={setMantenimientoEdit}
                                      setAplicacionMantenimientoEdit={setAplicacionMantenimientoEdit}
                                  />
                              ))}
                    </Grid2>
                </Box>
            </Layout>
        </>
    );
};

export default MaquinariaDetalle;
