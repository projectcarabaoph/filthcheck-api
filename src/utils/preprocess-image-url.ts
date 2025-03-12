import preprocessImage from "./preprocess-image";

const preprocessImageUrl = async (imageURL: string) => {
    try {

        const response = await fetch(imageURL);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

        //  Read image as buffer
        const arrayBuffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer);

        //  Process it using Sharp (resize, normalize, remove alpha)
        return await preprocessImage(imageBuffer);
    } catch (error) {

        throw new Error("Failed to fetch or process the image.");
    }
}

export default preprocessImageUrl