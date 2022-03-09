import { createSlice } from '@reduxjs/toolkit';
import { ChallengeState } from './challengeType';
import { createChallenge, getChallenges } from './challengeActions';

const initialState: ChallengeState = {
    challenges: [],
    didLoadChallenges: false,
    isLoading: false
};

const challengeSlice = createSlice({
    initialState,
    name: 'challenge',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChallenges.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChallenges.fulfilled, (state, action) => {
                state.challenges = action.payload;
                state.didLoadChallenges = true;
                state.isLoading = false;
            })
            .addCase(getChallenges.rejected, (state) => {
                state.challenges = [];
                state.didLoadChallenges = true;
                state.isLoading = false;
            })
            .addCase(createChallenge.fulfilled, (state, action) => {
                state.challenges = action.payload;
                state.didLoadChallenges = true;
            })
            .addCase(createChallenge.rejected, (state) => {
                state.didLoadChallenges = true;
            });
    }
});
export const { reducer: challengeReducer } = challengeSlice;
