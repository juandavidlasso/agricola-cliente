export interface Labores {
    id_labor: number;
    fecha: string;
    actividad: string;
    equipo?: string;
    estado?: string;
    pases?: number;
    aplico?: string;
    costo?: number;
    nota?: string;
    suertes?: string;
}

export type DataType = 'create' | 'update' | 'delete' | 'duplicate' | 'suertes';

export interface AplicacionLabores {
    id_aplicacion_labores: number;
    corte_id: number;
    labor_id: number;
    labor?: Labores;
}

export interface GetLaboresResponse {
    obtenerLabores: Labores[];
}

export interface GetRegisterLabor {
    agregarLabor: Labores;
}

export interface GetRegisterAplicacionLabor {
    agregarAplicacionLabores: number[];
}

export interface FormDataLabores {
    fecha: string;
    actividad: string;
    equipo?: string;
    estado?: string;
    pases?: number;
    aplico?: string;
    costo?: number;
    nota?: string;
}

export interface GetAplicacionLaboresResponse {
    obtenerAplicacionesLabores: AplicacionLabores[];
}

export interface GetDeleteAplicacionLaboresResponse {
    eliminarAplicacionLabores: boolean;
}
