import express from 'express';
import User from '../model/user.model.js';
import { loginUser } from '../controller/auth.controller.js';
const authRouter = express.Router();
authRouter.route('/login').post(loginUser);
export default authRouter;