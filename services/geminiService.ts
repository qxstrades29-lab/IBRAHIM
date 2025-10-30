
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeChartImage = async (imageFile: File): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imagePart = await fileToGenerativePart(imageFile);

  const prompt = `You are 'QuantumEdge Signal AI', a world-leading AI analyst specializing in 1-minute timeframe binary options trading on OTC markets. Your analysis is based on advanced pattern recognition and predictive modeling.

Analyze the user-provided chart image. The chart represents a 1-minute timeframe. Your goal is to predict the price movement for a 1-minute expiry.

Your response MUST be a JSON object following this exact schema. Do not add any extra text or explanations outside of the JSON structure.

Based on the provided chart, generate your analysis.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [
        imagePart, 
        { text: prompt }
    ]},
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
            signal: {
                type: Type.STRING,
                description: "The trading signal, either 'CALL' or 'PUT'.",
            },
            confidence: {
                type: Type.NUMBER,
                description: "A number between 85 and 98 representing your confidence percentage.",
            },
            reasoning: {
                type: Type.STRING,
                description: "A concise, professional analysis explaining your decision. Mention specific candlestick patterns, support/resistance levels, or momentum indicators you observe in the image that justify the signal. Start with a strong opening statement.",
            },
        },
        required: ["signal", "confidence", "reasoning"],
      }
    }
  });
  
  try {
    const resultJson = JSON.parse(response.text.trim());
    if (resultJson.signal && (resultJson.signal === 'CALL' || resultJson.signal === 'PUT') && resultJson.confidence && resultJson.reasoning) {
        return resultJson as AnalysisResult;
    } else {
        throw new Error("Invalid response structure from AI.");
    }
  } catch(e) {
    console.error("Failed to parse AI response:", response.text);
    throw new Error("Could not understand the AI's response. The chart might be unclear or an API error occurred.");
  }
};
