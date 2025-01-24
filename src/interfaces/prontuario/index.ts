import { Cosecha } from '@interfaces/cultivos/cosechas';

export interface FormDataProntuario {
    fecha_inicio: string;
    fecha_fin: string;
}

export interface GetProntuarioResponse {
    consultarProntuario: Cosecha[];
}
