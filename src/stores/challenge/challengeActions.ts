import { createAsyncThunk } from '@reduxjs/toolkit';
import { challengeService } from '../../services/challenge';

export const getChallenges = createAsyncThunk('challenge/getChallanges', async () => {
    return await challengeService.fetchChallenges();
});

export const createChallenge = createAsyncThunk('challenge/createChallenge', async (name: string) => {
    return await challengeService.saveChallenge(name);
});
