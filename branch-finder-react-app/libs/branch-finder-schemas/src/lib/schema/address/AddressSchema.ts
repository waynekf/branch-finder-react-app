import * as z from 'zod';

export const AddressSchema = z.object({
  addressLine1: z.string(),
  addressLine2: z.string(),
  town: z.string(),
  county: z.string(),
  postcode: z.string(),
});
