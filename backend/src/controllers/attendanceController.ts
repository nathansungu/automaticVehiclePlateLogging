import { asyncHandler } from "../utility/asyncHandler";
import {getAllAttendanceRecordsService, getAttendanceByDepartmentService, recordAttendanceServiceManual} from "../services/attendance.Service";
import { Request, Response } from "express";
import { getAllAttendanceRecordsValidation, getAttendanceByDepartmentValidation } from "../../zodeValidation/attendance.Validation";

//get all attendance records
export const getAllAttendanceRecordsController = asyncHandler(async (req: Request, res: Response) => {
    const {userId, vehicleId} = await getAllAttendanceRecordsValidation.parseAsync(req.query);
    const attendanceRecords = await getAllAttendanceRecordsService(userId, vehicleId);
    res.status(200).json({
         attendanceRecords
    });
});

// get attendance by department
export const getAttendanceByDepartmentController = asyncHandler(async (req: Request, res: Response) => {
    const { departmentId } = await getAttendanceByDepartmentValidation.parseAsync(req.params);
    const attendanceRecords = await getAttendanceByDepartmentService(Number(departmentId));
    res.status(200).json({
        attendanceRecords
    });
});

//add attendance manually
 export const addManualAttendanceController = asyncHandler(async (req: Request, res: Response) => {
     const { vehicleId, confidenceScore } = req.body;
     
     const attendanceRecord = await recordAttendanceServiceManual(vehicleId, confidenceScore);
    res.status(201).json({
        attendanceRecord
    });
 });
