import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ChallengeState } from '@stores/challenge/challenge.types';
import unmarkDay from '../thunks/unmark-day.thunk';

const buildUnmarkDayCases = (builder: ActionReducerMapBuilder<ChallengeState>) => {
    builder
        .addCase(unmarkDay.fulfilled, (state, action) => {
            state.selectedChallenge = action.payload;
        })
        .addCase(unmarkDay.rejected, (state) => {
            // TODO: show error notification
        });
};

export default buildUnmarkDayCases;
