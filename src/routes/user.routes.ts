import { Router } from "express";
import { createUser } from "../controllers/user.controller";

// importing middleware
import { validateSchema } from "../middlewares/zodValidator"

// importing schemas
import { createUserSchema } from "../schemas/user.schemas";

const router = Router();

router.post("/create", validateSchema(createUserSchema), createUser as any);

export default router;
