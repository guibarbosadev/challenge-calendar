import React from 'react';
import classNames from './style.module.scss';
import { format, getDaysInMonth, getDay, isSameDay } from 'date-fns';
import { chunkArray } from '../../utils/array';

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
    const firstDayIndex = dayInTheWeek === SUNDAY_AS_FIRST_INDEX ? SUNDAY_AS_LAST_INDEX : dayInTheWeek;
    const cells: (number | undefined)[] = Array.from({ length: CELLS_COUNT });
    cells.splice(firstDayIndex, daysInTheMonthCount, ...daysInTheMonth);
    const weeks = chunkArray([...cells], 7);
    const currentDate = new Date();
    const checkIsSameDay = (weekDay: number) => day === weekDay;

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
                        {week.map((weekDay) => (
                            <div
                                className={`${classNames.calendar__body__week__day}  ${
                                    checkIsSameDay(weekDay) ? classNames.calendar__body__week__currentDay : ''
                                }`}
                            >
                                {weekDay}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
