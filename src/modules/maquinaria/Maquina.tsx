import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, CardContent, Grid2, Typography } from '@mui/material';
import useAppDispatch from '@hooks/useAppDispatch';
import { Maquinaria } from '@interfaces/maquinaria';
import { saveMaquinaria } from '@store/maquinaria/actions';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import { MaquinariaContext } from 'src/context/maquinaria/MaquinariaContext';

interface Props {
    maquinaria: Maquinaria;
}

const Maquina: React.FC<Props> = ({ maquinaria }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { setHeight, setTitle, setOpenModal, setMaquinariaEdit, setType, setFormType } = useContext(MaquinariaContext);
    return (
        <Grid2 key={maquinaria.idMaquinaria} size={{ xs: 12, sm: 4 }} className="!p-2">
            <Card
                className="!cursor-pointer hover:!bg-gray-200"
                sx={{ boxShadow: '0 0 3px #212f3c' }}
                onClick={() => {
                    dispatch(saveMaquinaria(maquinaria));
                    router.push('/maquinaria-detalle');
                }}
            >
                <CardContent>
                    <Typography className="!text-center !text-2xl !font-bold">
                        {maquinaria.marca} {maquinaria.serie}
                    </Typography>
                </CardContent>
            </Card>
            {rol === 1 && (
                <Button
                    size="small"
                    onClick={() => {
                        setTitle('Actualizar maquinaria');
                        setHeight(90);
                        setMaquinariaEdit(maquinaria);
                        setType('update');
                        setFormType('maquinaria');
                        setOpenModal(true);
                    }}
                    variant="outlined"
                    color="warning"
                >
                    Editar Maquinaria
                </Button>
            )}
        </Grid2>
    );
};

export default Maquina;
