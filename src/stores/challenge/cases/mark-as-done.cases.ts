import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ChallengeState } from '@stores/challenge/challenge.types';
import markAsDone from '@stores/challenge/thunks/mark-as-done.thunk';

const buildMarkAsDoneCases = (builder: ActionReducerMapBuilder<ChallengeState>) => {
    builder
        .addCase(markAsDone.fulfilled, (state, action) => {
            state.selectedChallenge = action.payload;
        })
        .addCase(markAsDone.rejected, (state, action) => {
            // TODO: show error notification
        });
};

export default buildMarkAsDoneCases;
