import { TratamientoHerbicidas } from '../tratamientos';

export interface AplicacionHerbicidas {
    id_aphe: number;
    fecha: string;
    tipo: string;
    suertes?: string;
    listTratamientoHerbicida?: TratamientoHerbicidas[];
}

export interface FormDataAplicacionHerbicidas {
    fecha: string;
    tipo: string;
}

export interface GetAplicacionHerbicidaRegister {
    agregarAplicacionHerbicida: AplicacionHerbicidas;
}

export interface GetAplicacionHerbicidaUpdate {
    actualizarAplicacionHerbicida: AplicacionHerbicidas;
}

export interface GetAplicacionHerbicidaDelete {
    eliminarAplicacionHerbicida: boolean;
}

export interface GetAplicacionHerbicidaCorteResponse {
    obtenerAplicacionesHerbicidas: AplicacionHerbicidas[];
}
