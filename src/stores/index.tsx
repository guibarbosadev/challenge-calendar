import React from "react";
import { ChallengeStore } from "./challenge";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { History, createBrowserHistory } from "history";

export class RootStore {
  challengeStore: ChallengeStore;
  routerStore: RouterStore;
  history: History;
  constructor() {
    this.challengeStore = new ChallengeStore();
    this.routerStore = new RouterStore();
    this.history = syncHistoryWithStore(
      createBrowserHistory(),
      this.routerStore
    );
  }
}

export const rootStore = new RootStore();
const RootStoreContext = React.createContext<RootStore>(rootStore);

export function useRootStore() {
  return React.useContext(RootStoreContext);
}
