import React from 'react';
import classNames from './style.module.scss';
import { format, getDaysInMonth, getDay } from 'date-fns';
import { chunkArray } from '@utils/array';
import { Challenge, TChallengeStatus, CustomDate, ChallengeCalendar } from '@models/challenge';
import CalendarCell from '@components/calendar-cell/CalendarCell';
import { getDayStatus } from '@utils/challenge';
import CalendarHeader from '@components/calendar-header/CalendarHeader';
import CalendarBody from '@components/calendar-body/CalendarBody';

const CELLS_COUNT = 35;
const SUNDAY_AS_FIRST_INDEX = 0;
const SUNDAY_AS_LAST_INDEX = 6;

interface CalendarProps {
    month: number;
    year: number;
    day?: number;
    calendar: ChallengeCalendar;
    onClickCurrentDate: () => void;
    onClickFutureDate?: (date: CustomDate) => void;
    onClickNextMonth: () => void;
    onClickPreviousMonth: () => void;
}

const Calendar: React.FC<CalendarProps> = ({
    calendar,
    month,
    year,
    day,
    onClickCurrentDate,
    onClickFutureDate,
    onClickNextMonth,
    onClickPreviousMonth
}) => {
    return (
        <div className={classNames.calendar}>
            <CalendarHeader year={year} month={month} onClickNextMonth={onClickNextMonth} onClickPreviousMonth={onClickPreviousMonth} />
            <CalendarBody
                calendarMonth={{ year, month }}
                calendar={calendar}
                onClickCurrentDate={onClickCurrentDate}
                onClickFutureDate={onClickFutureDate}
            />
        </div>
    );
};

export default Calendar;
