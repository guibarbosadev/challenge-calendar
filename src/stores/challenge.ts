import { action, observable } from "mobx";
import { Challenge } from "../models/challenge";
import { ChallengeService } from "../services/challenge";

export class ChallengeStore {
  private service: ChallengeService = new ChallengeService();

  @observable
  challenges: Challenge[] = [];

  @action
  async getStores() {
    this.challenges = await this.service.fetchChallenges();
  }
}
