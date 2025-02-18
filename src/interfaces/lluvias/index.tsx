import { Pluviometro } from '@interfaces/pluviometros';
import { AplicacionLluvia } from './aplicacion';

export interface Lluvia {
    id_lluvia: number;
    fecha: string;
    cantidad: number;
    listAplicacionesLluvias?: AplicacionLluvia[];
}

export interface GetLluviaRegister {
    agregarLluvia: number[];
}

export interface GetLluviaUpdate {
    actualizarLluvia: Lluvia;
}

export interface GetLluviasResponse {
    obtenerLluvias: Lluvia[];
}

export interface GetLluviaReportResponse {
    obtenerLluviasPorPluviometro: Lluvia[];
}

export interface GetLluviasActualesReportResponse {
    obtenerLluviasMesActual: Pluviometro[];
}

export interface GetLluviasMesYearReportResponse {
    obtenerLluviasMesYear: Pluviometro[];
}

export interface GetTotalPromedioLluviasYearResponse {
    obtenerPromedioLluvias: Lluvia[];
}

export interface LluviasYAplicacion {
    cantidad: number;
    fecha: string;
    pluviometro_id: number;
    lluvia_id: number;
}
