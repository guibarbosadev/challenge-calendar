import { Challenge, TChallengeStatus, CustomDate, ChallengeCalendar } from '@models/challenge';
import { apiClient } from '@services/base';

class ChallengeService {
    async fetchChallenges() {
        const URL = '/challenges';
        const { data: challenges } = await apiClient.get<Challenge[]>(URL);

        return challenges;
    }

    async createChallenge(name: string) {
        const currentDate = new Date();
        const id = currentDate.toISOString();
        const challenge: Challenge = { name, id, calendar: {} };
        const updatedChallenges = await this.saveChallenge(challenge);
        const savedChallenge = updatedChallenges.find((updatedChallenge) => updatedChallenge.id === id);

        return savedChallenge;
    }

    async saveChallenge(challenge: Challenge) {
        const fetchedChallenges = (await this.fetchChallenges()) ?? [];
        const challengeIndex = fetchedChallenges.findIndex(({ id }) => id === challenge.id);
        const shouldCreate = challengeIndex === -1;
        let challenges: Challenge[] = [...fetchedChallenges];

        if (shouldCreate) {
            challenges = [...fetchedChallenges, challenge];
        } else {
            challenges[challengeIndex] = challenge;
        }

        await localStorage.setItem('challenges', JSON.stringify(challenges));
        const updatedChallenges = await this.fetchChallenges();

        return updatedChallenges;
    }

    async markDay(challenge: Challenge, date: CustomDate, status?: TChallengeStatus) {
        const { year, month, day } = date;
        const { calendar } = { ...challenge };

        const currentCalendar: ChallengeCalendar = {
            ...calendar,
            [year]: {
                ...calendar[year],
                [month]: {
                    ...calendar[year]?.[month],
                    [day]: status
                }
            }
        };

        if (!status) {
            delete currentCalendar[year][month][day];
        }

        const updatedChallenge = { ...challenge, calendar: currentCalendar };
        await this.saveChallenge(updatedChallenge);

        return updatedChallenge;
    }
}

export const challengeService = new ChallengeService();
