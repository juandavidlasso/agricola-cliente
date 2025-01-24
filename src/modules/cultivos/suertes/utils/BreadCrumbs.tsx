import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Breadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';

interface Props {}

const BreadCrumbs: React.FC<Props> = ({}) => {
    const router = useRouter();
    const { suerte, corte } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const path = router.pathname.split('/');

    if (path[1] === 'suerte') {
        return (
            <Breadcrumbs separator={<NavigateNextIcon className='!text-red-800' fontSize='small' />} aria-label='breadcrumb'>
                <Link className='!text-red-600 hover:underline hover:!cursor-pointer' href='/suerte'>
                    Suertes
                </Link>
                {path[1] === 'suerte' && <Typography className='!text-blue-600'>Suerte {suerte.nombre}</Typography>}
            </Breadcrumbs>
        );
    }

    return (
        <Breadcrumbs separator={<NavigateNextIcon className='!text-red-800' fontSize='small' />} aria-label='breadcrumb'>
            <Link className='!text-red-600 hover:underline hover:!cursor-pointer' href='/suerte'>
                Suertes
            </Link>
            <Link className='!text-red-600 hover:underline hover:!cursor-pointer' href={`/suerte/${suerte.id_suerte}`}>
                Suerte {suerte.nombre}
            </Link>
            <Typography className='!text-blue-600'>Corte {corte.numero}</Typography>
        </Breadcrumbs>
    );
};

export default BreadCrumbs;
