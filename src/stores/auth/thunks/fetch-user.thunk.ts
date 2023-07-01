import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@services/auth';

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const user = await authService.fetchLoggedInUser();

    return user;
});
