import { Request, Response, NextFunction } from "express";

export const corsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    if (!origin) return next();

    const allowedDomains = req?.apiKey?.domains ? req?.apiKey?.domains.split(',') : []
    if (!allowedDomains.includes(origin)) {
        return res.status(403).json({ error: 'Forbidden.' });
    }

    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
}