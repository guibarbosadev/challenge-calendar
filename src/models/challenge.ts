export interface CalendarDate<T> {
    [year: number]: {
        [month: number]: {
            [day: number]: T;
        };
    };
}

export interface CustomDate {
    year: number;
    month: number;
    day: number;
}

export type ChallengesCalendar = CalendarDate<{ [id: string]: ChallengeStatus }>;

export interface Challenge {
    name: string;
    id: string;
    calendar: ChallengeC;
}

export enum ChallengeStatus {
    Done = 'done',
    Skipped = 'skipped',
    Failed = 'failed'
}
