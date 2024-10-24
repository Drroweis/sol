import express from 'express';
import { spin } from '../controllers/gameController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/spin', auth, spin);

export default router;