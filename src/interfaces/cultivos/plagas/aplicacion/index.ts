export interface AplicacionPlaga {
    id_apla: number;
    fecha: string;
    corte_id: number;
    tablon_id: number;
    trapl_id: number;
}

export interface SuertesCortesTablones {
    id_suerte: number;
    nombre: string;
    listcortes: {
        id_corte: number;
        numero: number;
        suerte_id: number;
        listTablones: {
            id_tablon: number;
            numero: number;
            area: number;
            corte_id: number;
        }[];
    }[];
}

export interface GetTablonesPlagasResponse {
    obtenerSuertesRenovadasCortesTablones: SuertesCortesTablones[];
}

export interface GetAplicacionPlagaRegister {
    agregarAplicacionPlagas: AplicacionPlaga;
}

export interface GetAplicacionPlagaUpdate {
    actualizarAplicacionPlagas: AplicacionPlaga;
}
