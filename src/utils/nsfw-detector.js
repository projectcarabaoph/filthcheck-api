
import { pipeline, env } from "@huggingface/transformers";
import dotenv from 'dotenv'

dotenv.config()

const { HUGGINGFACE_MODEL, HUGGINGFACE_CACHED_DIR } = process.env


// env.localModelPath = process.cwd() + "/src/models";
// env.allowLocalModels = true;
env.allowRemoteModels = true;
env.cacheDir = HUGGINGFACE_CACHED_DIR;

const nsfwDetector = async (image) => {

    try {


        const classifier = await pipeline('image-classification', HUGGINGFACE_MODEL, {
            dtype: 'q4'
        });

        const response = await classifier(image);

        return response
    } catch (error) {
        if (error instanceof Error) throw new Error(`Failed to process image: ${error?.message}`);
    }

}

export default nsfwDetector



