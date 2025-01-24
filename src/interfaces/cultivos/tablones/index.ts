export interface TablonState {
    id_tablon: number;
    numero: number;
    area: number;
    estado: boolean;
    corte_id: number;
    listAplicacionesPlagas?: {
        id_apla: number;
        fecha: string;
        corte_id: number;
        tablon_id: number;
        trapl_id: number;
        tratamientoPlagaPadre: {
            id_trapl: number;
            producto: string;
            unidad: string;
            cantidad: number;
            tiempo: string;
        };
    }[];
}

export interface FormDataTablones {
    numero: number;
    area: number;
}

export interface GetResponseTablonesCorte {
    obtenerTablonesPorCorte: TablonState[];
}

export interface GetResponseTablonesCorteAplicacionesPlagas {
    obtenerTablonesYAplicacionesPlagas: TablonState[];
}

export interface GetActualizarTablon {
    actualizarTablon: TablonState;
}

export interface GetEliminarTablon {
    eliminarTablon: boolean;
}

export interface GetRegistrarTablon {
    agregarTablon: number[];
}
