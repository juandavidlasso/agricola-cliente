import { Corte } from '../cortes';

export interface Cosecha {
    id_cosecha: number;
    peso: number;
    rendimiento?: number;
    numeroVagones?: number;
    numeroMulas?: number;
    corte_id: number;
    cortePadre?: Corte;
}

export interface FormDataCosecha {
    peso: number;
    rendimiento?: number;
    numeroVagones?: number;
    numeroMulas?: number;
}

export interface GetCosechaRegister {
    agregarCosecha: Cosecha;
}

export interface GetCosechaUpdate {
    actualizarCosecha: Cosecha;
}

export interface GetCosechaResponse {
    obtenerCosechaCorte: Cosecha;
}
