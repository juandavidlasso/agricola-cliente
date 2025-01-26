import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    CssBaseline,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeGroup from './ThemeGroup';
import { ThemeProps } from '@interfaces/theme';
import UserGroup from './UserGroup';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

export interface RoutesProps {
    name: string;
    url: string;
    icon: JSX.Element;
}

interface Props {
    children: JSX.Element;
    toogleTheme: (theme: ThemeProps) => void;
    navItems: RoutesProps[];
}

const drawerWidth = 240;

const Layout: React.FC<Props> = ({ children, toogleTheme, navItems }) => {
    const router = useRouter();
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Image src="/logo.png" alt="Logo" width={70} height={70} className="mt-4 ml-4 mb-3" />
            <Divider />
            <List>
                {navItems.map((item, index) => {
                    if (rol === 1) {
                        return (
                            <ListItem key={index} disablePadding>
                                <ListItemButton sx={{ textAlign: 'start' }} onClick={() => router.push(item.url)}>
                                    {item.icon}
                                    <ListItemText
                                        primary={item.name}
                                        sx={{
                                            ml: 3,
                                            '& .MuiTypography-root': {
                                                fontSize: '15px',
                                                color: 'text.primary'
                                            }
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    } else {
                        if (index !== 1 && index !== 8) {
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton sx={{ textAlign: 'start' }} onClick={() => router.push(item.url)}>
                                        {item.icon}
                                        <ListItemText
                                            primary={item.name}
                                            sx={{
                                                ml: 3,
                                                '& .MuiTypography-root': {
                                                    fontSize: '15px',
                                                    color: 'text.primary'
                                                }
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        }
                    }
                })}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h4"
                        component="h4"
                        color="text.primary"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Hacienda Santa Helena
                    </Typography>

                    <Box flexGrow={0} display="flex">
                        <ThemeGroup toogleTheme={toogleTheme} />

                        <UserGroup />
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    color="primary"
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: 'block',
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ pt: 3, mt: 1, width: '100%', pl: 2, pr: 2, mb: 4 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
