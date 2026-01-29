import {z} from "zod";
export const recordAttendanceSchema = z.object({
    plateNo: z.string().min(1, "Plate number is required"),
    confidenceScore: z.number().min(0).max(1, "Confidence score must be between 0 and 1"),
});

export const getAttendanceByDepartmentSchema = z.object({
    departmentId: z.number().min(1, "Department ID is required"),
});

export const getAllAttendanceRecordsSchema = z.object({
    userId: z.number().min(1).optional(),
    vehicleId: z.number().min(1).optional(),
});

