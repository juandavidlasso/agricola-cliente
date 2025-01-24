import { Maquinaria } from '@interfaces/maquinaria';
import { createAction } from '@reduxjs/toolkit';

export const saveMaquinaria = createAction<Maquinaria>('maquinaria/saveMaquinaria');
