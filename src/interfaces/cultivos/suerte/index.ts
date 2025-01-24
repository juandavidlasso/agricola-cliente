import { Corte } from '../cortes';

export interface Suerte {
    id_suerte: number;
    nombre: string;
    renovada: string;
    variedad: string;
    zona: string;
    area?: number;
    listcortes?: Corte[];
    createdAt?: string;
    updatedAt?: string;
}

export interface FormDataSuerte {
    nombre: string;
    variedad: string;
    zona: string;
}

export interface GetSuertesRenovadasResponse {
    obtenerSuertesRenovadas: Suerte[];
}

export interface GetSuerteResponse {
    obtenerSuerte: Suerte;
}

export interface FormUpdateSuerte {
    nombre: string;
    variedad: string;
    zona: string;
    renovada: string;
}

export interface GetRenovarSuerteResponse {
    agregarSuerteRenovada: Suerte;
}

export interface GetAgregarSuerteResponse {
    agregarSuerte: Suerte;
}

export interface GetActualizarSuerteResponse {
    actualizarSuerte: Suerte;
}

export interface GetEliminarSuerteResponse {
    eliminarSuerte: boolean;
}

export interface GetAreaSuerteResponse {
    obtenerAreaSuerte: number;
}

export interface GetTablonesSuerteResponse {
    countTablonesPorSuerte: number;
}

export interface GetCorteActualResponse {
    obtenerCorteActual: Corte;
}

export interface GetSuertesRenovadasYCortes {
    obtenerSuertesRenovadasYCortes: Suerte[];
}
