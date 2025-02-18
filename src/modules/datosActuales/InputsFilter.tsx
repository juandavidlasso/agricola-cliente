import React from 'react';
import { useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Button, FormControl, Grid2 } from '@mui/material';
import Select, { ActionMeta, MultiValue, StylesConfig } from 'react-select';
import Alert from '@components/Alert';
import ModalLoading from '@components/Modal';
import { OBTENER_SUERTES_RENOVADAS } from '@graphql/queries';
import { GetSuertesRenovadasResponse } from '@interfaces/cultivos/suerte';

const colourStyles: StylesConfig<any, true> = {
    control: (styles) => ({ ...styles, height: '60px' })
};

interface Props {
    submitForm: (suerteNames: string[]) => void;
}

const InputsFilter: React.FC<Props> = ({ submitForm }) => {
    const { handleSubmit } = useForm();
    const { data, loading, error } = useQuery<GetSuertesRenovadasResponse>(OBTENER_SUERTES_RENOVADAS);
    const [suerteNames, setSuerteNames] = React.useState<string[]>([]);

    const handleChange = (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => {
        const suertes = newValue.map((value) => value.value);
        setSuerteNames(suertes);
    };

    if (error) return <Alert message={error.message} />;

    if (loading) return <ModalLoading isOpen={loading} />;

    const newData =
        data?.obtenerSuertesRenovadas.length === 0
            ? []
            : data?.obtenerSuertesRenovadas.map((suerte) => ({
                  value: suerte.nombre,
                  label: suerte.nombre
              }));

    return (
        <form className="!w-full !contents" onSubmit={handleSubmit(() => submitForm(suerteNames))}>
            <Grid2 size={12}>
                <FormControl className="!w-[40%] max-lg:!w-full">
                    <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={newData}
                        placeholder="Suertes"
                        styles={colourStyles}
                        onChange={handleChange}
                    />
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
