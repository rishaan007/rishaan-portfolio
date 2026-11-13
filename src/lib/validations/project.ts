import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  subtitle: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  short_description: z.string().min(1, 'Description is required'),
  context: z.string().optional(),
  problem_statement: z.string().optional(),
  objectives: z.string().optional(),
  solution: z.string().optional(),
  technical_architecture: z.string().optional(),
  implementation_details: z.string().optional(),
  my_contribution: z.string().optional(),
  challenges: z.string().optional(),
  key_learnings: z.string().optional(),
  github_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  live_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  completion_date: z.string().optional(),
  is_featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']).default('draft'),
  display_order: z.number().int().default(0),
});

export type ProjectInput = z.input<typeof projectSchema>;
export type ProjectOutput = z.output<typeof projectSchema>;
export type ProjectFormValues = ProjectOutput;
