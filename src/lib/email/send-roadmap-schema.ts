import { z } from 'zod';

/**
 * POST /api/send-roadmap — validated JSON body.
 * `roadmapToken` must be the compact or legacy intake encoding (not raw answers JSON from an untrusted custom client — still recomputed server-side).
 */
export const sendRoadmapRequestSchema = z
  .object({
    name: z
      .string()
      .max(120)
      .optional()
      .transform((v) => {
        const t = typeof v === 'string' ? v.trim() : '';
        return t.length ? t : undefined;
      }),
    email: z.string().trim().min(3).max(254).email('Enter a valid email'),
    company: z.union([z.string().trim().max(200), z.literal('')]).optional(),
    roadmapToken: z.string().trim().min(12).max(12000),
    /** Honeypot — must be empty (bots often fill hidden fields). */
    _hp: z.string().optional(),
  })
  .strict()
  .refine((d) => !d._hp?.trim(), { message: 'Invalid request', path: ['_hp'] });

export type SendRoadmapRequest = z.infer<typeof sendRoadmapRequestSchema>;
