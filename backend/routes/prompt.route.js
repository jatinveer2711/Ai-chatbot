import express from 'express';
import { sendPromt } from '../controllers/prompt.contoller.js';
import userMiddleware  from '../middleware/middleware.prompt.js';

const router =express.Router();

router.post("/prompt",userMiddleware,sendPromt)


export default router;
