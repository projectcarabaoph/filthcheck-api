import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'

dotenv.config()

const { NODE_ENV } = process.env

const corsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const origin = req.headers.origin as string

        if (!origin && NODE_ENV !== 'development') throw new Error('Forbidden.')

        const whitelistedDomains = req?.apiKey?.domains ? req?.apiKey?.domains.split(',') : []

        if (!whitelistedDomains.includes(origin)) throw new Error('Forbidden.')

        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'POST');
        res.header('Access-Control-Allow-Headers', 'Content-Type, X-FilthCheckAPI-Key');

        next()
    } catch (error) {
        if (error instanceof Error) res.status(400).json({ message: error.message })
    }

};

export default corsMiddleware