import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Fab, Grid2, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProps } from '@interfaces/theme';
import Layout from '@modules/layouts/Layout';
import { routesMaquinaria } from '@utils/routesMaquinaria';
import { GetMaquinariaResponse, Maquinaria } from '@interfaces/maquinaria';
import { OBTENER_MAQUINARIAS } from '@graphql/queries';
import Maquina from './Maquina';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import DialogModal from '@components/Dialog';
import MaquinariaRegister from './MaquinariaRegister';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const ListMaquinaria: React.FC<Props> = ({ toogleTheme }) => {
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { loading, error, data } = useQuery<GetMaquinariaResponse>(OBTENER_MAQUINARIAS);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [formType, setFormType] = useState<'create' | 'update'>('create');
    const [maquinariaEdit, setMaquinariaEdit] = useState<Maquinaria>();

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {openModal && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => setOpenModal(false)}
                    title={formType === 'create' ? 'Registrar maquinaria' : 'Actualizar maquinaria'}
                    height={90}
                    width="40%"
                    id="modal-maquinaria"
                >
                    <MaquinariaRegister formType={formType} maquinaria={maquinariaEdit} handleClose={() => setOpenModal(false)} />
                </DialogModal>
            )}
            <Layout toogleTheme={toogleTheme} navItems={routesMaquinaria}>
                <Box display="flex" justifyContent="center" alignItems="center" className="!p-2">
                    <Grid2 container spacing={2} className="!w-full">
                        {data?.obtenerMaquinarias.length === 0 ? (
                            <Grid2 size={12} className="!flex !justify-center !p-5">
                                <Typography>No hay maquinaria registrada</Typography>
                            </Grid2>
                        ) : (
                            data?.obtenerMaquinarias.map((maquina) => (
                                <Maquina
                                    key={maquina.idMaquinaria}
                                    maquinaria={maquina}
                                    onUpdate={(maquinaria: Maquinaria) => {
                                        setMaquinariaEdit(maquinaria);
                                        setFormType('update');
                                        setOpenModal(true);
                                    }}
                                />
                            ))
                        )}
                    </Grid2>
                </Box>
            </Layout>

            {rol === 1 && (
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: 'absolute', right: 15 }}
                    onClick={() => {
                        setFormType('create');
                        setOpenModal(true);
                    }}
                >
                    <AddIcon />
                </Fab>
            )}
        </>
    );
};

export default ListMaquinaria;
