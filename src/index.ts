import express from 'express'
import cors, { CorsOptions } from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import dotenv from 'dotenv'

import detectRoutes from './routes/detect-routes'

import { corsMiddleware } from './middlewares/cors-middleware'
import apiMiddleware from './middlewares/api-middleware'
import analyticsMiddleware from './middlewares/analytics-middleware'

import customCron from './utils/misc/custom-cron'

dotenv.config()

const { NODE_PORT, NODE_PUBLIC_DEV_BASE_URL } = process.env

customCron.start()

const corsOptions: CorsOptions = {
    origin: [NODE_PUBLIC_DEV_BASE_URL as string],
    methods: ["POST"],
    credentials: false,
    allowedHeaders: ["Content-Type", "X-FilthCheckAPI-Key"]
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

const app = express()

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('common'));
app.use(express.json());

// app.set('trust proxy', 1);

// app.use(limiter);
app.use(apiMiddleware)
app.use(corsMiddleware)
app.use(analyticsMiddleware)

app.use('/api/detect', detectRoutes)

app.use((req, res, next) => {
    res.status(404).send('Page Not Found')
});


const port = NODE_PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

export default app