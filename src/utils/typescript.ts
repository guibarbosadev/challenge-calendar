import { PayloadAction } from '@reduxjs/toolkit';

export type ExtractPayloadType<T> = T extends PayloadAction<infer P> ? P : never;
