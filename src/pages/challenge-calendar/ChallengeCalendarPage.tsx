import React from 'react';
import Logo from '../../components/logo/Logo';
import { useAppSelector, useAppDispatch } from '../../stores/hooks';
import classNames from './styles.module.scss';
import Select from 'react-select';
import { Challenge } from '../../models/challenge';
import { currentYear, selectChallenge, currentMonth } from '../../stores/challenge/challengeSlice';
import Calendar from '../../components/calendar/Calendar';

const ChallengeCalendarPage: React.FC = () => {
    const { challenges, selectedChallenge, selectedDate } = useAppSelector((state) => state.challenge);
    const dispatch = useAppDispatch();
    const onSelectChallenge = (option: Challenge) => {
        dispatch(selectChallenge(option));
    };

    const isCurrentMonth = selectedDate.year === currentYear && selectedDate.month === currentMonth;
    const currentDay = new Date().getDate();

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

                <div className={classNames.calendar}>
                    <Calendar day={isCurrentMonth ? currentDay : undefined} month={selectedDate.month} year={selectedDate.year} />
                </div>
            </main>
        </>
    );
};

export default ChallengeCalendarPage;
