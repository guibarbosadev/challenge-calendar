import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';
import { buildLoginCases } from '@stores/auth/cases/login.cases';
import { buildLogoutCases } from '@stores/auth/cases/logout.cases';
import { buildFetchUserCases } from '@stores/auth/cases/fetch-user.cases';

const initialState: AuthState = {
    status: 'idle'
};

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers: (builder) => {
        buildLoginCases(builder);
        buildLogoutCases(builder);
        buildFetchUserCases(builder);
    }
});

export const { reducer: authReducer } = authSlice;
