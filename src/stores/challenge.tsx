import React from "react";
import { action, observable } from "mobx";
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
}

export const challengeStore = new ChallengeStore();
const challengeStoreContext = React.createContext(challengeStore);

export const useChallengeStore = () => {
  return React.useContext(challengeStoreContext);
};
