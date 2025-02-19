import { AplicacionLluvia } from '@interfaces/lluvias/aplicacion';

export interface Pluviometro {
    id_pluviometro: number;
    nombre: number;
    suertesAsociadas?: string;
    totalMes?: number;
    listAplicacionesLluvias?: AplicacionLluvia[];
}

export interface FormPluviometro {
    nombre: number;
    suertesAsociadas: string[];
}

export interface GetPluviometrosYLuviasResponse {
    obtenerPluviometrosYLluvias: Pluviometro[];
}

export interface GetPluviometroRegister {
    agregarPluviometro: Pluviometro;
}

export interface GetLluviasYearResponse {
    obtenerLluviasYear: [Pluviometro];
}
