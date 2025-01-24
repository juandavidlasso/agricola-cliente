import React from 'react';
import { Button, Grid2, Typography } from '@mui/material';
import { Suerte } from '@interfaces/cultivos/suerte';
import { useRouter } from 'next/router';
import useAppDispatch from '@hooks/useAppDispatch';
import { saveSuerte } from '@store/cultivos/actions';

interface Props {
    suerte: Suerte;
}

const SuerteComponent: React.FC<Props> = ({ suerte }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    return (
        <Grid2
            size={{ xs: 12, sm: 1, md: 1, lg: 1 }}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            className="!m-1 rounded-xl !pl-2 !pr-2 !pt-2 !pb-2"
        >
            <Button
                color="primary"
                variant="contained"
                sx={{ width: '100%' }}
                className="!h-[80%]"
                onClick={() => {
                    dispatch(saveSuerte(suerte));
                    router.push(`/suerte/${suerte.id_suerte}`);
                }}
            >
                <Typography variant="h6" component="h6" className="!mt-5 !mb-5">
                    {suerte.nombre}
                </Typography>
            </Button>
        </Grid2>
    );
};

export default SuerteComponent;
