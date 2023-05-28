import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { challengeReducer } from './challenge/challenge.slice';
import { authReducer } from './auth/auth.slice';

export const rootStore = configureStore({
    reducer: {
        challenge: challengeReducer,
        auth: authReducer
    }
});

export type AppDispatch = typeof rootStore.dispatch;
export type RootState = ReturnType<typeof rootStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
