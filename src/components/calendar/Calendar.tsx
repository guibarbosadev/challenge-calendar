import CalendarBody from '@components/calendar-body/CalendarBody';
import CalendarHeader from '@components/calendar-header/CalendarHeader';
import { ChallengeCalendar, CustomDate } from '@models/challenge';
import React from 'react';
import classNames from './style.module.scss';

interface CalendarProps {
    month: number;
    year: number;
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
