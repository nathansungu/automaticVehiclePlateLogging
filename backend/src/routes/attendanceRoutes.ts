import { Router } from "express";
import { addManualAttendanceController, getAllAttendanceRecordsController, getAttendanceByDepartmentController } from "../controllers/attendanceController";

const router = Router();
router.get("/", getAllAttendanceRecordsController);
router.get("/department/:departmentId", getAttendanceByDepartmentController);
router.post("/", addManualAttendanceController);
export default router;