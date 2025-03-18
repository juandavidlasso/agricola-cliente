export interface Mantenimiento {
    idMantenimiento: number;
    detalle: string;
    horaCambio: string;
    cantidad: string;
    insumoId: number;
    tipoCambio: boolean;
    proximoCambio: number;
    ApMantId: number;
}

export interface FormDataMantenimiento {
    insumoId: number;
    cantidad: string;
    tipoCambio: boolean;
    horaCambio: string;
    proximoCambio: number;
    detalle?: string;
}

export interface FormDataValidation {
    mantenimientos: FormDataMantenimiento[];
}

export interface GetMantenimientoRegister {
    agregarMantenimiento: number[];
}

export interface GetMantenimientoUpdate {
    actualizarMantenimiento: Mantenimiento;
}

export interface GetMantenimientoDelete {
    eliminarMantenimiento: boolean;
}
