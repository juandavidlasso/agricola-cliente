import GrassIcon from '@mui/icons-material/Grass';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';

import { Modules } from '@interfaces/user';

export const modules: Modules[] = [
    {
        id: 1,
        text: 'Cultivos',
        icon: <GrassIcon className="text-[#FFFFFF]" sx={{ fontSize: '80px' }} />,
        onclick: '/main'
    },
    {
        id: 2,
        text: 'Maquinaria',
        icon: <AgricultureOutlinedIcon className="text-[#FFFFFF]" sx={{ fontSize: '80px' }} />,
        onclick: '/maquinaria'
    },
    {
        id: 3,
        text: 'Trabajadores',
        icon: <PeopleOutlinedIcon className="text-[#FFFFFF]" sx={{ fontSize: '80px' }} />,
        onclick: ''
    }
];
