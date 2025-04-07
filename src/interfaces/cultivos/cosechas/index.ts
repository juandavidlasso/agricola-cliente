import { Corte } from '../cortes';

export interface Cosecha {
    id_cosecha: number;
    peso: number;
    rendimiento?: number;
    numeroVagones?: number;
    numeroMulas?: number;
    nota?: string;
    corte_id: number;
    cortePadre?: Corte;
}

export interface FormDataCosecha {
    peso: number;
    rendimiento?: number;
    numeroVagones?: number;
    numeroMulas?: number;
    nota?: string;
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
