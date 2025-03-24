import * as  z from 'zod'
import dontenv from 'dotenv'

dontenv.config()

const {
    NODE_PUBLIC_SUPABASE_URL,
    NODE_PUBLIC_SUPABASE_ANON_KEY
} = process.env

export function clientKeys() {
    return z
        .object({
            clientUrl: z.string().min(1),
            clientAnonKey: z.string().min(1),
        })
        .parse({
            clientUrl: NODE_PUBLIC_SUPABASE_URL,
            clientAnonKey: NODE_PUBLIC_SUPABASE_ANON_KEY,
        });
}
