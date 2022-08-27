import { CalendarMonth, Challenge, CustomDate } from '@models/challenge';

export interface ChallengeState {
    didLoadChallenges: boolean;
    challenges: Challenge[];
    isLoading: boolean;
    selectedChallenge: Challenge | null;
    selectedMonth: CalendarMonth;
}

export interface MarkAsSomethingParams {
    challenge: Challenge;
    date: CustomDate;
}
