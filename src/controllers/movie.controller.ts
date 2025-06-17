import { Request, Response, NextFunction } from "express";
import * as movieService from "../services/movie.service";

// Importing middleware
import createError from "http-errors";

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
    const { title, releaseDate, categoryIds } = req.body;

    if (!title || !releaseDate || !Array.isArray(categoryIds) || categoryIds.length === 0) {
        return next(createError(400, "Title, releaseDate and at least one categoryId are required"));
    }

    const movieFound = await movieService.getMovieByTitle(title)

    if (movieFound.length > 0) {
        return next(createError(409, 'the movie already exists'))
    }

    const movie = await movieService.createMovie({
        title,
        releaseDate,
        categoryIds
    });

    res.status(201).json({ movie });
};

export const getNewMovies = async (_req: Request, res: Response, next: NextFunction) => {
    const movies = await movieService.getNewMovies();

    if (!movies || movies.length === 0) {
        return next(createError(404, "Not new movies. :["))
    }

    res.status(200).json({ movies });
};

export const markMovieAsWatched = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
        return next(createError(400, "userId and movieId are required"));
    }

    try {
        const viewedMovie = await movieService.markMovieAsWatched(Number(userId), Number(movieId));
        res.status(200).json({ viewedMovie });
    } catch (error: any) {
        if (error.message === 'Movie not found' || error.message === 'User not found') {
            return next(createError(404, error.message));
        }
        if (error.message === 'Movie already marked as watched by this user') {
            return next(createError(409, error.message));
        }
        next(error);
    }
};

export const getMovies = async (req: Request, res: Response) => {
    try {
        const { 
            title, 
            categoryId, 
            page = '1', 
            limit = '5' 
        } = req.query;

        const filters = {
            title: title as string | undefined,
            categoryId: categoryId ? Number(categoryId) : undefined,
            page: Number(page),
            limit: Number(limit)
        };

        const result = await movieService.getMoviesList(filters);
        res.json(result);
    } catch (error) {
        console.error('Error getting movies:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Error al obtener las películas' 
        });
    }
};