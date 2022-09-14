import React from 'react';
import format from 'date-fns/format';
import classNames from './style.module.scss';

interface CalendarHeaderProps {
    year: number;
    month: number;
    onClickPreviousMonth: () => void;
    onClickNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ year, month, onClickPreviousMonth, onClickNextMonth }) => {
    const date = new Date(`${year}-${month}-${3}`);

    return (
        <>
            <div className={classNames.date}>
                <button onClick={onClickPreviousMonth} className={classNames.monthButton}>
                    {'<'}
                </button>
                {format(date, 'MMM yyyy')}
                <button onClick={onClickNextMonth} className={classNames.monthButton}>
                    {'>'}
                </button>
            </div>
            <div className={classNames.weekDays}>
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
        </>
    );
};

export default CalendarHeader;
