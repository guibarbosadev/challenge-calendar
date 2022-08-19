export interface ChallengeCalendar {
    [year: number]: {
        [month: number]: {
            [day: number]: TChallengeStatus;
        };
    };
}

export interface CustomDate {
    year: number;
    month: number;
    day: number;
}

export interface CalendarMonth {
    month: number;
    year: number;
}

export interface Challenge {
    name: string;
    id: string;
    calendar: ChallengeCalendar;
}

export enum EChallengeStatus {
    Done = 'done',
    Skipped = 'skipped',
    Failed = 'failed'
}

export type TChallengeStatus = EChallengeStatus | undefined;
