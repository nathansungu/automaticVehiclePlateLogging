import { z } from "zod";
export const registerUserValidation = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.email().max(100),
  password: z.string().min(8).max(100),
  phoneNumber: z.string().min(10).max(15).optional(),
  departmentId: z.number().min(1).optional(),
});

export const loginUserValidation = z.object({
  email: z.email().max(100),
  password: z.string().min(8).max(100),
});

export const updateUserProfileValidation = z.object({
  name: z.string().min(1).max(100).optional(),
  phoneNumber: z.string().min(10).max(15).optional(),
  imgUrl: z.string().url().optional(),
  departmentId: z.number().min(1).optional(),
});

export const changePasswordValidation = z.object({
  currentPassword: z.string().min(8).max(100),
  newPassword: z.string().min(8).max(100),
});

export const resetPasswordValidation = z.object({
  email: z.email().max(100),
});

export const getUserIdFromParamsValidation = z.object({
  userId: z.string().regex(/^\d+$/).transform((val) => parseInt(val, 10)),
});