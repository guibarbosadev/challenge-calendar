import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import { useChallengeStore } from '../../stores/ChallengeStore';
import ChallengeCreationForm, { IValues } from './challenge-creation-form/ChallengeCreationForm';
import styles from './styles.module.scss';

export default function ChallengeCreationPage() {
    const challengeStore = useChallengeStore();
    const [shouldRedirect, setShouldRedirect] = React.useState(false);

    async function handleSubmit({ name }: IValues) {
        await challengeStore.createChallenge({ name });
        setShouldRedirect(true);
    }

    return (
        <>
            {shouldRedirect && <Redirect to={'/'} />}
            <div className={styles.container}>
                <Logo />
                <div className={styles.wrapper}>
                    <ChallengeCreationForm handleSubmit={handleSubmit} />
                    <blockquote className={styles.quote}>
                        <p className={styles.quote__text}>"Some dope quote that actually makes sense"</p>
                        <cite className={styles.quote__author}>-Frederick Gustav</cite>
                    </blockquote>
                </div>
            </div>
        </>
    );
}
