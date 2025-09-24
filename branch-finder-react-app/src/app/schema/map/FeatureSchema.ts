import * as z from 'zod';
import { AddressSchema } from '../address/AddressSchema';

export const FeatureSchema = z.object({
  type: z.literal('Feature'),
  geometry: z.object({
    type: z.literal('Point'),
    coordinates: z.array(z.number()),
  }),
  properties: z.object({
    title: z.literal(['Home', 'Branch']),
    description: z.string().nonempty(),
    address: AddressSchema,
    coordinates2: z.array(z.number()),
    distance: z.number(),
  }),
});
