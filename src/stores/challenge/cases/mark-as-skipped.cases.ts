import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ChallengeState } from '@stores/challenge/challenge.types';
import markAsSkipped from '@stores/challenge/thunks/mark-as-skipped.thunk';

const buildMarkAsSkippedCases = (builder: ActionReducerMapBuilder<ChallengeState>) => {
    builder
        .addCase(markAsSkipped.fulfilled, (state, action) => {
            state.selectedChallenge = action.payload;
        })
        .addCase(markAsSkipped.rejected, (state, action) => {
            // TODO: show error notification
        });
};

export default buildMarkAsSkippedCases;
