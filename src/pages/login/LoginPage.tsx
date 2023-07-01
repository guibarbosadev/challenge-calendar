import React from 'react';
import Logo from '@components/logo/Logo';
import styles from './styles.module.scss';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '@stores/hooks';
import { login } from '@stores/auth/thunks/login.thunk';
import Loading from '@components/loading/Loading';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.auth.status);

    return (
        <div className={styles.container}>
            {status === 'authenticating' ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    <Loading />
                </div>
            ) : (
                <>
                    <Logo />
                    <div className={styles.wrapper}>
                        <GoogleLogin
                            auto_select={false}
                            useOneTap={false}
                            onSuccess={({ credential: idToken = '' }) => dispatch(login({ provider: 'google', idToken }))}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginPage;
