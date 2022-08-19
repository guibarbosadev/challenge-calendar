import React from 'react';
import { CalendarMonth, CustomDate, ChallengeCalendar } from '@models/challenge';
import getDay from 'date-fns/getDay';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import { chunkArray } from '@utils/array';
import classNames from './style.module.scss';
import { getDayStatus } from '@utils/challenge';
import CalendarCell from '@components/calendar-cell/CalendarCell';
import isSameMonth from 'date-fns/isSameMonth';
import compareDesc from 'date-fns/compareDesc';

interface CalendarBodyProps {
    calendarMonth: CalendarMonth;
    calendar: ChallengeCalendar;
    onClickCurrentDate: () => void;
    onClickFutureDate?: (date: CustomDate) => void;
}

const CELLS_COUNT = 35;
const SUNDAY_AS_FIRST_INDEX = 0;
const SUNDAY_AS_LAST_INDEX = 6;

const CalendarBody: React.FC<CalendarBodyProps> = ({ calendar, calendarMonth, onClickCurrentDate, onClickFutureDate }) => {
    const { year, month } = calendarMonth;
    const date = new Date(`${year}-${month}-02`);

    const currentDate = new Date();
    const daysInTheMonthCount = getDaysInMonth(date);
    const daysInTheMonth = Array.from({ length: daysInTheMonthCount }).map((_, index) => index + 1);
    const dayInTheWeek = getDay(date);
    const firstDayIndex = dayInTheWeek === SUNDAY_AS_FIRST_INDEX ? SUNDAY_AS_LAST_INDEX : dayInTheWeek;
    const cells: (number | undefined)[] = Array.from({ length: CELLS_COUNT });
    cells.splice(firstDayIndex, daysInTheMonthCount, ...daysInTheMonth);
    const weeks = chunkArray([...cells], 7);
    const currentDayOfMonth = new Date().getDate();
    const checkIsSameDay = (monthDay: number) => isSameMonth(date, new Date()) && currentDayOfMonth === monthDay;
    const checkIsFutureDate = (monthDay: number) => {
        const cellDate = new Date(`${year}-${month}-${monthDay}`);
        const isFutureMonth = Boolean(compareDesc(cellDate, currentDate) === -1 ? true : false);
        const isOnCurrentMonth = isSameMonth(cellDate, currentDate);
        const isMonthDayBigger = monthDay > currentDayOfMonth;
        const isFutureDate = isFutureMonth || (isOnCurrentMonth && isMonthDayBigger);

        return isFutureDate;
    };
    const checkIsCellClickable = (monthDay: number) => checkIsSameDay(monthDay) || checkIsFutureDate(monthDay);

    const getOnClickFunc = (monthDay: number) => {
        let onClickFunc;

        if (checkIsSameDay(monthDay)) {
            onClickFunc = () => onClickCurrentDate();
        }

        if (checkIsFutureDate(monthDay)) {
            const date: CustomDate = { year, month, day: monthDay };

            onClickFunc = () => onClickFutureDate?.(date);
        }

        return onClickFunc;
    };

    return (
        <div>
            {weeks.map((week, index) => (
                <div key={index} className={classNames.week}>
                    {week.map((monthDay) => (
                        <CalendarCell
                            key={monthDay}
                            status={getDayStatus(calendar, { year, month, day: monthDay })}
                            onClick={getOnClickFunc(monthDay)}
                            day={monthDay}
                            isClickable={checkIsCellClickable(monthDay)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CalendarBody;
