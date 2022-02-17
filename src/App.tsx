import React from 'react';
import Router from './Router';
import { Provider } from 'mobx-react';
import { useChallengeStore } from './stores/ChallengeStore';

export default function App() {
    const challengeStore = useChallengeStore();

    return (
        <Provider challengeStore={challengeStore}>
            <Router />
        </Provider>
    );
}
