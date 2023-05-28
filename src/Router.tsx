import { ERoutes } from '@models/routes';
import ChallengeCalendarPage from '@pages/challenge-calendar/ChallengeCalendarPage';
import ChallengeCreationPage from '@pages/challenge-creation/ChallengeCreationPage';
import HomePage from '@pages/home/HomePage';
import LoginPage from '@pages/login/LoginPage';
import { apiClient } from '@services/base';
import useAuth from '@stores/auth/useAuth';
import useChallenge from '@stores/challenge/useChallenge';
import { StatusCodes } from 'http-status-codes';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

export const AUTHORIZED_STATUS = '';

const Router = () => {
    const { challenges, didLoadChallenges } = useChallenge();
    const { status } = useAuth();

    const isLoggedIn = status === 'authenticated';
    const isCalendarRouteEnabled = isLoggedIn && didLoadChallenges && challenges.length > 0;
    const isCreateChallengeRouteEnabled = isLoggedIn && didLoadChallenges;
    const history = useHistory();

    useEffect(() => {
        const interceptor = apiClient.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === StatusCodes.UNAUTHORIZED) history.push('/login');

                return Promise.reject(error);
            }
        );
        const removeInterception = () => apiClient.interceptors.response.eject(interceptor);

        return removeInterception;
    }, [history]);

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
