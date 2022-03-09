import { Challenge } from '../models/challenge';

class ChallengeService {
    async fetchChallenges() {
        const challenges = await localStorage.getItem('challenges');
        const parsedChallenges: Challenge[] = challenges ? JSON.parse(challenges) : [];

        return parsedChallenges;
    }

    async saveChallenge(name: string) {
        const currentDate = new Date();
        const id = currentDate.toISOString();
        const challenge: Challenge = { name, id };
        const fetchedChallenges = await this.fetchChallenges();
        const challenges = fetchedChallenges.concat(challenge);

        await localStorage.setItem('challenges', JSON.stringify(challenges));
        const updatedChallenges = await this.fetchChallenges();

        return updatedChallenges;

        return [];
    }
}

export const challengeService = new ChallengeService();
