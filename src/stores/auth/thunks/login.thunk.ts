import { TOAuthProvider } from '@models/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@services/auth';

type TLoginPayload = { provider: TOAuthProvider; idToken: string };

export const login = createAsyncThunk('auth/login', async (payload: Parameters<typeof authService.login>[0]) => {
    const user = await authService.login(payload);

    return user;
});
