import {
  refreshTokenService,
  registerUserService,
  updateUserService,
  changePasswordService,
  loginUserService,
  getAllUsersService,
  getUserByIdService,
} from "../services/users.Services";
import { Request, Response } from "express";
import {registerUserValidation, loginUserValidation, getUserIdFromParamsValidation, updateUserProfileValidation, changePasswordValidation} from "../../zodeValidation/users.Validation"
import { asyncHandler } from "../utility/asyncHandler";

export const registerUserController = asyncHandler(
  async (req:Request, res:Response) => {
    const data = await registerUserValidation.parseAsync(req.body);
    const user = await registerUserService(data);
    if (user){
        res.status(201).json({ message: "user created successfully" });
  }
}
);

// login user
export const loginUserController = asyncHandler(
  async (req:Request, res:Response) => {
    const { password, email } = await loginUserValidation.parseAsync(req.body);
    const login = await loginUserService(email, password);
    if (!login) {
      res.status(400).json({ message: "invalid credentials" });
      return;
    }
    if (login) {
      res.cookie("accessToken", login.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", login.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 5 * 24 * 60 * 60 * 1000,
      })
      res.status(200).json({ message: "login successful" });
      return;
    }
  }
);

// refresh token
export const refreshTokenController = asyncHandler(
  async (req:Request, res:Response) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(400).json({ message: "refresh token is required" });
      return;
    }

    const newAccessToken = await refreshTokenService(refreshToken);
    if (newAccessToken) {
      res
        .cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 15 * 60 * 1000,
        })
        .status(200)
        .json({ message: "access token refreshed successfully" });
      return;
    }
  }
);

// get all users
export const getAllUsersController = asyncHandler(
  async (req:Request, res:Response) => {
    const users = await getAllUsersService();
    res.status(200).json(users);
  }
);

// get user by id
export const getUserByIdController = asyncHandler(
  async (req:Request, res:Response) => {
    const {userId} = await getUserIdFromParamsValidation.parseAsync(req.params);
    const user = await getUserByIdService(userId);
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json(user);
  }
);

// //change password
// export const changePasswordController = asyncHandler(
//   async (req:Request, res:Response) => {
//     const userId = req.user?.userId;
//     const { currentPassword, newPassword } = await changePasswordValidation.parseAsync(req.body);
//     if (!userId) {
//       res.status(401).json({ message: "unauthorized" });
//       return;
//     }
//     await changePasswordService(userId, currentPassword, newPassword);
//     res.status(200).json({ message: "password changed successfully" });
//   }
// );
// // update user profile
// export const updateUserProfileController = asyncHandler(
//   // async (req:Request, res:Response) => {
//   //   const data = await updateUserProfileValidation.parseAsync(req.body);
//   //   if (!userId) {
//   //     res.status(401).json({ message: "unauthorized" });
//   //     return;
//   //   }
//   //   const updatedUser = await updateUserService(userId, data);
//   //   res.status(200).json({ message: "user profile updated successfully", user: updatedUser });
//   }
// );