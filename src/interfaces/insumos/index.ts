export interface Insumo {
    idInsumo: number;
    nombre: string;
    referencia: string;
    marca: string;
    cantidad: string;
}

export interface FormDataInsumo {
    nombre: string;
    referencia: string;
    marca: string;
    cantidad: string;
}

export interface GetInsumoRegister {
    agregarInsumo: Insumo;
}

export interface GetInsumoUpdate {
    actualizarInsumo: Insumo;
}

export interface GetInsumosResponse {
    obtenerInsumos: Insumo[];
}

export interface GetDeleteInsumo {
    eliminarInsumo: boolean;
}
