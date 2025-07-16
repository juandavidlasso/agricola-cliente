import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import { GetRiegosResponse } from '@interfaces/cultivos/riegos';
import { OBTENER_RIEGOS_CORTE } from '@graphql/queries';
import ModalLoading from '@components/Modal';
import Alert from '@components/Alert';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import Riegos from './Riegos';
import { useRiegos } from './hooks/useRiegos';
import DialogModal from '@components/Dialog';
import RiegoDelete from './RiegoDelete';
import RiegoRegister from './RiegoRegister';

interface Props {}

const ListRiegos: React.FC<Props> = ({}) => {
    const { id_corte } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, error, loading } = useQuery<GetRiegosResponse>(OBTENER_RIEGOS_CORTE, { variables: { corteId: id_corte } });
    const { openModal, formType, riegoEdit, setOpenModal, setFormType, setRiegoEdit } = useRiegos();

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {openModal && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => setOpenModal(false)}
                    title={
                        formType === 'create' ? 'Registrar riego' : formType === 'delete' ? 'Eliminar riego' : 'Actualizar riego'
                    }
                    height={50}
                    width="40%"
                    id="modal-riegos"
                >
                    {formType === 'delete' ? (
                        <RiegoDelete riego={riegoEdit} handleClose={() => setOpenModal(false)} />
                    ) : (
                        <RiegoRegister riego={riegoEdit} formType={formType} handleClose={() => setOpenModal(false)} />
                    )}
                </DialogModal>
            )}
            <Grid2 container>
                {rol === 1 && (
                    <Grid2 size={12}>
                        <Button
                            variant="contained"
                            className="!mb-5"
                            onClick={() => {
                                setFormType('create');
                                setOpenModal(true);
                            }}
                        >
                            Registrar riego
                        </Button>
                    </Grid2>
                )}
                {data?.obtenerRiegosCorte.length === 0 ? (
                    <Typography>No hay riegos registrados</Typography>
                ) : (
                    data?.obtenerRiegosCorte.map((riego) => (
                        <Riegos
                            key={riego.id_riego}
                            riego={riego}
                            setOpenModal={setOpenModal}
                            setFormType={setFormType}
                            setRiegoEdit={setRiegoEdit}
                        />
                    ))
                )}
            </Grid2>
        </>
    );
};

export default ListRiegos;
