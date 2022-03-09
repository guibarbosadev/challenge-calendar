import React from 'react';
import Logo from '../../components/logo/Logo';
import { useAppSelector } from '../../stores/hooks';
import classNames from './styles.module.scss';

const ChallengeCalendarPage: React.FC = () => {
    const { challenges } = useAppSelector((state) => state.challenge);
    const [firstChallenge] = challenges;
    const [selectedChallengeId, setSelectedChallengeId] = React.useState(firstChallenge.id);

    const onSelectChallenge = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedChallengeId(event.target.value);
    };

    return (
        <>
            <header className={classNames.header}>
                <Logo />
                <button className={classNames.header__button}>Create new challenge</button>
            </header>
            <main className={classNames.body}>
                <select value={selectedChallengeId} onChange={onSelectChallenge}>
                    {challenges.map((challenge) => {
                        return (
                            <option key={challenge.id} value={challenge.id}>
                                {challenge.name}
                            </option>
                        );
                    })}
                </select>
            </main>
        </>
    );
};

export default ChallengeCalendarPage;
