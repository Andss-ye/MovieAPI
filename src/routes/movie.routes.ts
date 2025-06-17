import { Router } from "express";
import { createMovie, getNewMovies, markMovieAsWatched, getUsersWithWatchedMovies } from "../controllers/movie.controller";

// importing middleware
import { validateSchema } from "../middlewares/zodValidator"

// importing schemas
import { createMovieSchema, markMovieAsWatchedSchema } from "../schemas/movie.schemas";

const router = Router();

router.post("/create", validateSchema(createMovieSchema), createMovie as any);
router.get("/newMovies", getNewMovies as any);
router.post("/markAsWatched", validateSchema(markMovieAsWatchedSchema), markMovieAsWatched as any);
router.get("/users/watched", getUsersWithWatchedMovies as any);

export default router;
