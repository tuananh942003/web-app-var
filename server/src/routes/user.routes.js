import express from "express";
import {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "../controller/user.controller.js";

const userRouter = express.Router();
userRouter.route("/").post(createUser).get(getAllUsers);
userRouter.route("/:id").put(updateUserById).delete(deleteUserById);

userRouter.route("/:id").delete(deleteUserById);
export default userRouter;
