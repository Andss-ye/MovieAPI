import { Router } from "express";
import { createMovie, getNewMovies, getMovies, markMovieAsWatched } from "../controllers/movie.controller";

// importing middleware
import { validateSchema } from "../middlewares/zodValidator"

// importing schemas
import { createMovieSchema, markMovieAsWatchedSchema } from "../schemas/movie.schemas";

const router = Router();

/**
 * @swagger
 * /movies/create:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - releaseDate
 *               - categoryIds
 *             properties:
 *               title:
 *                 type: string
 *                 example: Ted 2
 *               releaseDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-06T00:00:00.000Z"
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [5]
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Move already exists
 */
router.post("/create", validateSchema(createMovieSchema), createMovie as any);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies with optional filters
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter movies by title
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: number
 *         description: Filter movies by category
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of movies
 *       400:
 *         description: Invalid query parameters
 */
router.get('/', getMovies as any);

/**
 * @swagger
 * /movies/newMovies:
 *   get:
 *     summary: Get new movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of new movies
 */
router.get("/newMovies", getNewMovies as any);

/**
 * @swagger
 * /movies/markAsWatched:
 *   post:
 *     summary: Mark a movie as watched
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - movieId
 *             properties:
 *               userId:
 *                 type: number
 *               movieId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Movie marked as watched successfully
 *       400:
 *         description: Invalid input data
 */
router.post("/markAsWatched", validateSchema(markMovieAsWatchedSchema), markMovieAsWatched as any);

export default router;
