import React from 'react';
import { useQuery } from '@apollo/client';
import {
    Button,
    Checkbox,
    FormControl,
    Grid2,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { FormDataProntuario } from '@interfaces/prontuario';
import { GetSuertesRenovadasResponse } from '@interfaces/cultivos/suerte';
import { OBTENER_SUERTES_RENOVADAS } from '@graphql/queries';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';

const schema = yup.object({
    fecha_inicio: yup.string().required('La fecha de inicio es requerida'),
    fecha_fin: yup.string().required('La actividad de fin es requerida')
});

interface Props {
    submitForm: (data: FormDataProntuario, suerteNames: string[]) => void;
}

const InputsFilters: React.FC<Props> = ({ submitForm }) => {
    const {
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<FormDataProntuario>({
        resolver: yupResolver(schema)
    });
    const { data, loading, error } = useQuery<GetSuertesRenovadasResponse>(OBTENER_SUERTES_RENOVADAS);
    const [suerteNames, setSuerteNames] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof suerteNames>) => {
        const {
            target: { value }
        } = event;
        setSuerteNames(typeof value === 'string' ? value.split(',') : value);
    };

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    return (
        <form
            className="!w-full !contents"
            onSubmit={handleSubmit((data: FormDataProntuario, event?: React.BaseSyntheticEvent) => submitForm(data, suerteNames))}
        >
            <Grid2 size={{ xs: 12, sm: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ width: '95%' }}
                        label="Fecha de inicio"
                        onChange={(value) => {
                            const newValue = dayjs(value as any).format('YYYY-MM-DD');
                            setValue('fecha_inicio', newValue);
                        }}
                        format="DD/MM/YYYY"
                    />
                    {!!errors.fecha_inicio && (
                        <Typography
                            sx={{
                                color: '#d32f2f',
                                fontSize: '0.75rem',
                                lineHeight: 1.66,
                                textAlign: 'left',
                                mt: '4px',
                                mr: '14px',
                                mb: 0,
                                ml: '14px'
                            }}
                        >
                            {errors.fecha_inicio.message}
                        </Typography>
                    )}
                </LocalizationProvider>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ width: '95%' }}
                        label="Fecha de fin"
                        onChange={(value) => {
                            const newValue = dayjs(value as any).format('YYYY-MM-DD');
                            setValue('fecha_fin', newValue);
                        }}
                        format="DD/MM/YYYY"
                    />
                    {!!errors.fecha_fin && (
                        <Typography
                            sx={{
                                color: '#d32f2f',
                                fontSize: '0.75rem',
                                lineHeight: 1.66,
                                textAlign: 'left',
                                mt: '4px',
                                mr: '14px',
                                mb: 0,
                                ml: '14px'
                            }}
                        >
                            {errors.fecha_fin.message}
                        </Typography>
                    )}
                </LocalizationProvider>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                    <InputLabel id="suertes-renovadas">Suertes</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={suerteNames}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {(data!.obtenerSuertesRenovadas.length > 0 ? data!.obtenerSuertesRenovadas : []).map((suerte) => (
                            <MenuItem key={suerte.id_suerte} value={suerte.nombre}>
                                <Checkbox checked={suerteNames.includes(suerte.nombre)} sx={{ color: '#000000' }} />
                                <ListItemText primary={suerte.nombre} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid2>
            <Grid2 size={12} mt={2}>
                <Button variant="contained" type="submit">
                    Consultar
                </Button>
            </Grid2>
        </form>
    );
};

export default InputsFilters;
