import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, Grid2, Typography } from '@mui/material';
import useAppSelector from '@hooks/useAppSelector';
import { GetResponseTablonesCorteAplicacionesPlagas } from '@interfaces/cultivos/tablones';
import { IRootState } from '@interfaces/store';
import { OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS } from '@graphql/queries';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import Plaga from './Plaga';
import { usePlagas } from './hooks/usePlagas';
import PopoverPlagas from './PopoverPlagas';
import DialogModal from '@components/Dialog';
import ListTratamientoPlagas from './tratamiento/ListTratamientoPlagas';

interface Props {}

const ListPlagas: React.FC<Props> = ({}) => {
    const {
        corte: { id_corte, estado, numero },
        suerte: { nombre }
    } = useAppSelector((state: IRootState) => state.cultivosReducer);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, loading, error } = useQuery<GetResponseTablonesCorteAplicacionesPlagas>(
        OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS,
        {
            variables: { idCorte: id_corte }
        }
    );
    const {
        openModal,
        formType,
        typeModal,
        modalTratamientos,
        tratamientoPlagaEdit,
        aplicacionPlagaEdit,
        setTratamientoPlagaEdit,
        setFormType,
        setOpenModal,
        setTypeModal,
        setModalTratamientos,
        setAplicacionPlagaEdit
    } = usePlagas();

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;
    return (
        <>
            {openModal && (
                <PopoverPlagas
                    tratamientoPlaga={tratamientoPlagaEdit}
                    aplicacionPlaga={aplicacionPlagaEdit}
                    typeModal={typeModal}
                    formType={formType}
                    handleClose={() => setOpenModal(false)}
                />
            )}
            {modalTratamientos && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => setModalTratamientos(false)}
                    title={`Aplicar producto - Suerte ${nombre} - Corte ${numero}`}
                    height={90}
                    width="90%"
                    id="modal-tablones-plagas"
                >
                    <ListTratamientoPlagas
                        setFormType={setFormType}
                        setTypeModal={setTypeModal}
                        setOpenModal={setOpenModal}
                        setTratamientoPlagaEdit={setTratamientoPlagaEdit}
                    />
                </DialogModal>
            )}
            <Grid2 container spacing={2}>
                {estado && rol === 1 && (
                    <>
                        <Grid2 size={12}>
                            <Button variant="contained" onClick={() => setModalTratamientos(true)}>
                                Aplicar producto
                            </Button>
                        </Grid2>
                        <Grid2 size={12}>
                            <Button
                                variant="outlined"
                                color="info"
                                onClick={() => {
                                    setFormType('create');
                                    setTypeModal('tratamiento');
                                    setOpenModal(true);
                                }}
                            >
                                Registrar producto
                            </Button>
                        </Grid2>
                    </>
                )}
                {data?.obtenerTablonesYAplicacionesPlagas.length === 0 ? (
                    <Typography>No hay tablones registrados</Typography>
                ) : (
                    data?.obtenerTablonesYAplicacionesPlagas.map((tablon) => (
                        <Plaga
                            key={tablon.id_tablon}
                            tablon={tablon}
                            setAplicacionPlaga={setAplicacionPlagaEdit}
                            setFormType={setFormType}
                            setOpenModal={setOpenModal}
                            setTypeModal={setTypeModal}
                        />
                    ))
                )}
            </Grid2>
        </>
    );
};

export default ListPlagas;
