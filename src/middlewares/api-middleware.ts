import { Request, Response, NextFunction } from "express";

import type { TApiKeys } from "../types";
import { verifyApiToken } from "../utils/misc/verify-api-token";
import { browserClient } from "../configs/supabase/browser-client";
import { JwtPayload } from "jsonwebtoken";

const apiMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const apiKey = req.header('X-FilthCheckAPI-Key');

        if (!apiKey) {
            throw new Error('Forbidden');
        }

        const tokenPayload = verifyApiToken(apiKey) as JwtPayload | null;
        if (!tokenPayload?.id) {
            throw new Error('Forbidden');
        }

        const supabase = browserClient();

        const { data, error } = await supabase
            .from('api_keys')
            .select('*')
            .eq('profile_id', tokenPayload.id)
            .single<TApiKeys>();

        if (error) {

            if (error.code === 'PGRST116') {
                throw new Error('Forbidden');
            }
            throw new Error(`Supabase error: ${error.message}`);
        }

        if (!data) {
            throw new Error('Forbidden');
        }

        req.apiKey = data;

        next()

    } catch (error) {
        if (error instanceof Error) res.status(400).json({ message: error.message || 'Unauthorized' })
    }
}

export default apiMiddleware