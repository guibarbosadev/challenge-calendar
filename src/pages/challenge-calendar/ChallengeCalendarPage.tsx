import React from 'react';
import Logo from '../../components/logo/Logo';
import { useAppSelector, useAppDispatch } from '../../stores/hooks';
import classNames from './styles.module.scss';
import Select from 'react-select';
import { Challenge } from '../../models/challenge';
import { selectChallenge } from '../../stores/challenge/challengeSlice';

const ChallengeCalendarPage: React.FC = () => {
    const { challenges, selectedChallenge } = useAppSelector((state) => state.challenge);
    const dispatch = useAppDispatch();
    const onSelectChallenge = (option: Challenge) => {
        dispatch(selectChallenge(option));
    };

    return (
        <>
            <header className={classNames.header}>
                <Logo />
                <button className={classNames.header__button}>Create new challenge</button>
            </header>
            <main className={classNames.body}>
                <Select
                    className={classNames.select}
                    value={selectedChallenge}
                    options={challenges}
                    getOptionLabel={(challenge) => challenge.name}
                    getOptionValue={(challenge) => challenge.id}
                    onChange={(option) => option && onSelectChallenge(option)}
                    isSearchable={false}
                />
            </main>
        </>
    );
};

export default ChallengeCalendarPage;
