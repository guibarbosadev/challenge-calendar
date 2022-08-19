import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChallengeState } from '@stores/challenge/challengeType';
import { createChallenge, getChallenges, markAsDone, markAsSkipped, unmarkDay } from '@stores/challenge/challengeActions';
import { CustomDate, CalendarMonth } from '@models/challenge';

export const currentDate = new Date();
export const currentDay = currentDate.getDate();
export const currentYear = currentDate.getFullYear();
export const currentMonth = currentDate.getMonth() + 1;

const initialState: ChallengeState = {
    challenges: [],
    didLoadChallenges: false,
    isLoading: false,
    selectedChallenge: null,
    selectedMonth: {
        month: currentMonth,
        year: currentYear
    }
};

const challengeSlice = createSlice({
    initialState,
    name: 'challenge',
    reducers: {
        selectChallenge: (state, action) => {
            state.selectedChallenge = action.payload;
        },
        selectMonth: (state, action: PayloadAction<CalendarMonth>) => {
            state.selectedMonth = action.payload;
        }
    },
    extraReducers: (builder) => {
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
            })
            .addCase(createChallenge.fulfilled, (state, action) => {
                state.challenges = action.payload;
                state.didLoadChallenges = true;
            })
            .addCase(createChallenge.rejected, (state) => {
                state.didLoadChallenges = true;
            })
            .addCase(markAsDone.fulfilled, (state, action) => {
                state.selectedChallenge = action.payload;
            })
            .addCase(markAsDone.rejected, (state, action) => {
                // TODO: show error notification
            })
            .addCase(markAsSkipped.fulfilled, (state, action) => {
                state.selectedChallenge = action.payload;
            })
            .addCase(markAsSkipped.rejected, (state, action) => {
                // TODO: show error notification
            })
            .addCase(unmarkDay.fulfilled, (state, action) => {
                state.selectedChallenge = action.payload;
            })
            .addCase(unmarkDay.rejected, (state) => {
                // TODO: show error notification
            });
    }
});
export const { reducer: challengeReducer } = challengeSlice;
export const { selectChallenge, selectMonth } = challengeSlice.actions;
