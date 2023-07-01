import { createAsyncThunk } from '@reduxjs/toolkit';
import { challengeService } from '@services/challenge';

const fetchChallenges = createAsyncThunk('challenge/fetchChallenges', async (_, { dispatch, getState }) => {
    return await challengeService.fetchChallenges();
});

export default fetchChallenges;
