export type FormDataLogin = {
    email: string;
    password: string;
};

export type FormDataRegister = {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
};

export type FormDataUpdate = {
    nombre: string;
    apellido: string;
    email: string;
    password?: string | undefined | null;
};

export interface User {
    id_usuario: number;
    apellido: string;
    email: string;
    nombre: string;
    rol: number;
}

interface Response {
    token: string;
    user: User;
}

export interface ResetPasswordForm {
    email: string;
}

export type UserLoginResponse = {
    autenticarUsuario: Response;
};

export type UserRegisterResponse = {
    crearUsuario: Response;
};

export interface Modules {
    id: number;
    text: string;
    icon: JSX.Element;
    onclick: string;
}

export interface GetUsuarioResponse {
    obtenerUsuario: User;
}

export interface UpdateUserResponse {
    actualizarUsuario: User;
}
