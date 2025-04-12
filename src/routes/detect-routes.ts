import express from 'express';
import { detectImageController } from '../controllers/detect-controllers';
import apiMiddleware from '@/middlewares/api-middleware';
import { corsMiddleware } from '@/middlewares/cors-middleware';

const router = express.Router();

router.post('/image', apiMiddleware, detectImageController);

export default router