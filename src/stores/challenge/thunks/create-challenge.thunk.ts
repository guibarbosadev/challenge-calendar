import { createAsyncThunk } from '@reduxjs/toolkit';
import { challengeService } from '@services/challenge';

const createChallenge = createAsyncThunk('challenge/createChallenge', async (name: string) => {
    const challenge = await challengeService.createChallenge(name);

    if (!challenge) throw new Error('Did not found created challenge');

    return challenge;
});

export default createChallenge;
