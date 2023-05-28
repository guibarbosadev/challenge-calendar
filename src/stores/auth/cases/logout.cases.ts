import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@stores/auth/auth.types';
import { logout } from '@stores/auth/thunks/logout.thunk';

const handleLogoutPending = (state: AuthState) => {
    state.status = 'authenticating';
};

const handleLogoutFulfilled = (state: AuthState) => {
    state.user = undefined;
    state.status = 'not-authenticated';
};

const handleLogoutRejected = (state: AuthState) => {
    state.user = undefined;
    state.status = 'not-authenticated';
    // TODO: show 'logout failed' toast
};

export const buildLogoutCases = (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(logout.pending, handleLogoutPending);
    builder.addCase(logout.fulfilled, handleLogoutFulfilled);
    builder.addCase(logout.rejected, handleLogoutRejected);
};
