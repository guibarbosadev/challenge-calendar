import { Challenge } from '../../models/challenge';

export interface ChallengeState {
    didLoadChallenges: boolean;
    challenges: Challenge[];
    isLoading: boolean;
}
