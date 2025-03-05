
import { pipeline, env } from "@huggingface/transformers";
import dotenv from 'dotenv'

dotenv.config()

// env.localModelPath = process.cwd() + "/src/models";
// env.allowLocalModels = true;
env.allowRemoteModels = true;
env.cacheDir = './.cache';

const nsfwDetector = async (image) => {

    try {

        const { HUGGINGFACE_MODEL } = process.env

        const classifier = await pipeline('image-classification', HUGGINGFACE_MODEL, {
            dtype: 'fp16'
        });

        const response = await classifier(image);

        return response
    } catch (error) {
        if (error instanceof Error) throw new Error(`Failed to process image: ${error?.message}`);
    }

}

export default nsfwDetector



