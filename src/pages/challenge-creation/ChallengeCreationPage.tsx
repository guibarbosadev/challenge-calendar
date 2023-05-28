import Logo from '@components/logo/Logo';
import ChallengeCreationForm, { IValues } from '@pages/challenge-creation/challenge-creation-form/ChallengeCreationForm';
import createChallenge from '@stores/challenge/thunks/create-challenge.thunk';
import { useAppDispatch } from '@stores/hooks';
import React from 'react';
import styles from './styles.module.scss';

export default function ChallengeCreationPage() {
    const dispatch = useAppDispatch();

    function handleSubmit({ name }: IValues) {
        dispatch(createChallenge(name));
    }

    return (
        <>
            <div className={styles.container}>
                <Logo />
                <div className={styles.wrapper}>
                    <ChallengeCreationForm onSubmit={handleSubmit} />
                    <blockquote className={styles.quote}>
                        <p className={styles.quote__text}>"Some dope quote that actually makes sense"</p>
                        <cite className={styles.quote__author}>-Frederick Gustav</cite>
                    </blockquote>
                </div>
            </div>
        </>
    );
}
