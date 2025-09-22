import * as z from 'zod';
import { FeatureSchema } from './FeatureSchema';

export type Feature = z.infer<typeof FeatureSchema>;
