export interface CalendarDate<T> {
    [year: number]: {
        [month: number]: {
            [day: number]: T;
        };
    };
}

export type ChallengesCalendar = CalendarDate<{ [id: string]: ChallengeStatus }>;

export interface Challenge {
    name: string;
    id: string;
}

export enum ChallengeStatus {
    Done = 'done',
    Skipped = 'skipped',
    Failed = 'failed'
}
