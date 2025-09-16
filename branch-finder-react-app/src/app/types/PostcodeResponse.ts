import * as z from 'zod';
import { PostcodeResponseSchema } from '../schema/postcode/PostcodeResponseSchema';

export type PostcodeResponse = z.infer<typeof PostcodeResponseSchema>;
