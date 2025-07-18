import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Chip, Grid2, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { GetResponseCortesPorSuerte, GetResponseCortesRenovados } from '@interfaces/cultivos/cortes';
import { OBTENER_CORTES_POR_SUERTE, OBTENER_CORTES_RENOVADOS } from '@graphql/queries';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import Alert from '@components/Alert';
import Cortes from './Cortes';
import CerrarCortePopover from './CerrarCortePopover';
import { useCorte } from './hooks/useCorte';
import DialogModal from '@components/Dialog';
import CorteActualizar from './CorteActualizar';

interface Props {}

const ListCortes: React.FC<Props> = () => {
    const { id_suerte, nombre } = useAppSelector((state: IRootState) => state.cultivosReducer.suerte);
    const { user } = useAppSelector((state: IRootState) => state.userReducer);
    const [open, setOpen] = useState<boolean>(false);
    const [corteId, setCorteId] = useState<number>(0);
    const {
        data: dataRenovados,
        loading: loadingRenovados,
        error: errorRenovados
    } = useQuery<GetResponseCortesRenovados>(OBTENER_CORTES_RENOVADOS, {
        variables: { nombre }
    });

    const { data, loading, error } = useQuery<GetResponseCortesPorSuerte>(OBTENER_CORTES_POR_SUERTE, {
        variables: { idSuerte: id_suerte }
    });
    const { openModal, formType, setOpenModal, setFormType } = useCorte();

    if (errorRenovados) return <Alert message={errorRenovados.message} />;
    if (error) return <Alert message={error.message} />;

    return (
        <>
            {openModal && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => setOpenModal(false)}
                    title={'Registrar fecha de corte'}
                    height={90}
                    closeBack={false}
                    id="modal-corte"
                >
                    <CorteActualizar formType={formType} handleClose={() => setOpenModal(false)} />
                </DialogModal>
            )}
            <CerrarCortePopover open={open} handleClose={() => setOpen(false)} corteId={corteId} />
            {data?.obtenerCortesPorSuerte === 0 && user.rol === 1 && (
                <Grid2 size={12} sx={{ paddingBottom: 2 }}>
                    <Chip
                        label="Registrar Corte"
                        color="error"
                        onClick={() => {
                            setFormType('create');
                            setOpenModal(true);
                        }}
                        icon={<AddCircleOutlineOutlinedIcon />}
                    />
                </Grid2>
            )}

            <Grid2 size={12} sx={{ paddingTop: 2 }}>
                {!loading && !loadingRenovados && (
                    <div style={{ width: '100%' }}>
                        {dataRenovados?.obtenerCortesRenovados.length === 0 ? (
                            <Typography variant="h4" component="h4" color="text.primary" textAlign="center">
                                No hay cortes
                            </Typography>
                        ) : (
                            <Cortes
                                data={dataRenovados?.obtenerCortesRenovados!}
                                user={user}
                                id_suerte={id_suerte}
                                setOpen={setOpen}
                                setCorteId={setCorteId}
                            />
                        )}
                    </div>
                )}
            </Grid2>
        </>
    );
};

export default ListCortes;
