// models/userConfigSchema.js
import { z } from 'zod';

export const userConfigSchema = z.object({
  main_currency_code: z.string().length(3).nullable(),
  used_currency_codes: z.array(z.string().length(3)),
});