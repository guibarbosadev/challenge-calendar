import { createSlice } from '@reduxjs/toolkit';
import { ChallengeState } from './challengeType';
import { createChallenge, getChallenges } from './challengeActions';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

const initialState: ChallengeState = {
    challenges: [],
    didLoadChallenges: false,
    isLoading: false,
    calendar: {},
    selectedChallenge: null,
    selectedDate: {
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
            });
    }
});
export const { reducer: challengeReducer } = challengeSlice;
export const { selectChallenge } = challengeSlice.actions;
