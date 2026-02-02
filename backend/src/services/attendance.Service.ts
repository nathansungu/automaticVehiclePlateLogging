import prisma from "../prismaInstance";
import axios from "axios";
//record attendance

const recentDetections = new Map<string, number>();
const COOLDOWN = 60 * 1000;

export const recordAttendanceService = async () => {
  try {
    const response = await axios.get("http://localhost:5000/detect-plate");
    console.log("YOLO response:", response.data);
    const { plate_text:plateNumber, confidenceScore} = response.data;
    console.log("Detected plate number:", plateNumber);
    if (!plateNumber) return;

    const now = Date.now();

    if (recentDetections.has(plateNumber)) {
      const lastSeen = recentDetections.get(plateNumber)!;
      if (now - lastSeen < COOLDOWN) {
        console.log("Duplicate vehicle ignored:", plateNumber);
        return;
      }
    }

    // Update cache
    recentDetections.set(plateNumber, now);

    const isRegistered = await prisma.vehicle.findUnique({
      where: { plateNo: plateNumber },
    });

    if (!isRegistered) {
      await prisma.unregisteredVehicle.create({
        data: {
          plateNo: plateNumber,
          confidenceScore: confidenceScore,
        },
      });
      console.log("Unregistered vehicle:", plateNumber);
      return;
    }

    await prisma.attendance.create({
      data: {
        vehicleId: isRegistered.id,
        userId: isRegistered.userId,
        confidenceScore: confidenceScore,
      },
    });

    console.log("Attendance recorded:", plateNumber);
  } catch (err) {
    console.error("Error recording attendance:", err);
    return Promise.reject(new Error("Error recording attendance"));
  }
};

//get all attendance records
//by user id or vehicle id
export const getAllAttendanceRecordsService = async (
  userId?: number,
  vehicleId?: number,
) => {
  const attendanceRecords = await prisma.attendance.findMany({
    where: {
      ...(userId && { userId }),
      ...(vehicleId && { vehicleId }),
    },
    include: {
      vehicle: true,
      user: {
        include: {
          department: true,
        },
      },
    },
  });
  return attendanceRecords;
};

// get attendance by department
export const getAttendanceByDepartmentService = async (
  departmentId: number,
) => {
  const attendanceRecords = await prisma.attendance.findMany({
    where: {
      user: {
        departmentId: departmentId,
      },
    },
    include: {
      vehicle: true,
      user: {
        include: {
          department: true,
        },
      },
    },
  });
  return attendanceRecords;
};
