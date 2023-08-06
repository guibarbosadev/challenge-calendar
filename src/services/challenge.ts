import { Challenge, TChallengeStatus, CustomDate, ChallengeCalendar } from '@models/challenge';
import { apiClient } from '@services/base';

class ChallengeService {
    async fetchChallenges() {
        const URL = '/challenges';
        const { data: challenges } = await apiClient.get<Challenge[]>(URL);

        return challenges;
    }

    async createChallenge(name: string) {
        const response = await apiClient.post('/challenge', { name });
        const { data: challenge } = response;

        return challenge;
    }

    async markDay(challenge: Challenge, date: CustomDate, status?: TChallengeStatus) {
        const response = await apiClient.put('/mark', { challenge, date, status });
        const { data: updatedChallenge } = response;

        return updatedChallenge;
    }
}

export const challengeService = new ChallengeService();
