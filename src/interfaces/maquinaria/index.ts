export interface Maquinaria {
    idMaquinaria: number;
    marca: string;
    serie: string;
    modelo: number;
    potencia: number;
    color: string;
}

export interface FormDataMaquinaria {
    marca: string;
    serie: string;
    modelo: number;
    potencia: number;
    color: string;
}

export interface GetMaquinariaResponse {
    obtenerMaquinarias: Maquinaria[];
}

export interface GetMaquinariaRegisterResponse {
    agregarMaquinaria: Maquinaria;
}

export interface GetMaquinariaUpdateResponse {
    actualizarMaquinaria: Maquinaria;
}
