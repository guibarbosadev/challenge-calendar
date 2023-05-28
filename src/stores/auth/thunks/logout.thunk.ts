import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@services/auth';

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();

    return;
});
