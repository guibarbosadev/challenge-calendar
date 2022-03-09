import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { challengeReducer } from './challenge/challengeSlice';

export const rootStore = configureStore({
    reducer: {
        challenge: challengeReducer
    }
});

export type AppDispatch = typeof rootStore.dispatch;
export type RootState = ReturnType<typeof rootStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
