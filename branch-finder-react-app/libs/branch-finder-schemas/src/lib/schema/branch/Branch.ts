import * as z from 'zod';
import { BranchSchema } from './BranchSchema';

export type Branch = z.infer<typeof BranchSchema>;
