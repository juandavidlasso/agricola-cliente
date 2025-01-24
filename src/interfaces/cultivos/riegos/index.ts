import { AplicacionRiegos } from './aplicacion';

export interface Riego {
    id_riego: number;
    fecha: string;
    num_riego: number;
    corte_id: number;
    listAplicacionesRiegos: AplicacionRiegos[];
}

export interface FormDataRiego {
    fecha: string;
}

export interface GetRiegosResponse {
    obtenerRiegosCorte: Riego[];
}

export interface GetRiegoRegister {
    agregarRiego: Riego;
}

export interface GetRiegoUpdate {
    actualizarRiego: Riego;
}

export interface GetRiegoMayorResponse {
    obtenerRiegosMayor: number;
}
