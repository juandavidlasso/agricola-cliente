import { createReducer } from '@reduxjs/toolkit';
import { saveUser } from './actions';
import { User } from '@interfaces/user';

interface UserState {
    user: User;
}

export const userInitialState: UserState = {
    user: {
        id_usuario: 0,
        nombre: '',
        apellido: '',
        email: '',
        rol: 0
    }
};

const userSlice = createReducer(userInitialState, (builder) => {
    builder.addCase(saveUser, (state, action) => {
        state.user = action.payload;
    });
});

export default userSlice;
