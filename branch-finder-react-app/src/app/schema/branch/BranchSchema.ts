import * as z from 'zod';
import { AddressSchema } from '../address/AddressSchema';

export const BranchSchema = z.object({
  name: z.string(),
  address: AddressSchema,
  coordinates: z.array(z.number().min(-180).max(180)),
});
