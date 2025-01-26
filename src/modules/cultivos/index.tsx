import React from 'react';
import { Box, Card, CardActions, CardContent, Divider, Grid2, Typography } from '@mui/material';
import { ThemeProps } from '@interfaces/theme';
import Layout from '@modules/layouts/Layout';
import { routesCultivos } from '@utils/routesCultivos';
import { useQuery } from '@apollo/client';
import { OBTENER_TOTAL_HECTAREAS_SUERTE } from '@graphql/queries';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const Main: React.FC<Props> = ({ toogleTheme }) => {
    const { data, loading, error } = useQuery<{ obtenerTotalHectareasSuertes: { area: number } }>(OBTENER_TOTAL_HECTAREAS_SUERTE);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <Layout toogleTheme={toogleTheme} navItems={routesCultivos}>
            <Box width={'100%'}>
                <Grid2 container spacing={2} textAlign={'center'}>
                    <Grid2 size={{ xs: 12, sm: 4 }}>
                        <Card className="!p-5">
                            <CardContent>
                                <Typography className="!text-3xl !mb-2">Caña de azúcar</Typography>
                                <Typography className="!text-3xl">
                                    {data?.obtenerTotalHectareasSuertes.area?.toFixed(2)}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions className="!flex !justify-center">
                                <Typography className="!text-3xl">Hectáreas</Typography>
                            </CardActions>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4 }}>
                        <Card className="!p-5">
                            <CardContent>
                                <Typography className="!text-3xl !mb-2">Maíz</Typography>
                                <Typography className="!text-3xl">0</Typography>
                            </CardContent>
                            <Divider />
                            <CardActions className="!flex !justify-center">
                                <Typography className="!text-3xl">Hectáreas</Typography>
                            </CardActions>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4 }}>
                        <Card className="!p-5">
                            <CardContent>
                                <Typography className="!text-3xl !mb-2">Pastos</Typography>
                                <Typography className="!text-3xl">0</Typography>
                            </CardContent>
                            <Divider />
                            <CardActions className="!flex !justify-center">
                                <Typography className="!text-3xl">Hectáreas</Typography>
                            </CardActions>
                        </Card>
                    </Grid2>
                </Grid2>
            </Box>
        </Layout>
    );
};

export default Main;
