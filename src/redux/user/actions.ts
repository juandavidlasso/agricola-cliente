import { User } from '@interfaces/user';
import { createAction } from '@reduxjs/toolkit';

export const saveUser = createAction<User>('user/saveUser');
