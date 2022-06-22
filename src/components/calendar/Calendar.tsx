import React from 'react';
import classNames from './style.module.scss';
import { format, getDaysInMonth, getDay } from 'date-fns';
import { chunkArray } from '../../utils/array';
import { ChallengeStatus, Challenge } from '../../models/challenge';

const CELLS_COUNT = 35;
const SUNDAY_AS_FIRST_INDEX = 0;
const SUNDAY_AS_LAST_INDEX = 6;

interface CalendarProps {
    month: number;
    year: number;
    day?: number;
    challenge: Challenge;
    onClickCurrentDate: (status: ChallengeStatus) => void;
    onClickFutureDate?: (monthDay: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ challenge, month, year, day, onClickCurrentDate, onClickFutureDate }) => {
    const date = new Date(`${year}-${month}-${day}`);
    const daysInTheMonthCount = getDaysInMonth(date);
    const daysInTheMonth = Array.from({ length: daysInTheMonthCount }).map((_, index) => index + 1);
    const firstDateOfMonth = new Date(`${year}-${month}-01`);
    const dayInTheWeek = getDay(firstDateOfMonth);
    const firstDayIndex = dayInTheWeek === SUNDAY_AS_FIRST_INDEX ? SUNDAY_AS_LAST_INDEX : dayInTheWeek;
    const cells: (number | undefined)[] = Array.from({ length: CELLS_COUNT });
    cells.splice(firstDayIndex, daysInTheMonthCount, ...daysInTheMonth);
    const weeks = chunkArray([...cells], 7);
    const currentDayOfMonth = new Date().getDate();
    const checkIsSameDay = (monthDay: number) => day === monthDay;
    const checkIsDone = (monthDay: number) => challenge.calendar?.[year]?.[month]?.[monthDay] === ChallengeStatus.Done;
    const checkIsFutureDate = (monthDay: number) => monthDay > currentDayOfMonth;
    const getOnClickFunc = (monthDay: number) => {
        let onClickFunc;

        if (checkIsSameDay(monthDay)) {
            onClickFunc = () => onClickCurrentDate(challenge.calendar?.[year]?.[month]?.[monthDay]);
        }

        if (checkIsFutureDate(monthDay)) {
            onClickFunc = () => onClickFutureDate?.(monthDay);
        }

        return onClickFunc;
    };

    console.log(challenge.calendar[2022][6][21]);

    return (
        <div className={classNames.calendar}>
            <div className={classNames.calendar__date}>{format(date, 'MMM yyyy')}</div>
            <div className={classNames.calendar__week}>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
            </div>
            <div className={classNames.calendar__body}>
                {weeks.map((week) => (
                    <div className={classNames.calendar__body__week}>
                        {week.map((monthDay) => (
                            <div
                                key={monthDay}
                                onClick={getOnClickFunc(monthDay)}
                                className={`${classNames.calendar__body__week__day} ${
                                    checkIsSameDay(monthDay) ? classNames.calendar__body__week__currentDay : ''
                                }
                                ${checkIsDone(monthDay) ? classNames.calendar__body__week__done : ''}`}
                            >
                                {monthDay}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
