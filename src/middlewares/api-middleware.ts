import { Request, Response, NextFunction } from "express";

import type { TApiKeys } from "@/types";
import { verifyApiToken } from "@/utils/misc/verify-api-token";
import { browserClient } from "@/configs/supabase/browser-client";
import { JwtPayload } from "jsonwebtoken";

const apiMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const apiKey = req.header('X-FilthCheckAPI-Key');

        if (!apiKey) throw new Error('Forbidden')

        const isValidKey = verifyApiToken(apiKey) as JwtPayload;

        if (!isValidKey) throw new Error('Forbidden')

        const supabase = browserClient()

        const { data, error } = await supabase
            .from('api_keys')
            .select('*')
            .eq('profile_id', isValidKey?.id)

            .single<TApiKeys>();

        if (error) throw new Error(error.message)

        if (data) req.apiKey = data

        next()

    } catch (error) {
        if (error instanceof Error) res.status(400).json({ message: error.message || 'Unauthorized' })
    }
}

export default apiMiddleware