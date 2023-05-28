import { IUser } from '@models/user';

export type TAuthenticationStatus = 'authenticated' | 'not-authenticated' | 'authenticating' | 'idle';
export interface AuthState {
    user?: IUser;
    status: TAuthenticationStatus;
}
