import { createAsyncThunk } from '@reduxjs/toolkit';
import { challengeService } from '@services/challenge';

const createChallenge = createAsyncThunk('challenge/createChallenge', async (name: string) => {
    return await challengeService.createChallenge(name);
});

export default createChallenge;
