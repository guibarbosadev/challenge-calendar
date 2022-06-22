import { Challenge } from '../../models/challenge';

export interface ChallengeState {
    didLoadChallenges: boolean;
    challenges: Challenge[];
    isLoading: boolean;
    selectedChallenge: Challenge | null;
    selectedDate: {
        month: number;
        year: number;
    };
}
