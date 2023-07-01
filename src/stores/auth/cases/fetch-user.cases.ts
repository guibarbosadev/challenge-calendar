import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '@/stores/auth/auth.types';
import { fetchUser } from '@stores/auth/thunks/fetch-user.thunk';

type FetchUserFulfilledPayload = ReturnType<typeof fetchUser['fulfilled']>['payload'];
const handleFetchUserPending = (state: AuthState) => {
    state.status = 'authenticating';
};

const handleFetchUserFulfilled = (state: AuthState, { payload: user }: PayloadAction<FetchUserFulfilledPayload>) => {
    state.status = 'authenticated';
    state.user = user;
};

const handleFetchUserRejected = (state: AuthState) => {
    state.status = 'not-authenticated';
    state.user = undefined;
};

export const buildFetchUserCases = (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(fetchUser.pending, handleFetchUserPending);
    builder.addCase(fetchUser.fulfilled, handleFetchUserFulfilled);
    builder.addCase(fetchUser.rejected, handleFetchUserRejected);
};
