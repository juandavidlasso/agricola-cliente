import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { FormDataFilters, meses, years } from '../constants/constants';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';

const schema = yup.object({
    id_pluviometro: yup.number().required('El pluviómetro es requerido.').typeError('El pluviómetro es requerido.'),
    year: yup.number().required('El año es requerido.').typeError('El año es requerido.')
});

interface Props {}

const InputFilters: React.FC<Props> = ({}) => {
    const { arrayPluviometros, filtersLluvia, setOpenModalReport, setTitle, setFiltersLluvia, setReportType } =
        useContext(PluviometroContext);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataFilters>({
        resolver: yupResolver(schema),
        defaultValues: {
            id_pluviometro: undefined,
            inicial: undefined,
            final: undefined,
            year: undefined
        }
    });

    const submitFilters = async (data: FormDataFilters) => {
        const filters = { ...data };
        if (!filters.inicial) {
            filters.inicial = 0;
        }
        if (!filters.final) {
            filters.final = 0;
        }
        setReportType('pluviometro');
        setFiltersLluvia(filters);
        setTitle('Listado de lluvias');
        setOpenModalReport(true);
    };

    return (
        <form onSubmit={handleSubmit(submitFilters)} className="!w-full !contents">
            <Grid2 size={{ xs: 12, sm: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="pluviometroId">Pluviómetro</InputLabel>
                    <Select labelId="pluviometroId" label="Pluviómetro" {...register('id_pluviometro')}>
                        {arrayPluviometros.map((item) => (
                            <MenuItem key={item.id_pluviometro} value={item.id_pluviometro}>
                                {item.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.id_pluviometro && (
                        <Typography className="!text-red-600 !text-sm !ml-2">{errors.id_pluviometro.message}</Typography>
                    )}
                </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="mesInicial">Seleccione mes inicial</InputLabel>
                    <Select
                        labelId="mesInicial"
                        label="Seleccione mes inicial"
                        {...register('inicial')}
                        onChange={(event: SelectChangeEvent<unknown>) => {
                            setFiltersLluvia({
                                ...filtersLluvia!,
                                inicial: Number(event.target.value)
                            });
                        }}
                    >
                        <MenuItem value={''} className="!italic !font-bold">
                            {'Sin mes'}
                        </MenuItem>
                        {meses.map((mes) => (
                            <MenuItem key={mes.id} value={mes.value}>
                                {mes.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="mesFinal">Seleccione mes final</InputLabel>
                    <Select labelId="mesFinal" label="Seleccione mes final" {...register('final')}>
                        <MenuItem value={''} className="!italic !font-bold">
                            {'Sin mes'}
                        </MenuItem>
                        {meses.map((mes) => (
                            <MenuItem key={mes.id} value={mes.value}>
                                {mes.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="year">Seleccione año</InputLabel>
                    <Select
                        labelId="year"
                        label="Seleccione año"
                        {...register('year')}
                        onChange={(event: SelectChangeEvent<unknown>) => {
                            setFiltersLluvia({
                                ...filtersLluvia!,
                                year: Number(event.target.value)
                            });
                        }}
                    >
                        {years.map((year) => (
                            <MenuItem key={year.id} value={year.value}>
                                {year.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.year && <Typography className="!text-red-600 !text-sm !ml-2">{errors.year.message}</Typography>}
                </FormControl>
            </Grid2>
            <Grid2 size={12}>
                <Button variant="outlined" type="submit">
                    Consultar
                </Button>
            </Grid2>
        </form>
    );
};

export default InputFilters;
