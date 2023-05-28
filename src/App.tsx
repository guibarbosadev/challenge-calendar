import React from 'react';
import { Provider } from 'react-redux';
import Router from './Router';
import { rootStore } from '@stores/RootStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '@/constants';

export default function App() {
    return (
        <Provider store={rootStore}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <Router />
            </GoogleOAuthProvider>
        </Provider>
    );
}
