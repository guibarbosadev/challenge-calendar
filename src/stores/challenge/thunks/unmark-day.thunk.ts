import { createAsyncThunk } from '@reduxjs/toolkit';
import { challengeService } from '@services/challenge';
import { MarkAsSomethingParams } from '@stores/challenge/challenge.types';

const unmarkDay = createAsyncThunk('challenge/unmarkDay', async ({ challenge, date }: MarkAsSomethingParams) => {
    return await challengeService.markDay(challenge, date);
});

export default unmarkDay;
