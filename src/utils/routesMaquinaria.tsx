import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import { RoutesProps } from '@modules/layouts/Layout';

export const routesMaquinaria: RoutesProps[] = [
    { name: 'Módulos', url: '/user/profile', icon: <ViewModuleOutlinedIcon /> },
    { name: 'Maquinaria', url: '/maquinaria', icon: <SettingsOutlinedIcon /> }
];
