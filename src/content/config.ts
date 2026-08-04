import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    ShortDescription: z.string(),
    tags: z.array(z.string()).optional().default([]),
    coverImage: z.string().optional(),
  }),
});

export const collections = { projects };
