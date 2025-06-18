import { Router } from "express";
import { createUser, getUsersWithWatchedMovies } from "../controllers/user.controller";

// importing middleware
import { validateSchema } from "../middlewares/zodValidator"

// importing schemas
import { createUserSchema } from "../schemas/user.schemas";

const router = Router();

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input data
 */
router.post("/create", validateSchema(createUserSchema), createUser as any);

/**
 * @swagger
 * /users/watched:
 *   get:
 *     summary: Get users with their watched movies
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users with their watched movies
 *       400:
 *         description: Error retrieving users
 */
router.get("/watched", getUsersWithWatchedMovies as any);

export default router;
