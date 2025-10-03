import * as z from 'zod';
import { PostcodeResponseSchema } from './PostcodeResponseSchema';

export type PostcodeResponse = z.infer<typeof PostcodeResponseSchema>;
