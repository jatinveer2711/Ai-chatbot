import express from 'express';
import {logout,login, signUp } from '../controllers/user.controller.js';
const router =express.Router();

router.post("/signup",signUp)  // we use post were we want to send the data

router.post("/login",login)  // we use post were we want to send the data
router.get("/logout",logout) // get request used to fetch the data 
export default router; 
