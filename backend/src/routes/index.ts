import users from "./userRoutes";
import attendance from "./attendanceRoutes";
import { Router } from "express";

const router = Router();

router.use("/users", users);
router.use("/", attendance);

export default router;