export interface TratamientoFertilizante {
    id_trafe: number;
    producto: string;
    dosis: number;
    presentacion: string;
    valor?: number;
    aplico?: string;
    nota?: string;
    apfe_id: number;
}

export interface FormDataTratamientoFertilizante {
    producto: string;
    dosis: number;
    presentacion: string;
    valor?: number;
    aplico?: string;
    nota?: string;
}

export interface GetTratamientoFertilizanteRegister {
    agregarTratamientoFertilizante: TratamientoFertilizante;
}

export interface GetTratamientoFertilizanteUpdate {
    actualizarTratamientoFertilizante: TratamientoFertilizante;
}
