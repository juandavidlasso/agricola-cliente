import { AplicacionHerbicidas } from '../aplicacion';

export interface AplicacionesHerbicidas {
    id_aplicaciones_herbicidas: number;
    corte_id: number;
    aphe_id: number;
    suertes?: string;
    aplicacionHerbicida: AplicacionHerbicidas;
}

export interface GetAplicacionesHerbicidasResponse {
    obtenerAplicacionesHerbicidasCorte: AplicacionesHerbicidas[];
}

export interface GetRegistrarAplicacionesHerbicidas {
    agregarAplicacionesHerbicidas: number[];
}

export interface GetDeleteAplicacionesHerbicidasResponse {
    eliminarAplicacionesHerbicidas: boolean;
}
