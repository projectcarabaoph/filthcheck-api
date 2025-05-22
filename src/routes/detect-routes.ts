import express from 'express';
import { detectImageController } from '../controllers/detect-controllers';

const router = express.Router();

router.post('/', detectImageController);

export default router