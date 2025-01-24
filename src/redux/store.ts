import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session';
import thunk from 'redux-thunk';
import userSlice from '@store/user/reducer';
import cultivosSlice from '@store/cultivos/reducer';
import maquinariaSlice from '@store/maquinaria/reducer';

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        }
    };
};
const storage = typeof window !== 'undefined' ? createWebStorage('session') : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage
};

export const rootReducers = combineReducers({
    userReducer: userSlice,
    cultivosReducer: cultivosSlice,
    maquinariaReducer: maquinariaSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export const persistor = persistStore(store);
