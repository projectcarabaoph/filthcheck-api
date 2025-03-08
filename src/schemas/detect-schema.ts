import * as z from 'zod'

export const detectImageSchema = z.object({
    imageURL: z
        .string({ required_error: "Missing required field: imageURL." })
        .url({ message: "Invalid image URL." })
})

export type IDetectImageSchema = z.infer<typeof detectImageSchema>