import prisma from "../prismaInstance";
import bcrypt from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
//register user service

export const registerUserService = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  imgUrl?: string;
  department?: string;
}) => {
  const { password, ...others } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { ...others, password: hashedPassword },
  });
  if (!newUser) return Promise.reject(new Error("user not registered"));
  return newUser;
};

//login user service
export const loginUserService = async (email: string, password: string) => {
  const isValidUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!isValidUser) return Promise.reject(new Error("invalid email credentials"));
  const isPasswordValid = await bcrypt.compare(password, isValidUser.password);
  if (!isPasswordValid) return Promise.reject(new Error("invalid password credentials"));

  console.log(process.env.JWT_TOKEN_SECRET);
  console.log(process.env.REFRESH_TOKEN_SECRET);
  const accessToken = sign(
    {
      id: isValidUser.id,
      lastName: isValidUser.lastName,
      firstName: isValidUser.firstName,
    },
    process.env.JWT_TOKEN_SECRET as string,
    { expiresIn: "15m" },
  );
  const refreshToken = sign(
    { id: isValidUser.id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "5d" },
  );
  return { accessToken, refreshToken };
};

// refresh token service
export const refreshTokenService = async (refreshToken: string) => {
  const decoded = verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
  ) as JwtPayload;
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });
  if (!user) return Promise.reject(new Error("invalid refresh token"));
  const accessToken = sign(
    {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
    },
    process.env.JWT_TOKEN_SECRET as string,
    { expiresIn: "15m" },
  );
  return { accessToken };
};

// get all users service
export const getAllUsersService = async () => {
  const users = await prisma.user.findMany();
  if (!users) return Promise.reject(new Error("no users found"));
  return users;
};

// get user by id service
export const getUserByIdService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { attendances: true },
  });
  if (!user) return Promise.reject(new Error("user not found"));
  return user;
};

//change password service
export const changePasswordService = async (
  userId: number,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) return Promise.reject(new Error("user not found"));
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) return Promise.reject(new Error("invalid old password"));
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword },
  });
  return updatedUser;
};

// delete user service
export const deleteUserService = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) return Promise.reject(new Error("user not found"));
  await prisma.user.update({
    where: { id: userId },
    data: { isDeleted: true }
  });
  return true;
};

//update user service
export const updateUserService = async (
    userId: number,
    updateData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phoneNumber?: string;
      imgUrl?: string;
      department?: string;
    }
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) return Promise.reject(new Error("user not found"));
    const updatedUser = await prisma.user.update({
        where: { id: userId },  
        data: { ...updateData },
    });
    return updatedUser;
};