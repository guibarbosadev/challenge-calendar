import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ChallengeState } from '@stores/challenge/challenge.types';
import createChallenge from '@stores/challenge/thunks/create-challenge.thunk';

const buildCreateChallengeCases = (builder: ActionReducerMapBuilder<ChallengeState>) => {
    builder
        .addCase(createChallenge.fulfilled, (state, action) => {
            state.challenges = action.payload;
            state.didLoadChallenges = true;
        })
        .addCase(createChallenge.rejected, (state) => {
            state.didLoadChallenges = true;
        });
};

export default buildCreateChallengeCases;
