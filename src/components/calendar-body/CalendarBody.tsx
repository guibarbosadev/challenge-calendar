import React from 'react';
import { CalendarMonth, CustomDate, ChallengeCalendar } from '@models/challenge';
import getDay from 'date-fns/getDay';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import { chunkArray } from '@utils/array';
import classNames from './style.module.scss';
import { checkIsCurrentDay, checkIsFutureDate, checkIsPastDate, getDayStatus } from '@utils/calendar';
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

    const daysInTheMonthCount = getDaysInMonth(date);
    const daysInTheMonth = Array.from({ length: daysInTheMonthCount }).map((_, index) => index + 1);
    const dayInTheWeek = getDay(date);
    const firstDayIndex = dayInTheWeek === SUNDAY_AS_FIRST_INDEX ? SUNDAY_AS_LAST_INDEX : dayInTheWeek;
    const cells: (number | undefined)[] = Array.from({ length: CELLS_COUNT });
    cells.splice(firstDayIndex, daysInTheMonthCount, ...daysInTheMonth);
    const weeks = chunkArray([...cells], 7);
    const checkIsCellClickable = (monthDay: number) => {
        const customDate: CustomDate = { day: monthDay, month, year };
        const isClickable = checkIsCurrentDay(customDate) || checkIsFutureDate(customDate);

        return isClickable;
    };

    const getOnClickFunc = (monthDay: number) => {
        let onClickFunc;
        const customDate: CustomDate = { day: monthDay, month, year };

        if (checkIsCurrentDay(customDate)) {
            onClickFunc = () => onClickCurrentDate();
        }

        if (checkIsFutureDate(customDate)) {
            const date: CustomDate = { year, month, day: monthDay };

            onClickFunc = () => onClickFutureDate?.(date);
        }

        return onClickFunc;
    };

    return (
        <div>
            {weeks.map((week, index) => (
                <div key={index} className={classNames.week}>
                    {week.map((monthDay, index) => {
                        const customDate: CustomDate = { year, month, day: monthDay };

                        return (
                            <CalendarCell
                                key={index}
                                status={getDayStatus(calendar, customDate)}
                                onClick={getOnClickFunc(monthDay)}
                                day={monthDay}
                                isClickable={checkIsCellClickable(monthDay)}
                                isPastDate={monthDay && checkIsPastDate(customDate)}
                                isCurrentDay={checkIsCurrentDay(customDate)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default CalendarBody;
