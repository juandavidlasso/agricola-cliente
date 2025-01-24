import { Suerte } from '../suerte';
import { TablonState } from '../tablones';

export interface Corte {
    id_corte: number;
    numero: number;
    fecha_inicio: string;
    fecha_siembra: string;
    fecha_corte?: string;
    activo?: boolean;
    estado: boolean;
    area?: number;
    suerte_id: number;
    listTablones?: TablonState[];
    suertePadre?: Suerte;
}

export interface GetRegisterCorte {
    agregarCorte: Corte;
}

export interface GetResponseCortesRenovados {
    obtenerCortesRenovados: Corte[];
}

export interface GetResponseCortesPorSuerte {
    obtenerCortesPorSuerte: number;
}

export interface GetCorteResponse {
    obtenerCorte: Corte;
}

export interface FormUpdateCorte {
    numero: number;
    fecha_inicio: string | null;
    fecha_siembra: string | null;
}

export interface FormDataCorte {
    fecha_corte: string;
}

export interface GetActualizarCorteResponse {
    actualizarCorte: Corte;
}
