import { createReducer } from '@reduxjs/toolkit';
import { saveCorte, saveSuerte, saveTablon } from './actions';
import { Suerte } from '@interfaces/cultivos/suerte';
import { Corte } from '@interfaces/cultivos/cortes';
import { TablonState } from '@interfaces/cultivos/tablones';

interface CultivosState {
    suerte: Suerte;
    corte: Corte;
    tablon: TablonState;
}

export const cultivosInitialState: CultivosState = {
    suerte: {
        id_suerte: 0,
        nombre: '',
        zona: '',
        variedad: '',
        renovada: ''
    },
    corte: {
        id_corte: 0,
        numero: 0,
        fecha_inicio: '',
        fecha_siembra: '',
        fecha_corte: '',
        estado: true,
        activo: true,
        area: 0,
        suerte_id: 0
    },
    tablon: {
        id_tablon: 0,
        numero: 0,
        area: 0,
        estado: true,
        corte_id: 0
    }
};

const cultivosSlice = createReducer(cultivosInitialState, (builder) => {
    builder
        .addCase(saveSuerte, (state, action) => {
            state.suerte = action.payload;
        })
        .addCase(saveCorte, (state, action) => {
            state.corte = action.payload;
        })
        .addCase(saveTablon, (state, action) => {
            state.tablon = action.payload;
        });
});

export default cultivosSlice;
