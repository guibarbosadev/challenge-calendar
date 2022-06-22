export interface ChallengeCalendar {
    [year: number]: {
        [month: number]: {
            [day: number]: ChallengeStatus;
        };
    };
}

export interface CustomDate {
    year: number;
    month: number;
    day: number;
}

export interface Challenge {
    name: string;
    id: string;
    calendar: ChallengeCalendar;
}

export enum ChallengeStatus {
    Done = 'done',
    Skipped = 'skipped',
    Failed = 'failed'
}
