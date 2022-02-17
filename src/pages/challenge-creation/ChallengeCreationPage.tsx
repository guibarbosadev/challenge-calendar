import React from 'react';
import { useChallengeStore } from '../../stores/ChallengeStore';
import ChallengeCreationForm, { IValues } from './challenge-creation-form/ChallengeCreationForm';
import { add, format } from 'date-fns';
import styles from './styles.module.scss';
import { Redirect, useHistory } from 'react-router-dom';
import { ERoutes } from '../../Router';

export default function ChallengeCreationPage() {
    const challengeStore = useChallengeStore();
    const [shouldRedirect, setShouldRedirect] = React.useState(false);

    async function handleSubmit({ name, duration }: IValues) {
        const date = new Date();
        const dateFormat = 'dd-MM-yyyy';
        const startDate = format(date, dateFormat);
        const days = Math.round(Number(duration));
        const endDate = format(add(date, { days }), dateFormat);

        await challengeStore.createChallenge({ name, startDate, endDate });
        setShouldRedirect(true);
    }

    return (
        <>
            {shouldRedirect && <Redirect to={'/'} />}
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <ChallengeCreationForm handleSubmit={handleSubmit} />
                </div>
            </div>
        </>
    );
}
