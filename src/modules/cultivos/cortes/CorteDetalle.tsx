import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import { Box, Grid2, Typography } from '@mui/material';
import { OBTENER_CORTE } from '@graphql/queries';
import { ThemeProps } from '@interfaces/theme';
import Alert from '@components/Alert';
import { GetCorteResponse } from '@interfaces/cultivos/cortes';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import BreadCrumbs from '../suertes/utils/BreadCrumbs';
import ActionsButtons from '../suertes/utils/ActionsButtons';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { useActions } from './hooks/useActions';
import CardDetails from './CardDetails';
import ModalLoading from '@components/Modal';
import ListButtons from './ListButtons';
import { InformationContext } from 'src/context/cultivos/information/InformationContext';
import CortePopover from './CortePopover';
import DeleteInformationPopover from './DeleteInformationPopover';
import SuertesPopover from '../registroDatos/components/suertes/SuertesPopover';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';
import { useLabores } from '../registroDatos/components/labores/hooks/useLabores';
import { useAplicacionesHerbicidas } from '../registroDatos/components/herbicidas/hooks/useAplicacionesHerbicidas';
import { useAplicacionesFertilizantes } from '../registroDatos/components/fertilizantes/hooks/useAplicacionesFertilizantes';

const LazyTablonPopover = dynamic(() => import('../tablones/TablonPopover'), {
    ssr: false
});

const LazyListWorks = dynamic(() => import('./ListWorks'), {
    ssr: false
});

const LazyModalActions = dynamic(() => import('./ModalActions'), {
    ssr: false
});

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const CorteDetalle: React.FC<Props> = ({ toogleTheme }) => {
    const {
        corteActions,
        openModal,
        handleClose,
        header,
        formType,
        openSide,
        handleCloseSide,
        openListWorks,
        handleCloseListWorks,
        handleOpenListWorks,
        typeWork,
        setTypeWork,
        openModalActions,
        handleOpenModalActions,
        handleCloseModalActions
    } = useActions();
    const { openModal: openModalInformation, setOpenModal, title, height, deleteData, width } = useContext(InformationContext);
    const { type } = useContext(CultivosContext);
    const { corte } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const { data, loading, error } = useQuery<GetCorteResponse>(OBTENER_CORTE, { variables: { idCorte: corte.id_corte } });
    const [titleListWorks, setTitleListWorks] = useState<string>('');
    const [nameButton, setNameButton] = useState<string>('');
    const { handleSubmitLabor } = useLabores();
    const { handleSubmitAplicacionesHerbicidas } = useAplicacionesHerbicidas();
    const { handleSubmitAplicacionesFertilizantes } = useAplicacionesFertilizantes();

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            <LazyListWorks
                isOpen={openListWorks}
                handleClose={handleCloseListWorks}
                direction="bottom"
                title={titleListWorks}
                typeWrok={typeWork}
                name={nameButton}
                onOpen={handleOpenModalActions}
            />
            <LazyModalActions
                title={nameButton}
                type={typeWork}
                handleClose={handleCloseModalActions}
                isOpen={openModalActions}
                width={width}
            />
            <DeleteInformationPopover
                isOpen={openModalInformation}
                handleClose={() => setOpenModal(false)}
                title={title}
                height={height}
                data={deleteData}
            />
            <SuertesPopover
                handleSubmit={
                    type === 'labores'
                        ? handleSubmitLabor
                        : type === 'herbicidas'
                        ? handleSubmitAplicacionesHerbicidas
                        : handleSubmitAplicacionesFertilizantes
                }
            />
            <LazyTablonPopover isOpen={openSide} handleClose={handleCloseSide} direction="right" />
            <CortePopover isOpen={openModal} handleClose={handleClose} title={header} formType={formType} />
            <Layout toogleTheme={toogleTheme} navItems={routesCultivos}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <BreadCrumbs />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }} display="flex" justifyContent="flex-end">
                            <ActionsButtons items={corteActions} />
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

                        <ListButtons
                            setTitleListWorks={setTitleListWorks}
                            handleOpenListWorks={handleOpenListWorks}
                            setTypeWork={setTypeWork}
                            setNameButton={setNameButton}
                        />
                    </Grid2>
                </Box>
            </Layout>
        </>
    );
};

export default CorteDetalle;
