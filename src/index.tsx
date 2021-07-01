import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import ChallengeCreationPage from './pages/challenge-creation';
import ChallengeCalendarPage from './pages/challenge-calendar/index';
import Routes from './routes';
import { Provider } from 'mobx-react';
import { useChallengeStore } from './stores/challenge';

export default function App() {
    const challengeStore = useChallengeStore();

    return (
        <Provider challengeStore={challengeStore}>
            <Routes></Routes>
        </Provider>
    );
}
