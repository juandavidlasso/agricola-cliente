import React from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightRoundOutlinedIcon from '@mui/icons-material/NightlightRoundOutlined';
import { Button, Tooltip } from '@mui/material';
import { ThemeProps } from '@interfaces/theme';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const ThemeGroup: React.FC<Props> = ({ toogleTheme }) => {
    return (
        <>
            <Tooltip title="Día">
                <Button
                    onClick={() => {
                        sessionStorage.setItem('theme', 'light');
                        toogleTheme('light');
                    }}
                >
                    <LightModeOutlinedIcon />
                </Button>
            </Tooltip>
            <Tooltip title="Noche">
                <Button
                    onClick={() => {
                        sessionStorage.setItem('theme', 'dark');
                        toogleTheme('dark');
                    }}
                >
                    <NightlightRoundOutlinedIcon />
                </Button>
            </Tooltip>
        </>
    );
};

export default ThemeGroup;
