import { Router } from "express";
import { getAllAttendanceRecordsController, getAttendanceByDepartmentController } from "../controllers/attendanceController";

const router = Router();
router.get("/", getAllAttendanceRecordsController);
router.get("/department/:departmentId", getAttendanceByDepartmentController);
export default router;