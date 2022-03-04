import React from 'react';
import Logo from '../../components/logo/Logo';
import { useChallengeStore } from '../../stores/ChallengeStore';
import ChallengeCreationForm, { IValues } from './challenge-creation-form/ChallengeCreationForm';
import styles from './styles.module.scss';

export default function ChallengeCreationPage() {
    const challengeStore = useChallengeStore();

    function handleSubmit({ name }: IValues) {
        challengeStore.createChallenge({ name });
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
