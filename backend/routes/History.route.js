import express from 'express';
import userMiddleware  from '../middleware/middleware.prompt.js';


import { saveHistory, getHistoryByUser } from '../controllers/History.controller.js'; 
const router = express.Router();

router.post('/save',userMiddleware, saveHistory);
router.get('/history',userMiddleware, getHistoryByUser);

export default router;
