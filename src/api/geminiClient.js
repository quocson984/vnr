// src/api/geminiClient.js - Client để gọi Serverless Function
export const callGeminiAPI = async (payload) => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gemini API Client Error:", error);
    throw error;
  }
};
