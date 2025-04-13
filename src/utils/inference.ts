import path from "path";
import * as ort from 'onnxruntime-node';

const inference = async (inputTensor: ort.Tensor) => {

    const modelPath = path.join(process.cwd(), "src", "models", "model_q4.onnx");

    const session = await ort.InferenceSession.create(modelPath, {
        executionProviders: ['CPUExecutionProvider'],
        enableCpuMemArena: true,
    });

    // Run inference
    const results = await session.run({ [session.inputNames[0]]: inputTensor });

    // Extract logits
    const logits = results.logits.data as Float32Array;

    return logits

}

export default inference