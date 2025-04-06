import React, { useContext, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, Grid2, Menu, MenuItem, Typography } from '@mui/material';
import { GetAplicacionPlagaRegister, SuertesCortesTablones } from '@interfaces/cultivos/plagas/aplicacion';
import { REGISTRAR_APLICACION_PLAGA } from '@graphql/mutations';
import { OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS } from '@graphql/queries';
import Loading from '@components/Loading';
import { CultivosContext } from 'src/context/cultivos/CultivosContext';

interface Props {
    suertes: SuertesCortesTablones[];
}

const SuerteTablon: React.FC<Props> = ({ suertes }) => {
    const { tratamientoPlagaEdit, setInfoMessage, setShowMessage, setMessageType } = useContext(CultivosContext);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errorForm, setErrorForm] = useState<boolean>(false);
    const [fecha, setFecha] = useState<string>('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItem, setSelectedItem] = useState<SuertesCortesTablones>();
    const open = Boolean(anchorEl);
    const [agregarAplicacionPlagas] = useMutation<GetAplicacionPlagaRegister>(REGISTRAR_APLICACION_PLAGA);

    const submitForm = async (corteId: number, tablonId: number) => {
        if (!fecha) return setErrorForm(true);
        setSubmitting(true);

        try {
            await agregarAplicacionPlagas({
                variables: {
                    createAplicacionPlagasInput: {
                        fecha,
                        corte_id: corteId,
                        tablon_id: tablonId,
                        trapl_id: tratamientoPlagaEdit?.id_trapl
                    }
                },
                refetchQueries: [
                    {
                        query: OBTENER_TABLONES_CORTE_Y_APLICACIONES_PLAGAS,
                        variables: { idCorte: corteId }
                    }
                ]
            });

            setMessageType('success');
            setInfoMessage('La aplicación se registro exitosamente.');
            setShowMessage(true);
            setSubmitting(false);
        } catch (error) {
            if (error instanceof ApolloError) {
                setMessageType('error');
                setInfoMessage(error.message.replace('Error:', ''));
                setShowMessage(true);
                setSubmitting(false);
                return;
            }
            setMessageType('error');
            setInfoMessage(error as string);
            setShowMessage(true);
            setSubmitting(false);
            return;
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, item: SuertesCortesTablones) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setSelectedItem(undefined);
    };

    return (
        <>
            <Grid2 size={12} mt={2} textAlign={'center'}>
                <Typography>
                    Producto a aplicar: {tratamientoPlagaEdit?.producto} - {tratamientoPlagaEdit?.unidad} -{' '}
                    {tratamientoPlagaEdit?.tiempo}
                </Typography>
            </Grid2>
            <Grid2 size={12} mt={2} textAlign={'center'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Fecha"
                        onChange={(value) => {
                            const newValue = dayjs(value as any).format('YYYY-MM-DD');
                            setFecha(newValue);
                            setErrorForm(false);
                        }}
                        format="DD/MM/YYYY"
                    />
                    {errorForm && (
                        <Typography
                            sx={{
                                color: '#d32f2f',
                                fontSize: '0.75rem',
                                lineHeight: 1.66,
                                textAlign: 'center',
                                mt: '4px',
                                mb: 0
                            }}
                        >
                            Debe ingresar la fecha
                        </Typography>
                    )}
                </LocalizationProvider>
            </Grid2>
            {suertes.map((suerte) => (
                <Grid2 key={suerte.id_suerte} size={{ xs: 12, sm: 3 }} sx={{ textAlign: 'center' }}>
                    <Box>
                        <Button
                            variant="outlined"
                            color="primary"
                            id={suerte.nombre}
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleClick(event, suerte)}
                        >
                            Suerte {suerte.nombre}
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open && selectedItem?.id_suerte === suerte.id_suerte}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button'
                            }}
                        >
                            <MenuItem onClick={handleClose} disabled>
                                Corte {suerte.listcortes[0].numero}
                            </MenuItem>
                            {[...suerte.listcortes[0].listTablones]
                                .sort((a, b) => a.numero - b.numero)
                                .map((tablon) => (
                                    <MenuItem
                                        key={tablon.id_tablon}
                                        onClick={() => {
                                            submitForm(tablon.corte_id, tablon.id_tablon);
                                            handleClose();
                                        }}
                                    >
                                        {submitting ? <Loading /> : `Tablón ${tablon.numero}`}
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                </Grid2>
            ))}
        </>
    );
};

export default SuerteTablon;
