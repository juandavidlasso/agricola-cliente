import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
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
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { OBTENER_DATOS_ACTUALES } from '@graphql/queries';
import { GetDatosActualesResponse } from '@interfaces/datosActuales';
import { useDatosActuales } from './hooks/useDatosActuales';

interface Props {
    filters: {
        nombres: string;
    };
    setIsValid: (value: React.SetStateAction<boolean>) => void;
}

const ResultsActuales: React.FC<Props> = ({ filters, setIsValid }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { selectedColumns, handleColumnChange, generarPDF, selectAllColumns, deselectAllColumns } = useDatosActuales();
    const { data, loading, error } = useQuery<GetDatosActualesResponse>(OBTENER_DATOS_ACTUALES, {
        variables: { nombres: filters.nombres }
    });

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setIsValid(false);
            }, 3000);
        }
    }, [loading]);
    if (error) return <Alert message={error.message} />;
    if (loading) return <ModalLoading isOpen={loading} />;

    const isAnyColumnSelected = Object.values(selectedColumns).includes(true);

    return (
        <>
            {data?.obtenerDatosActuales.length === 0 ? (
                <Grid2 size={12}>
                    <Typography>No hay datos para los filtros ingresados</Typography>
                </Grid2>
            ) : (
                <>
                    <Grid2 size={12} mt={2} mb={3} display={'flex'} justifyContent={'flex-start'} gap={2}>
                        <Button variant="outlined" color="success" onClick={selectAllColumns} size="small">
                            Seleccionar todo
                        </Button>
                        <Button variant="outlined" color="success" onClick={deselectAllColumns} size="small">
                            Desmarcar todo
                        </Button>
                    </Grid2>

                    <TableContainer component={Paper} className="!mb-5">
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        <FormGroup>
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.suerte}
                                                        onChange={() => handleColumnChange('suerte')}
                                                    />
                                                }
                                                label="Suerte"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormGroup>
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.area}
                                                        onChange={() => handleColumnChange('area')}
                                                    />
                                                }
                                                label="Área"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormGroup>
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.variedad}
                                                        onChange={() => handleColumnChange('variedad')}
                                                    />
                                                }
                                                label="Variedad"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormGroup>
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.zona}
                                                        onChange={() => handleColumnChange('zona')}
                                                    />
                                                }
                                                label="Zona Agroecológica"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormGroup>
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.fecha}
                                                        onChange={() => handleColumnChange('fecha')}
                                                    />
                                                }
                                                label="Fecha Último Corte"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormGroup>
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.tch}
                                                        onChange={() => handleColumnChange('tch')}
                                                    />
                                                }
                                                label="Último TCH"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormGroup>
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.edad}
                                                        onChange={() => handleColumnChange('edad')}
                                                    />
                                                }
                                                label="Edad Actual (meses)"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormGroup>
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.corte}
                                                        onChange={() => handleColumnChange('corte')}
                                                    />
                                                }
                                                label="# Corte Actual"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.obtenerDatosActuales.map((row) => {
                                    // Calcular area
                                    const areaActual =
                                        row.listcortes?.[0].listTablones?.length === 0
                                            ? 0
                                            : row.listcortes?.[0].listTablones?.reduce((acc, rc) => acc + rc.area, 0);

                                    // Calcular edad actual
                                    const now = dayjs().format('YYYY-MM-DD');
                                    const dateStart = dayjs(row.listcortes?.[0].fecha_inicio).format('YYYY-MM-DD');
                                    const edadActual = dayjs(now).diff(dayjs(dateStart), 'month', true).toFixed(1);

                                    // // Calcular TCH
                                    const peso = row.area ? row.area : 0;
                                    const TCH =
                                        Number(row.renovada) === 0 ? null : Number((peso! / Number(row.renovada)).toFixed(1));

                                    return (
                                        <TableRow key={row.id_suerte}>
                                            <TableCell align="left">{row.nombre}</TableCell>
                                            <TableCell align="left">{areaActual?.toFixed(2)}</TableCell>
                                            <TableCell align="left">{row.variedad}</TableCell>
                                            <TableCell align="left">{row.zona}</TableCell>
                                            <TableCell align="left">{row.createdAt}</TableCell>
                                            <TableCell align="left">{TCH}</TableCell>
                                            <TableCell align="left">{edadActual}</TableCell>
                                            <TableCell align="left">{row.listcortes?.[0].numero}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
            {isAnyColumnSelected && (
                <Grid2 size={12} mt={2} mb={5}>
                    <Button variant="contained" onClick={() => generarPDF(data!, setIsLoading)} disabled={isLoading}>
                        Generar Informe
                    </Button>
                </Grid2>
            )}
        </>
    );
};

export default ResultsActuales;
