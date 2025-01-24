import React, { useContext } from 'react';
import { Button, Grid2, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SideModal from '@components/Side';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';
import ReporteLluviasPluviometro from './ReporteLluviasPluviometro';
import ReporteLluviasActuales from './ReporteLluviasActuales';
import ReporteLluviasMesYear from './ReporteLluviasMesYear';
import ReporteLluviasYear from './ReporteLluviasYear';

interface Props {}

const ReporteLluviasPopover: React.FC<Props> = ({}) => {
    const { openModalReport, reportType, title, setOpenModalReport } = useContext(PluviometroContext);
    const getComponent = () => {
        if (reportType === 'pluviometro') return <ReporteLluviasPluviometro />;
        if (reportType === 'actual') return <ReporteLluviasActuales />;
        if (reportType === 'mes') return <ReporteLluviasMesYear />;
        if (reportType === 'year') return <ReporteLluviasYear />;
        return <></>;
    };
    return (
        <SideModal isOpen={openModalReport} handleClose={() => setOpenModalReport(false)} direction={'bottom'}>
            <Grid2 container spacing={2} padding={2}>
                <Grid2 size={12} marginTop={1} display="flex" justifyContent="center">
                    <Typography variant="h4" component="h4" color="text.primary" textAlign="center" className="max-lg:!mt-16">
                        {title}
                    </Typography>
                    <Button variant="outlined" onClick={() => setOpenModalReport(false)} sx={{ position: 'absolute', right: 5 }}>
                        <CloseIcon />
                    </Button>
                </Grid2>
                {getComponent()}
            </Grid2>
        </SideModal>
    );
};

export default ReporteLluviasPopover;
