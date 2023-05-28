import React from 'react';
import Logo from '@components/logo/Logo';
import styles from './styles.module.scss';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '@stores/hooks';
import { login } from '@stores/auth/thunks/login.thunk';

const LoginPage = () => {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.container}>
            <Logo />
            <div className={styles.wrapper}>
                <GoogleLogin auto_select={false} onSuccess={({ credential: idToken = '' }) => dispatch(login({ provider: 'google', idToken }))} />
            </div>
        </div>
    );
};

export default LoginPage;
