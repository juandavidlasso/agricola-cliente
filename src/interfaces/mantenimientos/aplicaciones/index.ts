import { Mantenimiento } from '../mantenimiento';

export interface AplicacionMantenimiento {
    idApMant: number;
    fecha: string;
    nombre: string;
    maquinariaId: number;
    listMantenimientos?: Mantenimiento[];
}

export interface FormDataAplicacionMantenimiento {
    fecha: string;
    nombre: string;
    maquinariaId: number;
}

export interface GetAplicacionMantenimientoRegister {
    agregarAplicacionMantenimiento: AplicacionMantenimiento;
}

export interface GetAplicacionMantenimientoUpdate {
    actualizarAplicacionMantenimiento: AplicacionMantenimiento;
}

export interface GetAplicacionMantenimientoDelete {
    eliminarAplicacionMantenimiento: boolean;
}

export interface GetAplicacionesMantenimientoResponse {
    obtenerAplicacionesMantenimiento: AplicacionMantenimiento[];
}
