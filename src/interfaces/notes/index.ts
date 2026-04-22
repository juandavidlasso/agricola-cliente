export interface INote {
    id_note: number;
    date: string;
    description: string;
    cost: string;
}

export interface INoteForm {
    date: string;
    description: string;
    cost?: string;
}

export interface NoteRegisterResponse {
    agregarNota: INote;
}

export interface NotesResponse {
    obtenerNotas: INote[];
}

export interface NoteUpdateResponse {
    actualizarNota: INote;
}

export interface NoteDeleteResponse {
    eliminarNota: boolean;
}
