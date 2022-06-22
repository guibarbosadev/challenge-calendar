import { createAsyncThunk } from '@reduxjs/toolkit';
import { challengeService } from '../../services/challenge';
import { Challenge, CustomDate } from '../../models/challenge';

interface MarkAsDoneParams {
    challenge: Challenge;
    date: CustomDate;
}

export const getChallenges = createAsyncThunk('challenge/getChallanges', async () => {
    return await challengeService.fetchChallenges();
});

export const createChallenge = createAsyncThunk('challenge/createChallenge', async (name: string) => {
    return await challengeService.createChallenge(name);
});

export const markAsDone = createAsyncThunk('challenge/markAsDone', async ({ challenge, date }: MarkAsDoneParams) => {
    return await challengeService.markAsDone(challenge, date);
});
