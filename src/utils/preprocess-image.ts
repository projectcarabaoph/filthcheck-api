import sharp from 'sharp';
import * as ort from 'onnxruntime-node';

const preprocessImage = async (imageBuffer: Buffer) => {

    // Image preprocessing parameters
    const dimension = 384
    const normalization = 0.5
    const imageSize = { width: dimension, height: dimension };
    const imageMean = [normalization, normalization, normalization];
    const imageStd = [normalization, normalization, normalization];

    const rawImage = await sharp(imageBuffer)
        .resize(imageSize.width, imageSize.height)
        .removeAlpha()
        .raw()
        .toBuffer();

    let float32Data = new Float32Array(rawImage.length);

    // Normalizing Pixel Values
    for (let i = 0; i < rawImage.length; i++) {
        let channel = i % 3;
        float32Data[i] = ((rawImage[i] / 255) - imageMean[channel]) / imageStd[channel];
    }

    //  Ensure correct channel ordering: [1, 3, dimension, dimension]
    const reshaped = new Float32Array(3 * dimension * dimension);
    for (let i = 0; i < dimension * dimension; i++) {
        reshaped[i] = float32Data[i * 3];       // R
        reshaped[i + dimension * dimension] = float32Data[i * 3 + 1]; // G
        reshaped[i + 2 * dimension * dimension] = float32Data[i * 3 + 2]; // B
    }

    return new ort.Tensor("float32", reshaped, [1, 3, dimension, dimension]);
}

export default preprocessImage