export interface TratamientoPlaga {
    id_trapl: number;
    producto: string;
    unidad: string;
    cantidad: number;
    tiempo: string;
}

export type DataTypePlaga = 'create' | 'update' | 'delete' | 'aplicar';

export interface FormDataPlaga {
    producto: string;
    unidad: string;
    cantidad: number;
    tiempo: string;
}

export interface GetTratamientoPlagaRegister {
    agregarTratamientoPlagas: TratamientoPlaga;
}

export interface GetTratamientoPlagaUpdate {
    agregarTratamientoPlagas: TratamientoPlaga;
}

export interface GetTratamientoPlagasResponse {
    obtenerTratamientoPlagas: TratamientoPlaga[];
}
