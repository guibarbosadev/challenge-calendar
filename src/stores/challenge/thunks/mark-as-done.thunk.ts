import { EChallengeStatus } from '@models/challenge';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { challengeService } from '@services/challenge';
import { MarkAsSomethingParams } from '@stores/challenge/challenge.types';

const markAsDone = createAsyncThunk('challenge/markAsDone', async ({ challenge, date }: MarkAsSomethingParams) => {
    return await challengeService.markDay(challenge, date, EChallengeStatus.Done);
});

export default markAsDone;
