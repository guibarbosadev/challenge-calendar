import { Challenge } from '../models/challenge';

export class ChallengeService {
    async fetchChallenges() {
        try {
            const challenges = await localStorage.getItem('challenges');
            const parsedChallenges: Challenge[] = challenges ? JSON.parse(challenges) : [];

            return parsedChallenges;
        } catch {
            return [];
        }
    }

    async saveChallenge(challenge: Challenge) {
        try {
            const fetchedChallenges = await this.fetchChallenges();
            const challenges = fetchedChallenges.concat([challenge]);
            await localStorage.setItem('challenges', JSON.stringify(challenges));
        } catch {}
    }
}
