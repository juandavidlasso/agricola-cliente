import React, { useContext, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import {
    Button,
    Grid2,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { OBTENER_COSECHA_CORTE } from '@graphql/queries';
import ModalLoading from '@components/Modal';
import { GetCosechaResponse } from '@interfaces/cultivos/cosechas';
import useAppSelector from '@hooks/useAppSelector';
import { IRootState } from '@interfaces/store';
import CorteUpdatePopover from './CorteUpdatePopover';
import Alert from '@components/Alert';
import { CultivosContext } from '@context/cultivos/CultivosContext';
import { useCosecha } from './hooks/useCosecha';
import DialogModal from '@components/Dialog';
import CosechaRegister from './CosechaRegister';

interface Props {}

const ListCosecha: React.FC<Props> = () => {
    const { validateCosecha, setValidateCosecha } = useContext(CultivosContext);
    const [step, setStep] = useState<number>(1);
    const { id_corte, fecha_inicio, fecha_corte, estado } = useAppSelector((state: IRootState) => state.cultivosReducer.corte);
    const { rol } = useAppSelector((state: IRootState) => state.userReducer.user);
    const { data, error, loading } = useQuery<GetCosechaResponse>(OBTENER_COSECHA_CORTE, {
        variables: { idCorte: id_corte }
    });
    const getTotal = useMemo(() => (data?.obtenerCosechaCorte ?? []).reduce((acc, { peso = 0 }) => acc + peso, 0), [data]);
    const { cosechaEdit, openModal, formType, setCosechaEdit, setOpenModal, setFormType } = useCosecha();

    if (error) return <Alert message={error.message} />;
    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <>
            {openModal && (
                <DialogModal
                    isOpen={true}
                    handleClose={() => {
                        if (step === 1) {
                            setOpenModal(false);
                        }
                    }}
                    title={formType === 'create' ? 'Registrar cosecha' : 'Actualizar cosecha'}
                    height={85}
                    width={step === 1 ? '60%' : '30%'}
                    id="modal-cosecha"
                >
                    {step === 1 ? (
                        <CosechaRegister
                            formType={formType}
                            cosecha={cosechaEdit}
                            handleClose={() => setOpenModal(false)}
                            nextStep={() => setStep(2)}
                        />
                    ) : (
                        <Grid2 container spacing={2}>
                            <Grid2 size={12}>
                                <Typography>Desea registrar otra cosecha?</Typography>
                            </Grid2>
                            <Grid2 size={12} display="flex" justifyContent="center" gap={3} mt={2}>
                                <Button color="primary" variant="contained" type="button" onClick={() => setStep(1)}>
                                    Si
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="button"
                                    onClick={() => {
                                        setOpenModal(false);
                                        setValidateCosecha(true);
                                    }}
                                >
                                    No
                                </Button>
                            </Grid2>
                        </Grid2>
                    )}
                </DialogModal>
            )}
            {validateCosecha && <CorteUpdatePopover />}
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
                            Registrar cosecha
                        </Button>
                    </Grid2>
                )}
                <Grid2 size={12}>
                    {!data || !data?.obtenerCosechaCorte ? (
                        <Typography>No hay cosecha registrada</Typography>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Número Suerte</TableCell>
                                        <TableCell align="center">Peso Neto - Tn</TableCell>
                                        <TableCell align="center">TCH</TableCell>
                                        <TableCell align="center">TCHM</TableCell>
                                        <TableCell align="center">% - Rendimiento</TableCell>
                                        <TableCell align="center">Número Vagones</TableCell>
                                        <TableCell align="center">Número Mulas</TableCell>
                                        <TableCell align="center">Nota</TableCell>
                                        {estado && rol === 1 && <TableCell align="center">Acciones</TableCell>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.obtenerCosechaCorte?.length > 0
                                        ? data?.obtenerCosechaCorte?.map((cosecha) => {
                                              // Calcular TCH
                                              const peso = cosecha?.peso;
                                              const area =
                                                  data &&
                                                  cosecha?.cortePadre?.listTablones?.reduce((cur, val) => cur + val.area, 0);
                                              const TCH = Number((peso! / area!).toFixed(1));
                                              // Calcular TCHN
                                              const finicio = moment(fecha_inicio);
                                              const fcorte = moment(fecha_corte);
                                              const edadCorte = fcorte.diff(finicio, 'months', true).toFixed(1);
                                              const TCHM = Number(
                                                  (Number((peso! / area!).toFixed(1)) / Number(edadCorte)).toFixed(1)
                                              );
                                              return (
                                                  <TableRow key={cosecha?.id_cosecha}>
                                                      <TableCell align="center">{cosecha?.numeroSuerte}</TableCell>
                                                      <TableCell align="center">{cosecha?.peso}</TableCell>
                                                      <TableCell align="center">{TCH}</TableCell>
                                                      <TableCell align="center">{TCHM}</TableCell>
                                                      <TableCell align="center">{cosecha?.rendimiento}</TableCell>
                                                      <TableCell align="center">{cosecha?.numeroVagones}</TableCell>
                                                      <TableCell align="center">{cosecha?.numeroMulas}</TableCell>
                                                      <TableCell
                                                          align="left"
                                                          dangerouslySetInnerHTML={{
                                                              __html: cosecha?.nota?.replaceAll(/\n/g, '<br />') ?? ''
                                                          }}
                                                      />
                                                      {estado && rol === 1 && (
                                                          <TableCell align="center">
                                                              <Button
                                                                  onClick={() => {
                                                                      setFormType('update');
                                                                      setCosechaEdit(cosecha);
                                                                      setOpenModal(true);
                                                                  }}
                                                                  variant="contained"
                                                                  sx={{
                                                                      color: '#FFFFFF',
                                                                      fontSize: 10,
                                                                      minWidth: 70,
                                                                      maxWidth: 80,
                                                                      border: '1px solid #D4AC0D !important',
                                                                      background: '#D4AC0D !important',
                                                                      ':hover': {
                                                                          background: '#D4AC0D90 !important',
                                                                          border: '1px solid #D4AC0D !important',
                                                                          color: '#FFFFFF !important'
                                                                      }
                                                                  }}
                                                              >
                                                                  Editar
                                                              </Button>
                                                          </TableCell>
                                                      )}
                                                  </TableRow>
                                              );
                                          })
                                        : null}
                                    {data?.obtenerCosechaCorte?.length > 0 && (
                                        <TableRow>
                                            <TableCell align="center">
                                                <span className="font-bold text-xl">Total</span>
                                            </TableCell>
                                            <TableCell align="center">
                                                <span className="font-bold text-xl">{getTotal}</span>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid2>
            </Grid2>
        </>
    );
};

export default ListCosecha;
