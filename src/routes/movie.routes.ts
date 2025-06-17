import { Router } from "express";
import { createMovie, getNewMovies, getMovies, markMovieAsWatched } from "../controllers/movie.controller";

// importing middleware
import { validateSchema } from "../middlewares/zodValidator"

// importing schemas
import { createMovieSchema, markMovieAsWatchedSchema } from "../schemas/movie.schemas";

const router = Router();

router.post("/create", validateSchema(createMovieSchema), createMovie as any);

// Ejemplo: GET /api/movies?title=avengers&categoryId=1&page=1&limit=10
router.get('/', getMovies as any);

router.get("/newMovies", getNewMovies as any);
router.post("/markAsWatched", validateSchema(markMovieAsWatchedSchema), markMovieAsWatched as any);


export default router;
