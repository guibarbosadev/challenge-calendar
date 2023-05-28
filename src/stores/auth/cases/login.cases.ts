import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@stores/auth/auth.types';
import { login } from '@stores/auth/thunks/login.thunk';

type LoginFulfilledPayload = ReturnType<typeof login['fulfilled']>['payload'];

const handleLoginPending = (state: AuthState) => {
    state.status = 'authenticating';
};

const handleLoginFulfilled = (state: AuthState, { payload: user }: PayloadAction<LoginFulfilledPayload>) => {
    state.status = 'authenticated';
    state.user = user;
};
const handleLoginRejected = (state: AuthState) => {
    state.status = 'not-authenticated';
    state.user = undefined;
    // TODO: show 'login failed' cases
};

export const buildLoginCases = (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(login.pending, handleLoginPending);
    builder.addCase(login.fulfilled, handleLoginFulfilled);
    builder.addCase(login.rejected, handleLoginRejected);
};
