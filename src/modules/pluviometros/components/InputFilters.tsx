import React, { useContext } from 'react';
import { Checkbox, FormControl, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { meses, years } from '../constants/constants';
import { PluviometroContext } from '@context/lluvias/PluviometroContext';

interface Props {}

const InputFilters: React.FC<Props> = ({}) => {
    const { filtersLluvia, setFiltersLluvia } = useContext(PluviometroContext);
    const currentDate = new Date();
    const currentMonth = currentDate?.getMonth() + 1;
    const currentYear = currentDate?.getFullYear();

    return (
        <>
            <Grid2 size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                    <InputLabel id="mesInicial">Seleccione mes</InputLabel>
                    <Select
                        multiple
                        labelId="mesInicial"
                        label="Seleccione mes"
                        value={filtersLluvia?.month}
                        renderValue={(selected) => {
                            return selected
                                ?.map((month) => meses?.find((m) => m?.value === month)?.label)
                                ?.filter(Boolean)
                                ?.join(', ');
                        }}
                        onChange={(event) => {
                            const index = event?.target?.value?.length;
                            if (
                                (event?.target?.value as number[])?.[index - 1] > currentMonth &&
                                filtersLluvia?.year === currentYear
                            )
                                return;
                            setFiltersLluvia({
                                ...filtersLluvia!,
                                month: event.target.value as number[]
                            });
                        }}
                    >
                        <MenuItem value="">Seleccione el mes</MenuItem>
                        {meses.map((mes) => (
                            <MenuItem key={mes.id} value={mes.value}>
                                <Checkbox
                                    disabled={mes.value > currentMonth && filtersLluvia?.year === currentYear}
                                    checked={filtersLluvia?.month?.includes(mes?.value)}
                                    sx={{ color: '#000000' }}
                                />
                                {mes.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                    <InputLabel id="year">Seleccione año</InputLabel>
                    <Select
                        labelId="year"
                        label="Seleccione año"
                        onChange={(event: SelectChangeEvent<unknown>) => {
                            const newYear = Number(event.target.value);

                            const currentDate = new Date();
                            const currentMonth = currentDate.getMonth() + 1;
                            const currentYear = currentDate.getFullYear();

                            const filteredMonths =
                                newYear === currentYear
                                    ? filtersLluvia?.month?.filter((m) => m <= currentMonth)
                                    : filtersLluvia?.month;

                            setFiltersLluvia({
                                ...filtersLluvia!,
                                year: newYear,
                                month: filteredMonths
                            });
                        }}
                        value={filtersLluvia?.year || ''}
                    >
                        <MenuItem value="">Seleccione el año</MenuItem>
                        {years.map((year) => (
                            <MenuItem key={year.id} value={year.value}>
                                {year.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid2>
        </>
    );
};

export default InputFilters;
