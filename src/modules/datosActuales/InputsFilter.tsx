import React from 'react';
import { useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
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
    SelectChangeEvent
} from '@mui/material';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { OBTENER_SUERTES_RENOVADAS } from '@graphql/queries';
import { GetSuertesRenovadasResponse } from '@interfaces/cultivos/suerte';

interface Props {
    submitForm: (suerteNames: string[]) => void;
}

const InputsFilter: React.FC<Props> = ({ submitForm }) => {
    const { handleSubmit } = useForm();
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
        <form className="!w-full !contents" onSubmit={handleSubmit(() => submitForm(suerteNames))}>
            <Grid2 size={12}>
                <FormControl className="!w-[40%] max-lg:!w-full">
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
                <Button variant="contained" type="submit" className="max-lg:!w-full">
                    Consultar
                </Button>
            </Grid2>
        </form>
    );
};

export default InputsFilter;
