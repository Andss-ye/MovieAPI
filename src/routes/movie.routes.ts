import { Router } from "express";
import { createMovie, getNewMovies, markMovieAsWatched } from "../controllers/movie.controller";

// importing middleware
import { validateSchema } from "../middlewares/zodValidator"

// importing schemas
import { createMovieSchema, markMovieAsWatchedSchema } from "../schemas/movie.schemas";

const router = Router();

router.post("/create", validateSchema(createMovieSchema), createMovie as any);
router.get("/newMovies", getNewMovies as any);
router.post("/markAsWatched", validateSchema(markMovieAsWatchedSchema), markMovieAsWatched as any);

export default router;
