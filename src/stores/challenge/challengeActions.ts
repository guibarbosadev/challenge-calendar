import { createAsyncThunk } from '@reduxjs/toolkit';
import { challengeService } from '../../services/challenge';
import { Challenge, EChallengeStatus, CustomDate } from '../../models/challenge';

interface MarkAsSomethingParams {
    challenge: Challenge;
    date: CustomDate;
}

export const getChallenges = createAsyncThunk('challenge/getChallanges', async () => {
    return await challengeService.fetchChallenges();
});

export const createChallenge = createAsyncThunk('challenge/createChallenge', async (name: string) => {
    return await challengeService.createChallenge(name);
});

export const markAsDone = createAsyncThunk('challenge/markAsDone', async ({ challenge, date }: MarkAsSomethingParams) => {
    return await challengeService.markDay(challenge, date, EChallengeStatus.Done);
});

export const markAsSkipped = createAsyncThunk('challenge/markAsFailed', async ({ challenge, date }: MarkAsSomethingParams) => {
    return await challengeService.markDay(challenge, date, EChallengeStatus.Skipped);
});

export const unmarkDay = createAsyncThunk('challenge/unmarkDay', async ({ challenge, date }: MarkAsSomethingParams) => {
    return await challengeService.markDay(challenge, date);
});
