// src/routes/auth.routes.js
import express from 'express';
import * as authController from '../controllers/auth-controller.js';

const router = express.Router();

router.post('/sign-up', authController.register);
router.post('/login', authController.login);

export default router;