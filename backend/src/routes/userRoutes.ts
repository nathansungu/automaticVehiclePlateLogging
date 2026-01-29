import {
  registerUserController,
  loginUserController,
  refreshTokenController,
  getAllUsersController,
  getUserByIdController,
} from "../controllers/userController";

import { Router } from "express";

const users = Router();
users.post("/register", registerUserController);
users.post("/login", loginUserController);
users.post("/refresh-token", refreshTokenController);          
users.get("/", getAllUsersController);
users.get("/:userId", getUserByIdController);

export default users;