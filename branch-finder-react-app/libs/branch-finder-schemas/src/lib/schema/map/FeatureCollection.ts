import * as z from 'zod';
import { FeatureCollectionSchema } from './FeatureCollectionSchema';

export type FeatureCollection = z.infer<typeof FeatureCollectionSchema>;
