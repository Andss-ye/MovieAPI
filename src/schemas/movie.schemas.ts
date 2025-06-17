import { z } from 'zod';

export const createMovieSchema = z.object({
    title: z.string().min(1),
    releaseDate: z.string(),
    categoryIds: z.array(z.number())
})