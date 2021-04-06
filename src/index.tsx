import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ChallengeCreationPage from "./pages/challenge-creation";
import ChallengeCalendarPage from "./pages/challenge-calendar/index";

export default function App() {
  return (
    <Router>
      <Switch>
        {/* TODO: fetch challenges and dynamic redirect */}
        <Route path="/calendar" component={ChallengeCalendarPage} />
        <Route path="/create-challenge" component={ChallengeCreationPage} />
        <Route path="*">
          <Redirect to="/create-challenge" />
        </Route>
      </Switch>
    </Router>
  );
}
