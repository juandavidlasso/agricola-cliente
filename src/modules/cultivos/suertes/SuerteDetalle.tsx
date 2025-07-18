import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Grid2, Typography } from '@mui/material';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import { ThemeProps } from '@interfaces/theme';
import CardDetails from './CardDetails';
import { OBTENER_SUERTE } from '@graphql/queries';
import { GetSuerteResponse } from '@interfaces/cultivos/suerte';
import ModalLoading from '@components/Modal';
import Alert from '@components/Alert';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import ListCortes from '../cortes/ListCortes';
import BreadCrumbs from './utils/BreadCrumbs';
import DialogModal from '@components/Dialog';
import { useSuerte } from './hooks/useSuerte';
import DeleteSuerte from './DeleteSuerte';
import UpdateSuerte from './UpdateSuerte';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const SuerteDetalleView: React.FC<Props> = ({ toogleTheme }) => {
    const { id_suerte } = useAppSelector((state: IRootState) => state.cultivosReducer.suerte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, loading, error } = useQuery<GetSuerteResponse>(OBTENER_SUERTE, {
        variables: { idSuerte: id_suerte }
    });
    const { openModal, formType, setOpenModal, setFormType } = useSuerte();

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {openModal && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => setOpenModal(false)}
                    title={
                        formType === 'delete' ? 'Eliminar Suerte' : formType === 'update' ? 'Actualizar Suerte' : 'Renovar Suerte'
                    }
                    height={formType === 'delete' ? 60 : 80}
                    id="modal-suerte"
                >
                    {formType === 'delete' ? (
                        <DeleteSuerte handleClose={() => setOpenModal(false)} />
                    ) : (
                        <UpdateSuerte formType={formType} handleClose={() => setOpenModal(false)} />
                    )}
                </DialogModal>
            )}
            <Layout toogleTheme={toogleTheme} navItems={routesCultivos}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    {!loading && (
                        <Grid2 container spacing={2}>
                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <BreadCrumbs />
                            </Grid2>

                            {rol === 1 && (
                                <Grid2 size={{ xs: 12, sm: 6 }} display="flex" justifyContent="flex-end">
                                    <Button
                                        className="!py-[2px] !px-2 !text-[15px]"
                                        variant="text"
                                        color="error"
                                        onClick={() => {
                                            setFormType('create');
                                            setOpenModal(true);
                                        }}
                                    >
                                        Renovar Suerte
                                    </Button>
                                    |
                                    <Button
                                        className="!py-[2px] !px-2 !text-[15px]"
                                        variant="text"
                                        color="error"
                                        onClick={() => {
                                            setFormType('update');
                                            setOpenModal(true);
                                        }}
                                    >
                                        Editar Suerte
                                    </Button>
                                    |
                                    <Button
                                        className="!py-[2px] !px-2 !text-[15px]"
                                        variant="text"
                                        color="error"
                                        onClick={() => {
                                            setFormType('delete');
                                            setOpenModal(true);
                                        }}
                                    >
                                        Eliminar Suerte
                                    </Button>
                                </Grid2>
                            )}

                            {data === undefined ? (
                                <Grid2 size={12} display="flex" justifyContent="center">
                                    <Typography variant="h4" component="h4" color="text.primary">
                                        Esta suerte no esta registrada
                                    </Typography>
                                </Grid2>
                            ) : (
                                <>
                                    <Grid2 size={12} display="flex" justifyContent="center">
                                        <Typography variant="h4" component="h4" color="text.primary">
                                            Suerte {data?.obtenerSuerte.nombre}
                                        </Typography>
                                    </Grid2>

                                    <CardDetails suerte={data?.obtenerSuerte} />
                                </>
                            )}

                            <Grid2 size={12}>
                                <ListCortes />
                            </Grid2>
                        </Grid2>
                    )}
                </Box>
            </Layout>
        </>
    );
};

export default SuerteDetalleView;
