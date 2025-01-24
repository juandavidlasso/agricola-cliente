import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, Grid2, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCorteUpdate } from './hooks/useCorteUpdate';
import Tablones from './Tablones';
import SuerteRenovate from './SuerteRenovate';

interface Props {}

const CorteUpdate: React.FC<Props> = ({}) => {
    const { corte, submitting, step, corteId, submitFormFechaCorte, submitFormPendienteRenovar, submitFormRenovarSuerte } =
        useCorteUpdate();
    const [corteDate, setCorteDate] = useState<string>('');

    return (
        <>
            {step === 0 && (
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <TextField fullWidth size="small" type="text" label="Corte" value={corte.numero} disabled />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            size="small"
                            type="text"
                            label="Fecha de inicio"
                            value={corte.fecha_inicio}
                            disabled
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            size="small"
                            type="text"
                            label="Fecha de siembra"
                            value={corte.fecha_siembra}
                            disabled
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha de corte"
                                onChange={(value) => {
                                    const newValue = dayjs(value as any).format('YYYY-MM-DD');
                                    setCorteDate(newValue);
                                }}
                                format="DD/MM/YYYY"
                                sx={{ mb: 2 }}
                            />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 3 }} display="flex" justifyContent="center" gap={3} mt={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="button"
                            disabled={submitting || !corteDate}
                            className="!text-base !h-fit !pt-3 !pb-3 !pl-0 !pr-0"
                            fullWidth
                            onClick={() =>
                                submitFormRenovarSuerte({
                                    fecha_corte: corteDate
                                })
                            }
                        >
                            Renovar suerte
                        </Button>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4 }} display="flex" justifyContent="center" gap={3} mt={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="button"
                            disabled={submitting || !corteDate}
                            className="!text-base !h-fit !pt-3 !pb-3 !pl-0 !pr-0"
                            fullWidth
                            onClick={() =>
                                submitFormPendienteRenovar({
                                    fecha_corte: corteDate
                                })
                            }
                        >
                            Pendiente renovar
                        </Button>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 5 }} display="flex" justifyContent="center" gap={3} mt={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="button"
                            disabled={submitting || !corteDate}
                            className="!text-base !h-fit !pt-3 !pb-3 !pl-0 !pr-0"
                            fullWidth
                            onClick={() =>
                                submitFormFechaCorte({
                                    fecha_corte: corteDate
                                })
                            }
                        >
                            Registrar corte
                        </Button>
                    </Grid2>
                </Grid2>
            )}
            {step === 1 && <Tablones corteId={corteId} />}
            {step === 2 && <SuerteRenovate />}
        </>
    );
};

export default CorteUpdate;
