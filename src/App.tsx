import React from 'react';
import { Provider } from 'react-redux';
import Router from './Router';
import { rootStore } from './stores/RootStore';

export default function App() {
    return (
        <Provider store={rootStore}>
            <Router />
        </Provider>
    );
}
