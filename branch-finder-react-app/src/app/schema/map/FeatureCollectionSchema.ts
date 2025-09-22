import * as z from 'zod';

export const FeatureCollectionSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(
    z.object({
      type: z.literal('Feature'),
      geometry: z.object({
        type: z.literal('Point'),
        coordinates: z.array(z.number().min(-180).max(180)),
      }),
      properties: z.object({
        title: z.literal(['Home', 'Branch']),
        description: z.string().nonempty(),
        address: z.object({
          addressLine1: z.string(),
          addressLine2: z.string(),
          town: z.string(),
          county: z.string(),
          postcode: z.string(),
        }),
      }),
    }),
  ),
});
