import React from 'react';
import Logo from '../../components/logo/Logo';
import { useAppSelector, useAppDispatch } from '../../stores/hooks';
import classNames from './styles.module.scss';
import Select from 'react-select';
import { Challenge, ChallengeStatus, CustomDate } from '../../models/challenge';
import { currentYear, selectChallenge, currentMonth, currentDay } from '../../stores/challenge/challengeSlice';
import Calendar from '../../components/calendar/Calendar';
import { markAsDone } from '../../stores/challenge/challengeActions';

const ChallengeCalendarPage: React.FC = () => {
    const { challenges, selectedChallenge, selectedDate } = useAppSelector((state) => state.challenge);
    const dispatch = useAppDispatch();

    const isCurrentMonth = selectedDate.year === currentYear && selectedDate.month === currentMonth;

    const onSelectChallenge = (option: Challenge) => {
        dispatch(selectChallenge(option));
    };

    const toggleCurrentDay = (status?: ChallengeStatus) => {
        if (selectedChallenge) {
            const canMarkAsDone = !status || status === ChallengeStatus.Failed;

            if (canMarkAsDone) {
                const date: CustomDate = {
                    day: currentDay,
                    month: currentMonth,
                    year: currentYear
                };
                dispatch(markAsDone({ challenge: selectedChallenge, date }));
            }
        }
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

                {selectedChallenge && (
                    <div className={classNames.calendar}>
                        <Calendar
                            challenge={selectedChallenge}
                            onClickCurrentDate={toggleCurrentDay}
                            day={isCurrentMonth ? currentDay : undefined}
                            month={selectedDate.month}
                            year={selectedDate.year}
                        />
                    </div>
                )}
            </main>
        </>
    );
};

export default ChallengeCalendarPage;
