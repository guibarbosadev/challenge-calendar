import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ChallengeCalendarPage from '@pages/challenge-calendar/ChallengeCalendarPage';
import ChallengeCreationPage from '@pages/challenge-creation/ChallengeCreationPage';
import HomePage from '@pages/home/HomePage';
import { useAppSelector } from '@stores/hooks';
import { ERoutes } from '@models/routes';

const Router = () => {
    const { challenges, didLoadChallenges } = useAppSelector((state) => state.challenge);
    const isCalendarRouteEnabled = didLoadChallenges && challenges.length > 0;
    const isCreateChallengeRouteEnabled = didLoadChallenges;

    return (
        <BrowserRouter>
            <Switch>
                {isCalendarRouteEnabled && <Route path={ERoutes.Calendar} component={ChallengeCalendarPage} />}
                {isCreateChallengeRouteEnabled && <Route path={ERoutes.CreateChallenge} component={ChallengeCreationPage} />}
                <Route path="*">
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
