import { Request, Response, NextFunction } from "express";
import { browserClient } from "@/configs/supabase/browser-client";

const analyticsMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const supabase = browserClient()

    const start = performance.now()

    res.on('finish', async () => {
        const duration = performance.now() - start

        await supabase.from('analytics').insert({
            profile_id: req.apiKey?.profile_id,
            project_id: req.apiKey?.project_id,
            path: req.path,
            method: req.method,
            status_code: res.statusCode,
            response_time_ms: duration,
            ip_address: req.ip
        })
    })

    next()
}

export default analyticsMiddleware