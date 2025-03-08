import preprocessImage from "./preprocess-image";

const preprocessImageUrl = async (imageUrl: string) => {
    try {

        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

        // 2️⃣ Read image as buffer
        const arrayBuffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer);

        // 3️⃣ Process it using Sharp (resize, normalize, remove alpha)
        return await preprocessImage(imageBuffer);
    } catch (error) {

        throw new Error("Failed to fetch or process the image.");
    }
}

export default preprocessImageUrl