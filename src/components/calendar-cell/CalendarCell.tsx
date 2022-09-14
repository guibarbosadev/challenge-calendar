import React, { useLayoutEffect } from 'react';
import { EChallengeStatus, TChallengeStatus } from '@models/challenge';
import classNames from './style.module.scss';
import { checkIsPastDate } from '../../utils/calendar';

interface CalendarCellProps {
    day: number;
    status: TChallengeStatus;
    isClickable: boolean;
    isPastDate: boolean;
    onClick?: () => void;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ day, status, isPastDate, isClickable = false, onClick }) => {
    const [didUpdateStatus, setDidUpdateStatus] = React.useState<boolean | undefined>(undefined);

    useLayoutEffect(() => {
        if (didUpdateStatus === undefined) {
            setDidUpdateStatus(false);
        } else {
            setDidUpdateStatus(true);
        }
    }, [status]);

    const getCellClassNames = () => {
        let cellClassNames = [classNames.day];

        if (isPastDate) {
            cellClassNames = [...cellClassNames, classNames.pastDate];
        }

        if (isClickable) {
            cellClassNames = [...cellClassNames, classNames.clickable];
        }

        if (didUpdateStatus) {
            cellClassNames = [...cellClassNames, classNames.didUpdate];
        }

        switch (status) {
            case EChallengeStatus.Done: {
                cellClassNames = [...cellClassNames, classNames.done];
                break;
            }
            case EChallengeStatus.Skipped: {
                cellClassNames = [...cellClassNames, classNames.skipped];
                break;
            }
        }

        const response = cellClassNames.join(' ');

        return response;
    };

    return (
        <div onClick={onClick} className={getCellClassNames()}>
            {day}
        </div>
    );
};

export default CalendarCell;
