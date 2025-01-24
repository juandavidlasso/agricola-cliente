import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Fab, Grid2, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProps } from '@interfaces/theme';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import { OBTENER_SUERTES_RENOVADAS } from '@graphql/queries';
import { GetSuertesRenovadasResponse } from '@interfaces/cultivos/suerte';
import ModalLoading from '@components/Modal';
import Alert from '@components/Alert';
import SuerteComponent from './Suerte';
import SuerteRegister from './SuerteRegister';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const ListSuertesView: React.FC<Props> = ({ toogleTheme }) => {
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, loading, error } = useQuery<GetSuertesRenovadasResponse>(OBTENER_SUERTES_RENOVADAS);
    const [openRegister, setOpenRegister] = useState<boolean>(false);

    if (error) return <Alert message={error.message} />;

    return (
        <>
            <ModalLoading isOpen={loading} />
            <SuerteRegister isOpen={openRegister} handleClose={() => setOpenRegister(false)} />
            <Layout toogleTheme={toogleTheme} navItems={routesCultivos}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Grid2 container spacing={1} size={12}>
                        {data?.obtenerSuertesRenovadas.length === 0 ? (
                            <Typography variant="h4" component="h4" color="text.primary" sx={{ margin: '0 auto' }}>
                                No hay suertes renovadas
                            </Typography>
                        ) : (
                            <>
                                <Grid2 size={12}>
                                    <Typography variant="h4" component="h4" color="text.primary" textAlign="center">
                                        Listado de Suertes
                                    </Typography>
                                </Grid2>
                                {data?.obtenerSuertesRenovadas.map((suerte) => (
                                    <SuerteComponent key={suerte.id_suerte} suerte={suerte} />
                                ))}
                            </>
                        )}
                    </Grid2>

                    {rol === 1 && (
                        <Fab
                            color="primary"
                            aria-label="add"
                            sx={{ position: 'absolute', bottom: 15, right: 15 }}
                            onClick={() => setOpenRegister(true)}
                        >
                            <AddIcon />
                        </Fab>
                    )}
                </Box>
            </Layout>
        </>
    );
};

export default ListSuertesView;
