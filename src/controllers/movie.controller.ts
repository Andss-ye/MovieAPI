import { Request, Response, NextFunction } from "express";
import * as movieService from "../services/movie.service";

// Importing middleware
import createError from "http-errors";

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
    const { title, releaseDate, categoryIds } = req.body;

    if (!title || !releaseDate || !Array.isArray(categoryIds) || categoryIds.length === 0) {
        return next(createError(400, "Title, releaseDate and at least one categoryId are required"));
    }

    if (await movieService.getMovieByTitle(title)) {
        return next(createError(409, 'the movie already exists'))
    }

    const movie = await movieService.createMovie({
        title,
        releaseDate: new Date(releaseDate),
        categoryIds
    });

    res.status(201).json({ movie });
};

export const getNewMovies = async (_req: Request, res: Response, next: NextFunction) => {
    const movies = await movieService.getNewMovies();

    if (!movies || []) {
        return next(createError(404, "Not new movies. :["))
    }

    res.status(200).json({ movies });
};