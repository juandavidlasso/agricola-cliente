import { Corte } from '@interfaces/cultivos/cortes';
import { Suerte } from '@interfaces/cultivos/suerte';
import { TablonState } from '@interfaces/cultivos/tablones';
import { createAction } from '@reduxjs/toolkit';

export const saveSuerte = createAction<Suerte>('suerte/saveSuerte');

export const saveCorte = createAction<Corte>('suerte/saveCorte');

export const saveTablon = createAction<TablonState>('suerte/saveTablon');
