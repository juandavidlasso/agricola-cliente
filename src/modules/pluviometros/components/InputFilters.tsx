import React, { useContext } from 'react';
import { FormControl, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { meses, years } from '../constants/constants';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';

interface Props {}

const InputFilters: React.FC<Props> = ({}) => {
    const { filtersLluvia, setFiltersLluvia } = useContext(PluviometroContext);

    return (
        <>
            <Grid2 size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                    <InputLabel id="mesInicial">Seleccione mes</InputLabel>
                    <Select
                        labelId="mesInicial"
                        label="Seleccione mes"
                        onChange={(event: SelectChangeEvent<unknown>) => {
                            setFiltersLluvia({
                                ...filtersLluvia!,
                                month: Number(event.target.value)
                            });
                        }}
                    >
                        {meses.map((mes) => (
                            <MenuItem key={mes.id} value={mes.value}>
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
                </FormControl>
            </Grid2>
        </>
    );
};

export default InputFilters;
