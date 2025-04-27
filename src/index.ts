import express from 'express'
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

const { NODE_PORT } = process.env

customCron.start()


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

const app = express()

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());


app.use(limiter);
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