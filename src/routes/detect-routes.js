import express from 'express';
import { detectImageController } from '../controllers/detect-controllers.js';

const router = express.Router();

router.post('/image', detectImageController);

export default router