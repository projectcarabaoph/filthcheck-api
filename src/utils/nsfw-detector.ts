import preprocessImageUrl from './preprocess-image-url';
import inference from './inference';
import softMax from './soft-max';
import determineLabel from './determine-label';

const nsfwDetector = async (imageURL: string) => {

    try {
        const inputTensor = await preprocessImageUrl(imageURL);

        const logits = await inference(inputTensor);

        const probabilities = softMax(logits);

        const response = determineLabel(probabilities);

        return response

    } catch (error) {
        if (error instanceof Error) throw new Error(`Failed to process image: ${error.message}`);

    }

}

export default nsfwDetector



