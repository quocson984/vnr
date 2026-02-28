const { GoogleGenAI } = require("@google/genai");

module.exports = async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { payload } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: "Thiếu GEMINI_API_KEY trên Vercel" });
        }

        const ai = new GoogleGenAI({ apiKey });

        const prompt = payload.contents[0].parts[0].text;
        const systemInstruction = payload.systemInstruction?.parts?.[0]?.text || '';
        const generationConfig = payload.generationConfig || {};

        const config = {
            ...generationConfig,
            ...(systemInstruction ? { systemInstruction } : {}),
        };

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config,
        });

        const text = response.text;

        return res.status(200).json({
            candidates: [
                {
                    content: {
                        parts: [{ text: text }]
                    }
                }
            ]
        });

    } catch (error) {
        console.error("Lỗi Serverless Function:", error);
        return res.status(500).json({
            error: error.message,
            detail: "Kiểm tra lại định dạng payload hoặc model name"
        });
    }
}