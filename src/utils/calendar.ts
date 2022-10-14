import { ChallengeCalendar, CustomDate, EChallengeStatus, TChallengeStatus } from '@models/challenge';
import isSameDay from 'date-fns/isSameDay';
import isFuture from 'date-fns/isFuture';

export function getDayStatus(calendar: ChallengeCalendar, date: CustomDate): TChallengeStatus {
    const { year, month, day } = date;

    switch (calendar?.[year]?.[month]?.[day]) {
        case EChallengeStatus.Done:
            return EChallengeStatus.Done;
        case EChallengeStatus.Skipped:
            return EChallengeStatus.Skipped;
        default:
            return undefined;
    }
}

export function normalizeDate(customDate: CustomDate) {
    const { year, month, day } = customDate;
    const date = new Date(year, month - 1, day);

    return date;
}

export function checkIsFutureDate(customDate: CustomDate) {
    const normalizedDate = normalizeDate(customDate);
    const isFutureDate = isFuture(normalizedDate);

    return isFutureDate;
}

export function checkIsCurrentDay(customDate: CustomDate) {
    const currentDate = new Date();
    const normalizedDate = normalizeDate(customDate);
    const isCurrentDay = isSameDay(normalizedDate, currentDate);

    return isCurrentDay;
}

export function checkIsPastDate(customDate: CustomDate) {
    const isFutureDate = checkIsFutureDate(customDate);
    const isCurrentDay = checkIsCurrentDay(customDate);
    const isPastDate = !isFutureDate && !isCurrentDay;

    return isPastDate;
}
