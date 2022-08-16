import { Challenge, TChallengeStatus, CustomDate, ChallengeCalendar } from '@models/challenge';

class ChallengeService {
    async fetchChallenges() {
        const challenges = await localStorage.getItem('challenges');
        const parsedChallenges: Challenge[] = challenges ? JSON.parse(challenges) : [];

        return parsedChallenges;
    }

    async createChallenge(name: string) {
        const currentDate = new Date();
        const id = currentDate.toISOString();
        const challenge: Challenge = { name, id, calendar: {} };
        const updatedChallenges = await this.saveChallenge(challenge);

        return updatedChallenges;
    }

    async saveChallenge(challenge: Challenge) {
        const fetchedChallenges = await this.fetchChallenges();
        const challengeIndex = fetchedChallenges.findIndex(({ id }) => id === challenge.id);
        const shouldCreate = challengeIndex === -1;
        let challenges: Challenge[] = [];

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
