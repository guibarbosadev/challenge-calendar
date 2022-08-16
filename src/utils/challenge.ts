import { ChallengeCalendar, CustomDate, EChallengeStatus, TChallengeStatus } from '@models/challenge';

export function getDayStatus(calendar: ChallengeCalendar, date: CustomDate): TChallengeStatus {
    const { year, month, day } = date;

    switch (calendar?.[year]?.[month]?.[day]) {
        case EChallengeStatus.Done:
            return EChallengeStatus.Done;
        case EChallengeStatus.Failed:
            return EChallengeStatus.Failed;
        case EChallengeStatus.Skipped:
            return EChallengeStatus.Skipped;
        default:
            return undefined;
    }
}
