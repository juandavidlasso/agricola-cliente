import { TratamientoFertilizante } from '../tratamientos';

export interface AplicacionFertilizante {
    id_apfe: number;
    fecha: string;
    tipo: string;
    suertes?: string;
    listTratamientoFertilizante?: TratamientoFertilizante[];
}

export interface FormDataAplicacionFertilizante {
    fecha: string;
    tipo: string;
}

export interface GetAplicacionFertilizanteResponse {
    obtenerAplicacionesFertilizantes: AplicacionFertilizante[];
}

export interface GetAplicacionFertilizanteRegister {
    agregarAplicacionFertilizante: AplicacionFertilizante;
}

export interface GetAplicacionFertilizanteUpdate {
    actualizarAplicacionFertilizante: AplicacionFertilizante;
}
