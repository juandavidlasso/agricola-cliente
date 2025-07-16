import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Grid2, Typography } from '@mui/material';
import { OBTENER_CORTE } from '@graphql/queries';
import { ThemeProps } from '@interfaces/theme';
import Alert from '@components/Alert';
import { GetCorteResponse } from '@interfaces/cultivos/cortes';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import BreadCrumbs from '../suertes/utils/BreadCrumbs';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import CardDetails from './CardDetails';
import ModalLoading from '@components/Modal';
import ListButtons from './ListButtons';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import ListWorks from './ListWorks';
import { useCorte } from './hooks/useCorte';
import CorteActualizar from './CorteActualizar';
import DialogModal from '@components/Dialog';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const CorteDetalle: React.FC<Props> = ({ toogleTheme }) => {
    const { openModalList, setOpenModalList, setTypeModal } = useContext(CultivosContext);
    const { corte } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, loading, error } = useQuery<GetCorteResponse>(OBTENER_CORTE, { variables: { idCorte: corte.id_corte } });
    const { openModal, formType, setOpenModal, setFormType } = useCorte();

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {openModal && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => setOpenModal(false)}
                    title={'Actualizar la fecha de corte'}
                    height={75}
                    closeBack={false}
                    id="modal-corte"
                >
                    <CorteActualizar formType={formType} handleClose={() => setOpenModal(false)} />
                </DialogModal>
            )}
            {openModalList && <ListWorks />}
            <Layout toogleTheme={toogleTheme} navItems={routesCultivos}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <BreadCrumbs />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }} display="flex" justifyContent="flex-end">
                            {rol === 1 && (
                                <>
                                    <Button
                                        className="!py-[2px] !px-2 !text-[15px]"
                                        variant="text"
                                        color="error"
                                        onClick={() => {
                                            setFormType('update');
                                            setOpenModal(true);
                                        }}
                                    >
                                        Editar Corte
                                    </Button>
                                    |
                                </>
                            )}
                            <Button
                                className="!py-[2px] !px-2 !text-[15px]"
                                variant="text"
                                color="error"
                                onClick={() => {
                                    setTypeModal('tablon');
                                    setOpenModalList(true);
                                }}
                            >
                                Ver Tablones
                            </Button>
                        </Grid2>

                        {data === undefined ? (
                            <Grid2 size={12} display="flex" justifyContent="center">
                                <Typography variant="h4" component="h4" color="text.primary">
                                    Este corte no esta registrado
                                </Typography>
                            </Grid2>
                        ) : (
                            <>
                                <Grid2 size={12} display="flex" justifyContent="center">
                                    <Typography variant="h4" component="h4" color="text.primary">
                                        Corte {data?.obtenerCorte.numero}
                                    </Typography>
                                </Grid2>

                                <CardDetails corte={data?.obtenerCorte} />
                            </>
                        )}

                        <ListButtons />
                    </Grid2>
                </Box>
            </Layout>
        </>
    );
};

export default CorteDetalle;
