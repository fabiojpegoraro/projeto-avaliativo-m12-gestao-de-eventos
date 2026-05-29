import { z } from 'zod';

export const EVENT_CATEGORIES = [
  'Conferência',
  'Workshop',
  'Webinar',
  'Networking',
  'Outro',
] as const;

export const eventSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório.')
    .max(100, 'Nome deve ter no máximo 100 caracteres.'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória.')
    .max(100, 'Descrição deve ter no máximo 100 caracteres.'),
  dateTime: z.string().min(1, 'Data e hora são obrigatórias.'),
  location: z
    .string()
    .min(1, 'Local é obrigatório.')
    .max(50, 'Local deve ter no máximo 50 caracteres.'),
  category: z.enum(EVENT_CATEGORIES, {
    message: 'Selecione uma categoria válida.',
  }),
});

export type EventSchema = z.infer<typeof eventSchema>;
