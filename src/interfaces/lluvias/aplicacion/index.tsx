import { Lluvia } from '..';

export interface AplicacionLluvia {
    id_aplicacion_lluvia: number;
    pluviometro_id: number;
    lluvia_id: number;
    lluviaPadre?: Lluvia;
    fecha?: string;
    cantidad?: number;
}

export interface GetAplicacionLluviaRegister {
    agregarAplicacionLluvia: number[];
}

export interface GetLluviasYearReportResponse {
    obtenerResumenLluviasYear: AplicacionLluvia[];
}

export interface GetTotalPluviometroResponse {
    obtenerResumenPluviometroYear: AplicacionLluvia[];
}
