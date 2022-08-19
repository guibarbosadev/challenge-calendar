import React from 'react';
import Logo from '@components/logo/Logo';
import { useAppSelector, useAppDispatch } from '@stores/hooks';
import classNames from './styles.module.scss';
import Select from 'react-select';
import { Challenge, EChallengeStatus, TChallengeStatus, CustomDate } from '@models/challenge';
import { currentYear, selectChallenge, currentMonth, currentDay, selectMonth } from '@stores/challenge/challengeSlice';
import Calendar from '@components/calendar/Calendar';
import { markAsDone, markAsSkipped, unmarkDay } from '@stores/challenge/challengeActions';
import getDate from 'date-fns/getDate';

const LAST_MONTH_OF_YEAR = 12;
const FIRST_MONTH_OF_YEAR = 1;

const ChallengeCalendarPage: React.FC = () => {
    const { challenges, selectedChallenge, selectedMonth } = useAppSelector((state) => state.challenge);
    const dispatch = useAppDispatch();

    const isCurrentMonth = selectedMonth.year === currentYear && selectedMonth.month === currentMonth;

    const onSelectChallenge = (option: Challenge) => {
        dispatch(selectChallenge(option));
    };

    const toggleCurrentDate = () => {
        if (selectedChallenge) {
            const overridableStatus: EChallengeStatus[] = [EChallengeStatus.Skipped, EChallengeStatus.Failed];
            const day = getDate(new Date());
            const status = selectedChallenge.calendar?.[selectedMonth.year]?.[selectedMonth.month]?.[day];
            const isOverridable = overridableStatus.includes(status as EChallengeStatus);
            const canMarkAsDone = !status || isOverridable;

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

    const toggleFutureDate = (date: CustomDate) => {
        if (selectedChallenge) {
            if (selectedChallenge?.calendar?.[selectedMonth.year]?.[selectedMonth.month]?.[date.day]) {
                dispatch(unmarkDay({ challenge: selectedChallenge, date }));
            } else {
                dispatch(markAsSkipped({ challenge: selectedChallenge, date }));
            }
        }
    };

    const onClickPreviousMonth = () => {
        const isFirstMonth = selectedMonth.month === FIRST_MONTH_OF_YEAR;
        const month = isFirstMonth ? LAST_MONTH_OF_YEAR : selectedMonth.month - 1;
        const year = isFirstMonth ? selectedMonth.year - 1 : selectedMonth.year;

        dispatch(selectMonth({ month, year }));
    };

    const onClickNextMonth = () => {
        const isLastMonth = selectedMonth.month === LAST_MONTH_OF_YEAR;
        const nextMonth: number = isLastMonth ? FIRST_MONTH_OF_YEAR : selectedMonth.month + 1;
        const nextYear: number = isLastMonth ? selectedMonth.year + 1 : selectedMonth.year;

        dispatch(selectMonth({ month: nextMonth, year: nextYear }));
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
                            calendar={selectedChallenge.calendar}
                            onClickCurrentDate={toggleCurrentDate}
                            onClickFutureDate={toggleFutureDate}
                            onClickNextMonth={onClickNextMonth}
                            onClickPreviousMonth={onClickPreviousMonth}
                            day={isCurrentMonth ? currentDay : undefined}
                            month={selectedMonth.month}
                            year={selectedMonth.year}
                        />
                    </div>
                )}
            </main>
        </>
    );
};

export default ChallengeCalendarPage;
