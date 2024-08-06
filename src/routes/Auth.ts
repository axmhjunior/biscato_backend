import express from 'express';

const router = express.Router();
import { AuthController } from "../controller/AuthController";

const authController = new AuthController()


router.post('/',  (request, response)=>{authController.login(request, response)})
router.post('/otp',  (request, response)=>{authController.authOtp(request, response)})

module.exports =  router;