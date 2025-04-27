import { Request, Response, NextFunction } from "express";

export const corsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const origin = req.headers.origin;

        if (!origin) return next();

        const whitelistedDomains = req.apiKey?.domains?.split(',') ?? [];

        if (!whitelistedDomains.includes(origin)) {
            throw new Error('Forbidden by CORS policy');
        }

        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'POST');
        res.header('Access-Control-Allow-Headers', 'Content-Type, X-FilthCheckAPI-Key');

        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Unknown error in CORS middleware' });
        }
    }
};
