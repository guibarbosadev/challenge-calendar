import { observer } from "mobx-react";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChallengeCalendarPage from "./pages/challenge-calendar";
import ChallengeCreationPage from "./pages/challenge-creation";
import { HomePage } from "./pages/home";
import { useChallengeStore } from "./stores/challenge";

export enum ERoutes {
  CreateChallenge = "/create-challenge",
  Calendar = "/Calendar",
}

const Routes = observer(() => {
  const { challenges, didLoadChallenges } = useChallengeStore();
  const isCalendarRouteEnabled = didLoadChallenges && challenges.length > 0;
  const isCreateChallengeRouteEnabled = didLoadChallenges;

  return (
    <Router>
      <div>daijdsji</div>
      <Switch>
        {/* TODO: fetch challenges and dynamic redirect */}
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
