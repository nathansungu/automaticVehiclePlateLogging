import users from "./userRoutes";
import { Router } from "express";

const router = Router();

router.use("/users", users);

export default router;