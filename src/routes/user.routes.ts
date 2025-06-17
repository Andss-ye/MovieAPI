import { Router } from "express";
import { createUser, getUsersWithWatchedMovies } from "../controllers/user.controller";

// importing middleware
import { validateSchema } from "../middlewares/zodValidator"

// importing schemas
import { createUserSchema } from "../schemas/user.schemas";

const router = Router();

router.post("/create", validateSchema(createUserSchema), createUser as any);
router.get("/watched", getUsersWithWatchedMovies as any);

export default router;
