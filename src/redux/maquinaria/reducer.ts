import { createReducer } from '@reduxjs/toolkit';
import { Maquinaria } from '@interfaces/maquinaria';
import { saveMaquinaria } from './actions';

interface MaquinariaState {
    maquinaria: Maquinaria;
}

export const maquinariaInitialState: MaquinariaState = {
    maquinaria: {
        idMaquinaria: 0,
        marca: '',
        modelo: 0,
        potencia: 0,
        serie: '',
        color: ''
    }
};

const maquinariaSlice = createReducer(maquinariaInitialState, (builder) => {
    builder.addCase(saveMaquinaria, (state, action) => {
        state.maquinaria = action.payload;
    });
});

export default maquinariaSlice;
