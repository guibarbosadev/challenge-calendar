import { observer } from "mobx-react";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import ChallengeCalendarPage from "./pages/challenge-calendar";
import ChallengeCreationPage from "./pages/challenge-creation";
import { HomePage } from "./pages/home";
import { createBrowserHistory, History } from "history";
import { useRootStore } from "./stores";

export enum ERoutes {
  CreateChallenge = "/create-challenge",
  Calendar = "/calendar",
}

export interface IProps {
  history: History;
}

const Routes = observer((props: IProps) => {
  const { challenges, didLoadChallenges } = useRootStore().challengeStore;
  const isCalendarRouteEnabled = didLoadChallenges && challenges.length > 0;
  const isCreateChallengeRouteEnabled = didLoadChallenges;

  console.log("challenges: ", challenges.length);

  return (
    <Router history={props.history}>
      <Switch>
        {isCalendarRouteEnabled && (
          <Route path={ERoutes.Calendar} component={ChallengeCalendarPage} />
        )}
        {isCreateChallengeRouteEnabled && (
          <Route
            path={ERoutes.CreateChallenge}
            component={ChallengeCreationPage}
          />
        )}
        <Route path="*">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
});

export default Routes;
