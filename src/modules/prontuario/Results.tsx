import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
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
import { OBTENER_PRONTUARIO } from '@graphql/queries';
import { FormDataProntuario, GetProntuarioResponse } from '@interfaces/prontuario';
import { useProntuario } from './hooks/useProntuario';

interface Props {
    filters: FormDataProntuario & { nombre: string };
}

const Results: React.FC<Props> = ({ filters }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { selectedColumns, handleColumnChange, generarPDF, selectAllColumns, deselectAllColumns } = useProntuario();
    const { data, loading, error } = useQuery<GetProntuarioResponse>(OBTENER_PRONTUARIO, {
        variables: { prontuarioInput: filters }
    });
    if (error) return <Alert message={error.message} />;
    if (loading) return <ModalLoading isOpen={loading} />;

    const isAnyColumnSelected = Object.values(selectedColumns).includes(true);

    return (
        <>
            {data?.consultarProntuario.length === 0 ? (
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
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
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
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
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
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
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
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.corteNo}
                                                        onChange={() => handleColumnChange('corteNo')}
                                                    />
                                                }
                                                label="Corte No."
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.fechaSiembra}
                                                        onChange={() => handleColumnChange('fechaSiembra')}
                                                    />
                                                }
                                                label="Fecha siembra"
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.ultimoCorte}
                                                        onChange={() => handleColumnChange('ultimoCorte')}
                                                    />
                                                }
                                                label="Último Corte"
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.edadCorte}
                                                        onChange={() => handleColumnChange('edadCorte')}
                                                    />
                                                }
                                                label="Edad Corte"
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.tch}
                                                        onChange={() => handleColumnChange('tch')}
                                                    />
                                                }
                                                label="TCH"
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.tchm}
                                                        onChange={() => handleColumnChange('tchm')}
                                                    />
                                                }
                                                label="TCHM"
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.peso}
                                                        onChange={() => handleColumnChange('peso')}
                                                    />
                                                }
                                                label="Peso"
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.rendimiento}
                                                        onChange={() => handleColumnChange('rendimiento')}
                                                    />
                                                }
                                                label="Rendimiento %"
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.vagones}
                                                        onChange={() => handleColumnChange('vagones')}
                                                    />
                                                }
                                                label="Número Vagones"
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell align="left" className="!pt-0 !align-top">
                                        <FormGroup>
                                            <FormControlLabel
                                                className="!m-0"
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '14px !important',
                                                        textAlign: 'center'
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{ color: '#000000' }}
                                                        checked={selectedColumns.mulas}
                                                        onChange={() => handleColumnChange('mulas')}
                                                    />
                                                }
                                                label="Número Mulas"
                                                labelPlacement="bottom"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.consultarProntuario.map((row) => {
                                    const finicio = moment(row.cortePadre?.fecha_inicio);
                                    const fcorte = moment(row.cortePadre?.fecha_corte);
                                    const edadCorte = fcorte.diff(finicio, 'months', true).toFixed(1);
                                    // Calcular TCH

                                    const peso = row.peso ? row.peso : 0;
                                    const area = row.cortePadre?.area ? row.cortePadre?.area : 0;
                                    const TCH = Number((peso! / area!).toFixed(1));
                                    // Calcular TCHN
                                    const TCHM = !error
                                        ? Number((Number((peso! / area!).toFixed(1)) / Number(edadCorte)).toFixed(1))
                                        : 0;

                                    return (
                                        <TableRow key={row.id_cosecha}>
                                            <TableCell align="left">{row.cortePadre?.suertePadre?.nombre}</TableCell>
                                            <TableCell align="left">
                                                {row.cortePadre?.area ? row.cortePadre.area.toFixed(2) : 0}
                                            </TableCell>
                                            <TableCell align="left">{row.cortePadre?.suertePadre?.variedad}</TableCell>
                                            <TableCell align="left">{row.cortePadre?.numero}</TableCell>
                                            <TableCell align="left">{row.cortePadre?.fecha_siembra}</TableCell>
                                            <TableCell align="left">{row.cortePadre?.fecha_corte}</TableCell>
                                            <TableCell align="left">{edadCorte}</TableCell>
                                            <TableCell align="left">{TCH}</TableCell>
                                            <TableCell align="left">{TCHM}</TableCell>
                                            <TableCell align="left">{row.peso}</TableCell>
                                            <TableCell align="left">{row.rendimiento}</TableCell>
                                            <TableCell align="left">{row.numeroVagones ?? null}</TableCell>
                                            <TableCell align="left">{row.numeroMulas ?? null}</TableCell>
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

export default Results;
