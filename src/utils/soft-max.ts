
const softMax = (logits: Float32Array) => {
    const expLogits = logits.map(Math.exp);
    const sumExp = expLogits.reduce((a, b) => a + b, 0);
    const probabilities = expLogits.map((val) => val / sumExp);
    return probabilities;
}

export default softMax