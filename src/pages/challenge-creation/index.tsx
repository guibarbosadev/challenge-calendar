import React from 'react';
import { useChallengeStore } from '../../stores/challenge';
import ChallengeCreationForm, {
    IValues
} from './components/challenge-creation-form';
import { add, format } from 'date-fns';
import styles from './styles.module.scss';

export default function ChallengeCreationPage() {
    const challengeStore = useChallengeStore();

    function handleSubmit({ name, duration }: IValues) {
        const date = new Date();
        const dateFormat = 'dd-MM-yyyy';
        const startDate = format(date, dateFormat);
        const days = Math.round(Number(duration));
        const endDate = format(add(date, { days }), dateFormat);

        challengeStore.createChallenge({ name, startDate, endDate });
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <ChallengeCreationForm handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}
