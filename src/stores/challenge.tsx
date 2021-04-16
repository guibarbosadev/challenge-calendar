import React from "react";
import { action, makeObservable, observable } from "mobx";
import { Challenge } from "../models/challenge";
import { ChallengeService } from "../services/challenge";

export class ChallengeStore {
  private service: ChallengeService = new ChallengeService();

  @observable
  didLoadChallenges = false;

  @observable
  challenges: Challenge[] = [];

  @action
  async getChallenges() {
    this.challenges = await this.service.fetchChallenges();
    this.didLoadChallenges = true;
  }

  async createChallenge(challenge: Challenge) {
    await this.service.saveChallenge(challenge);
  }

  constructor() {
    makeObservable(this, {
      didLoadChallenges: observable,
      challenges: observable,
      getChallenges: action,
      createChallenge: action,
    });
  }
}

export const challengeStore = new ChallengeStore();
const challengeStoreContext = React.createContext(challengeStore);

export const useChallengeStore = () => {
  return React.useContext(challengeStoreContext);
};
