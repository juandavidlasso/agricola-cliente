import { AplicacionFertilizante } from '../aplicacion';

export interface AplicacionesFertilizantes {
    id_aplicaciones_fertilizantes: number;
    corte_id: number;
    apfe_id: number;
    aplicacionFertilizante: AplicacionFertilizante;
}

export interface GetAplicacionesFertilizantesRegister {
    agregarAplicacionesFertilizantes: number[];
}

export interface GetAplicacionesFertilizantesCorteResponse {
    obtenerAplicacionesFertilizantesCorte: AplicacionesFertilizantes[];
}

export interface GetDeleteAplicacionesFertilizantesResponse {
    eliminarAplicacionesFertilizantes: boolean;
}
