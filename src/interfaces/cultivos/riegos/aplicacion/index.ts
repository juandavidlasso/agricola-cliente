export interface AplicacionRiegos {
    id_apriego: number;
    riego_id: number;
    tablon_id: number;
    num_tablon: number;
}

export interface GetAplicacionRiegoRegister {
    agregarAplicacionRiego: number[];
}

export interface GetAplicacionRiegoDelete {
    eliminarAplicacionRiego: number[];
}
