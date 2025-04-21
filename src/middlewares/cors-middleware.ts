import { Request, Response, NextFunction } from "express";

const { FRONTEND_URL } = process.env

export const corsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const origin = req.headers.origin;

        if (!origin) return next();

        const whitelistedDomains = req?.apiKey?.domains ? req?.apiKey?.domains.split(',') : []
        const allowedDomains = { FRONTEND_URL, ...whitelistedDomains }

        if (!allowedDomains.includes(origin)) {
            throw new Error('Forbidden')
        }

        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');

        next();
    } catch (error) {
        if (error instanceof Error) res.status(400).json({ message: error.message })
    }
}