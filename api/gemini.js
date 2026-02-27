// api/gemini.js - Serverless Function cho Gemini API
const MODEL_NAME = "gemini-1.5-flash";

const fetchGeminiWithBackoff = async (payload, maxRetries = 5) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("API key không được cấu hình. Vui lòng thêm REACT_APP_GEMINI_API_KEY vào .env");
    }

    const delays = [1000, 2000, 4000, 8000, 16000];
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gemini error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            attempt++;
            if (attempt >= maxRetries) {
                throw new Error("Không thể kết nối với AI sau nhiều lần thử. Vui lòng thử lại sau.");
            }
            const delayTime = delays[attempt - 1];
            await new Promise((resolve) => setTimeout(resolve, delayTime));
        }
    }
};

// Vercel Serverless Function Handler
export default async function handler(req, res) {
    // Chỉ cho phép POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { payload } = req.body;

        if (!payload) {
            return res.status(400).json({ error: "Payload is required" });
        }

        const result = await fetchGeminiWithBackoff(payload);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
