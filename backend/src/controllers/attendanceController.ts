import { asyncHandler } from "../utility/asyncHandler";
import {getAllAttendanceRecordsService, getAttendanceByDepartmentService} from "../services/attendance.Service";
import { Request, Response } from "express";

//get all attendance records
export const getAllAttendanceRecordsController = asyncHandler(async (req: Request, res: Response) => {
    
});