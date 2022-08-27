import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChallengeState } from '@stores/challenge/challenge.types';
import { CalendarMonth } from '@models/challenge';
import buildGetChallengesCases from './cases/fetch-challenges.cases';
import buildCreateChallengeCases from './cases/create-challenge.cases';
import buildMarkAsDoneCases from './cases/mark-as-done.cases';
import buildMarkAsSkippedCases from './cases/mark-as-skipped.cases';
import buildUnmarkDayCases from './cases/unmark-day.cases';

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
        buildGetChallengesCases(builder);
        buildCreateChallengeCases(builder);
        buildMarkAsDoneCases(builder);
        buildMarkAsSkippedCases(builder);
        buildUnmarkDayCases(builder);
    }
});
export const { reducer: challengeReducer } = challengeSlice;
export const { selectChallenge, selectMonth } = challengeSlice.actions;
