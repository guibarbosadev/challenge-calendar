import { Challenge } from "../models/challenge";

export class ChallengeService {
  async fetchChallenges() {
    try {
      const challenges = await localStorage.getItem("challenges");
      const parsedChallenges: Challenge[] = challenges
        ? JSON.parse(challenges)
        : [];
      return parsedChallenges;
    } catch {
      return [];
    }
  }
}
