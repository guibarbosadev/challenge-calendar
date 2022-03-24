import React from 'react';
import classNames from './style.module.scss';
import { format, getDaysInMonth, getDay } from 'date-fns';

const CELLS_COUNT = 35;
const SUNDAY_AS_FIRST_INDEX = 0;
const SUNDAY_AS_LAST_INDEX = 6;

interface CalendarProps {
    month: number;
    year: number;
    day?: number;
}

const Calendar: React.FC<CalendarProps> = ({ month, year, day }) => {
    const date = new Date(`${year}-${month}-${day}`);
    const daysInTheMonthCount = getDaysInMonth(date);
    const daysInTheMonth = Array.from({ length: daysInTheMonthCount }).map((_, index) => index + 1);
    const firstDateOfMonth = new Date(`${year}-${month}-01`);
    const dayInTheWeek = getDay(firstDateOfMonth);
    const firstDayIndex = dayInTheWeek === SUNDAY_AS_FIRST_INDEX ? SUNDAY_AS_LAST_INDEX : dayInTheWeek - 1;
    const cells: (number | undefined)[] = Array.from({ length: CELLS_COUNT });
    cells.splice(firstDayIndex, daysInTheMonthCount, ...daysInTheMonth);

    console.log(dayInTheWeek);

    return (
        <div className={classNames.calendar}>
            <div className={classNames.calendar__header}>{format(date, 'MMM yyyy')}</div>
            <div className={classNames.calendar__body}>
                {cells.map((day, index) => (
                    <div className={classNames.calendar__body__cell}>{day}</div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
