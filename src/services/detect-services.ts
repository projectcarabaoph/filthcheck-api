
import { Request, Response } from 'express';
import * as z from 'zod'
import nsfwDetector from '../utils/nsfw-detector.js';
import { detectImageSchema } from '../schemas/detect-schema';


export const detectImageService = async (request: Request, response: Response) => {

    try {

        const { imageURL } = detectImageSchema.parse(request.body);

        const headResponse = await fetch(imageURL, { method: "HEAD" });

        const contentType = headResponse.headers.get("content-type");
        if (!contentType || !contentType.startsWith("image/")) {

            throw new Error(`Not an image. Content-Type: ${contentType}`);
        }

        const data = await nsfwDetector(imageURL);

        return { status: 200, data };

    } catch (error) {

        if (error instanceof z.ZodError) throw new Error(error.errors[0]?.message);

        if (error instanceof Error) throw new Error(error.message);
    }
}

