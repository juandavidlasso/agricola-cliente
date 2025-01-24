import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {}

const UserGroup: React.FC<Props> = ({}) => {
    const router = useRouter();
    const { user } = useAppSelector((state: IRootState) => state.userReducer);

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Tooltip title={user.nombre}>
                <Button
                    onClick={handleOpenUserMenu}
                    sx={{
                        borderRadius: '50% !important',
                        background: '#1C2833 !important',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ml: 2,
                        minWidth: 5,
                        pt: 1,
                        pb: 1,
                        pl: 2,
                        pr: 2
                    }}
                >
                    <Typography variant="h5" component="h5" color="text.secondary">
                        {user.nombre.charAt(0)}
                    </Typography>
                </Button>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem
                    onClick={() => {
                        handleCloseUserMenu();
                        router.replace('/user/account');
                    }}
                >
                    <Typography textAlign="center">Perfil</Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleCloseUserMenu();
                        sessionStorage.clear();
                        router.replace('/user/login');
                    }}
                >
                    <Typography textAlign="center">Salir</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserGroup;
