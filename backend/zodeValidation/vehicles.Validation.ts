import zode from "zod";

export const addAttendanceValidation = zode.object({
  userId: zode.string().uuid(),
  plateNo: zode.string().min(1).max(20),
  vehicleType: zode.enum(['CAR', 'BIKE', 'TRUCK', 'BUS', 'OTHER']),
  color: zode.string().max(20).optional()
});
