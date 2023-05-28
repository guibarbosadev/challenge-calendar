import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';
import { buildLoginCases } from '@stores/auth/cases/login.cases';
import { buildLogoutCases } from '@stores/auth/cases/logout.cases';

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
    }
});

export const { reducer: authReducer } = authSlice;
