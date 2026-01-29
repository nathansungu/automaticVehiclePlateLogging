import prisma from "../prismaInstance";
//record attendance

export const recordAttendance = async (plateNo:string, confidenceScore: number)=> {
    const isRegistered = await prisma.vehicle.findUnique({
        where: { plateNo }
    });

    if (!isRegistered) {
        await prisma.unregisteredVehicle.create({
            data: { plateNo , confidenceScore}
        });
    }
    const attendanceRecord = await prisma.attendance.create({
        data:{vehicleId: isRegistered!.id, confidenceScore: confidenceScore, userId: isRegistered!.userId}
    });
    if (attendanceRecord) {
        return attendanceRecord;
    }
    throw new Error("Failed to record attendance");

};

//get all attendance records
//by user id or vehicle id
export const getAllAttendanceRecords = async (userId?: number, vehicleId?: number) => {
    const attendanceRecords = await prisma.attendance.findMany({
        where: {
            ...(userId && { userId }),
            ...(vehicleId && { vehicleId })
        },
        include: {
            vehicle: true,
            user: {
                include: {
                    department: true
                }
            }
        }
    });
    return attendanceRecords;
};

// get attendance by department
export const getAttendanceByDepartment = async (departmentId: number) => {
    const attendanceRecords = await prisma.attendance.findMany({
        where: {
            user: {
                departmentId: departmentId
            }
        },
        include: {
            vehicle: true,
            user: {
                include: {
                    department: true
                }
            }
        }
    });
    return attendanceRecords;
};
