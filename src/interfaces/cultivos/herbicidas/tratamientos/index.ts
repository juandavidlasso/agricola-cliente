export interface TratamientoHerbicidas {
    id_trahe: number;
    producto: string;
    dosis: number;
    presentacion: string;
    valor?: number;
    aplico?: string;
    nota?: string;
    aphe_id: number;
}

export interface FormDataTratamientoHerbicidas {
    producto: string;
    dosis: number;
    presentacion: string;
    valor?: number;
    aplico?: string;
    nota?: string;
}

export interface GetTratamientoHerbicidaRegister {
    agregarTratamientoHerbicida: TratamientoHerbicidas;
}

export interface GetTratamientoHerbicidaUpdate {
    actualizarTratamientoHerbicida: TratamientoHerbicidas;
}

export interface GetAplicacionHerbicidaCorteResponse {
    obtenerTratamientoHerbicidaAplicacion: TratamientoHerbicidas[];
}
