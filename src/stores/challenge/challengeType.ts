import { Challenge, ChallengesCalendar } from '../../models/challenge';

export interface ChallengeState {
    didLoadChallenges: boolean;
    challenges: Challenge[];
    isLoading: boolean;
    calendar: ChallengesCalendar;
    selectedChallenge: Challenge | null;
    selectedDate: {
        month: number;
        year: number;
    };
}
