import express from 'express';
import userRouter from './user.routes.js';
import postRouter from './post.routes.js';
import serviceRouter from './service.routes.js';
const router = express.Router();
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/services', serviceRouter);
export default router;