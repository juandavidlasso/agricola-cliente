import React, { useContext } from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import { ThemeProps } from '@interfaces/theme';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import Labores from './components/labores/Labores';
import Herbicidas from './components/herbicidas/Herbicidas';
import SuertesPopover from './components/suertes/SuertesPopover';
import { useLabores } from './components/labores/hooks/useLabores';
import { useAplicacionesHerbicidas } from './components/herbicidas/hooks/useAplicacionesHerbicidas';
import Fertilizantes from './components/fertilizantes/Fertilizantes';
import { useAplicacionesFertilizantes } from './components/fertilizantes/hooks/useAplicacionesFertilizantes';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const InformationView: React.FC<Props> = ({ toogleTheme }) => {
    const { type } = useContext(CultivosContext);
    const { handleSubmitLabor } = useLabores();
    const { handleSubmitAplicacionesHerbicidas } = useAplicacionesHerbicidas();
    const { handleSubmitAplicacionesFertilizantes } = useAplicacionesFertilizantes();

    return (
        <>
            <SuertesPopover
                handleSubmit={
                    type === 'labores'
                        ? handleSubmitLabor
                        : type === 'herbicidas'
                        ? handleSubmitAplicacionesHerbicidas
                        : handleSubmitAplicacionesFertilizantes
                }
            />
            <Layout toogleTheme={toogleTheme} navItems={routesCultivos}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Grid2 container spacing={1} size={12}>
                        <Grid2 size={12} textAlign={'center'}>
                            <Typography variant="h4" component="h1" color="text.primary">
                                Listado de Datos
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Labores />
                            <Herbicidas />
                            <Fertilizantes />
                        </Grid2>
                    </Grid2>
                </Box>
            </Layout>
        </>
    );
};

export default InformationView;
