import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import { RoutesProps } from '@modules/layouts/Layout';

export const routesCultivos: RoutesProps[] = [
    { name: 'Mis Datos', url: '/user/account', icon: <PersonOutlineOutlinedIcon /> },
    { name: 'Agregar Usuario', url: '/user/create', icon: <PersonAddOutlinedIcon /> },
    { name: 'Menu', url: '/main', icon: <HomeOutlinedIcon /> },
    { name: 'Módulos', url: '/user/profile', icon: <ViewModuleOutlinedIcon /> },
    { name: 'Prontuario', url: '/prontuario', icon: <FormatListBulletedOutlinedIcon /> },
    { name: 'Suertes', url: '/suerte', icon: <GrassOutlinedIcon /> },
    { name: 'Lluvias', url: '/pluviometros', icon: <ThunderstormOutlinedIcon /> },
    { name: 'Datos Actuales', url: '/datos-actuales', icon: <TableViewOutlinedIcon /> }
    // { name: 'Alertas', url: '/', icon: <NotificationsActiveOutlinedIcon /> }
];
