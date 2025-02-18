import React, { useContext } from 'react';
import { TableCell, TableRow, TextField } from '@mui/material';
import { Pluviometro } from '@interfaces/pluviometros';
import { PluviometroContext } from 'src/context/lluvias/PluviometroContext';

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;

interface Props {
    pluviometro: Pluviometro;
}

const Pluviometros: React.FC<Props> = ({ pluviometro }) => {
    const { arrayLluvias, isEnabled, setArrayLluvias } = useContext(PluviometroContext);
    function getDaysActualMonth(): number {
        const actualDate = new Date();
        const year = actualDate.getFullYear();
        const month = actualDate.getMonth();
        const lastDay = new Date(year, month + 1, 0);
        return lastDay.getDate();
    }

    const handleChange = (day: number, value: number, id_pluviometro: number) => {
        const fecha = `${currentYear}-${formattedMonth}-${day + 1}`;

        setArrayLluvias((prevAplicaciones) => {
            if (value === 0) {
                return prevAplicaciones.filter((app) => app.fecha !== fecha || app.pluviometro_id !== pluviometro.id_pluviometro);
            } else {
                const index = prevAplicaciones.findIndex((app) => app.fecha === fecha && app.pluviometro_id === id_pluviometro);

                if (index !== -1) {
                    const updatedArray = [...prevAplicaciones];
                    updatedArray[index].cantidad = value;
                    return updatedArray;
                } else {
                    return [
                        ...prevAplicaciones,
                        {
                            cantidad: value,
                            fecha,
                            pluviometro_id: id_pluviometro,
                            lluvia_id: 0
                        }
                    ];
                }
            }
        });
    };

    return (
        <TableRow key={pluviometro.id_pluviometro} sx={{ height: '30px !important' }}>
            <TableCell component="th" scope="row" className="!p-0 !text-center !border-r-[0.5px]">
                {pluviometro.nombre}
                <br />
                <span className="!font-bold !text-[11px] !text-left">Suerte {pluviometro.suertesAsociadas}</span>
            </TableCell>
            {Array.from({ length: getDaysActualMonth() }).map((_, day) => {
                const fecha = `${currentYear}-${formattedMonth}-${day + 1}`;

                return (
                    <TableCell key={day + 1} align="left" className="!border-r-[0.5px] !p-0 !text-center">
                        {pluviometro?.listAplicacionesLluvias?.some((lluvia) => {
                            const { fecha } = lluvia!.lluviaPadre!;
                            const nuevaFecha = fecha.split('-')[2];
                            const fechaNueva = nuevaFecha[0] === '0' ? nuevaFecha.slice(1) : nuevaFecha;
                            return Number(fechaNueva) === day + 1;
                        }) ? (
                            pluviometro?.listAplicacionesLluvias?.map((lluvia) => {
                                const { id_lluvia, cantidad, fecha } = lluvia!.lluviaPadre!;
                                const nuevaFecha = fecha.split('-')[2];
                                const fechaNueva = nuevaFecha[0] === '0' ? nuevaFecha.slice(1) : nuevaFecha;
                                if (Number(fechaNueva) === day + 1) {
                                    return (
                                        <span
                                            key={id_lluvia}
                                            className="!p-[5px] !text-white !bg-blue-700"
                                            style={{ borderRadius: '7px' }}
                                        >
                                            {cantidad}
                                        </span>
                                    );
                                }
                                return null;
                            })
                        ) : isEnabled ? (
                            <TextField
                                value={
                                    arrayLluvias?.find(
                                        (app) => app.fecha === fecha && app.pluviometro_id === pluviometro.id_pluviometro
                                    )?.cantidad || ''
                                }
                                onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    handleChange(day, Number(event.target.value), pluviometro.id_pluviometro)
                                }
                                sx={{
                                    '& input': {
                                        padding: '10px 3px'
                                    }
                                }}
                            />
                        ) : null}
                    </TableCell>
                );
            })}
            <TableCell align="left" className="!border-r-[0.5px] !p-0 !text-center">
                0
            </TableCell>
        </TableRow>
    );
};

export default Pluviometros;
