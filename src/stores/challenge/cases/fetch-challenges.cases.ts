import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ChallengeState } from '@stores/challenge/challenge.types';
import getChallenges from '@stores/challenge/thunks/fetch-challenges.thunk';

const buildFetchChallengesCases = (builder: ActionReducerMapBuilder<ChallengeState>) => {
    builder
        .addCase(getChallenges.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getChallenges.fulfilled, (state, action) => {
            const { payload: challenges = [] } = action;
            const [firstChallenge = null] = challenges;
            state.challenges = challenges;
            state.didLoadChallenges = true;
            state.selectedChallenge ??= firstChallenge;
            state.isLoading = false;
        })
        .addCase(getChallenges.rejected, (state) => {
            state.challenges = [];
            state.didLoadChallenges = true;
            state.isLoading = false;
        });

    return builder;
};

export default buildFetchChallengesCases;
