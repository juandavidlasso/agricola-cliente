import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import useAppSelector from '@hooks/useAppSelector';
import { GetResponseTablonesCorteAplicacionesPlagas } from '@interfaces/cultivos/tablones';
import { IRootState } from '@interfaces/store';
import { OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS } from '@graphql/queries';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import Plaga from './Plaga';
import TratamientoPlagaPopover from './tratamiento/TratamientoPlagaPopover';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {}

const ListPlagas: React.FC<Props> = ({}) => {
    const { id_corte, estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, loading, error } = useQuery<GetResponseTablonesCorteAplicacionesPlagas>(
        OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS,
        {
            variables: { idCorte: id_corte }
        }
    );
    const { setDataType, setOpenModal, setTitle, setHeight, setFormType } = useContext(CultivosContext);

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;
    return (
        <>
            <TratamientoPlagaPopover />
            <Grid2 container spacing={2}>
                {estado && rol === 1 && (
                    <Grid2 size={12}>
                        <Button
                            variant="outlined"
                            color="info"
                            onClick={() => {
                                setDataType('tratamiento');
                                setFormType('create');
                                setTitle('Registrar producto');
                                setHeight(90);
                                setOpenModal(true);
                            }}
                        >
                            Registrar producto
                        </Button>
                    </Grid2>
                )}
                {data?.obtenerTablonesYAplicacionesPlagas.length === 0 ? (
                    <Typography>No hay tablones registrados</Typography>
                ) : (
                    data?.obtenerTablonesYAplicacionesPlagas.map((tablon) => <Plaga key={tablon.id_tablon} tablon={tablon} />)
                )}
            </Grid2>
        </>
    );
};

export default ListPlagas;
