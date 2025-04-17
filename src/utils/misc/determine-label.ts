
const determineLabel = (probabilities: Float32Array) => {
    const labels = ["sfw", "nsfw"] as const;

    // Format output with both labels and their probabilities
    const data = labels.map((label, index) => ({
        label,
        score: probabilities[index]
    }))  // Sort to get highest probability
        .sort((a, b) => b.score - a.score);

    return data
}

export default determineLabel