import express from 'express';
import { detectImageController } from '../controllers/detect-controllers';

const router = express.Router();

router.post('/image', detectImageController);

export default router