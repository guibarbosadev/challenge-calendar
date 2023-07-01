import useAuthenticationInterceptor from '@/hooks/use-authentication-interceptor';
import { ERoutes } from '@models/routes';
import ChallengeCalendarPage from '@pages/challenge-calendar/ChallengeCalendarPage';
import ChallengeCreationPage from '@pages/challenge-creation/ChallengeCreationPage';
import HomePage from '@pages/home/HomePage';
import LoginPage from '@pages/login/LoginPage';
import useAuth from '@/hooks/use-auth';
import useChallenges from '@stores/use-challenges';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

export const AUTHORIZED_STATUS = '';

const Router = () => {
    const { challenges, didLoadChallenges } = useChallenges();
    const { user } = useAuth();

    const isLoggedIn = Boolean(user);
    const isCalendarRouteEnabled = isLoggedIn && didLoadChallenges && challenges.length > 0;
    const isCreateChallengeRouteEnabled = isLoggedIn && didLoadChallenges;

    useAuthenticationInterceptor();

    return (
        <BrowserRouter>
            <Switch>
                {isCalendarRouteEnabled && <Route path={ERoutes.Calendar} component={ChallengeCalendarPage} />}
                {isCreateChallengeRouteEnabled && <Route path={ERoutes.CreateChallenge} component={ChallengeCreationPage} />}
                <Route path="*">{isLoggedIn ? <HomePage /> : <LoginPage />}</Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
