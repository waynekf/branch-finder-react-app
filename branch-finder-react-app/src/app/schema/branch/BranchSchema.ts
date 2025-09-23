import * as z from 'zod';
import { AddressSchema } from '../address/AddressSchema';

export const BranchSchema = z.object({
  name: z.string(),
  address: AddressSchema,
  coordinates: z.object({
    longitude: z.number().min(-180).max(180),
    latitude: z.number().min(-90).max(90),
    eastings: z.number().min(0),
    northings: z.number().min(0),
  }),
});
