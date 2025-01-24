import React from 'react';
import Image from 'next/image';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { ThemeProps } from '@interfaces/theme';
import ThemeGroup from './ThemeGroup';
import UserGroup from './UserGroup';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const NavbarView: React.FC<Props> = ({ toogleTheme }) => {
    return (
        <AppBar color="primary" position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Image src="/logo.png" alt="Logo" width={80} height={80} priority />
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="h3"
                            sx={{ margin: '0 auto' }}
                            color="text.primary"
                            className="font-semibold"
                            onClick={() => sessionStorage.setItem('theme', 'light')}
                        >
                            Agricola L&M S.A.S
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }} display="flex">
                        <ThemeGroup toogleTheme={toogleTheme} />

                        <UserGroup />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavbarView;
