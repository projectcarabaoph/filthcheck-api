import jwt, { JwtPayload, JsonWebTokenError } from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const { JWT_SECRET } = process.env

export const verifyApiToken = (token: string): JwtPayload | string | null => {
    if (!JWT_SECRET) {
        console.error('JWT_SECRET is not defined');
        return null;
    }

    try {
        return jwt.verify(token, JWT_SECRET as string);
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            throw new Error(`Invalid API Key: ${error.message}`);
        }

        if (error instanceof Error) {
            throw new Error(`API Key Verification Error: ${error.message}`);
        }
    }
    return null;
}
