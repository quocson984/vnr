const { GoogleGenerativeAI } = require("@google/generative-ai");

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

        const genAI = new GoogleGenerativeAI(apiKey);

        // 1. Khởi tạo model với cấu hình hệ thống (nếu có)
        const modelConfig = {
            model: "gemini-1.5-flash",
        };

        // Nếu App.js gửi systemInstruction, ta đưa vào cấu hình model
        if (payload.systemInstruction) {
            modelConfig.systemInstruction = payload.systemInstruction.parts[0].text;
        }

        const model = genAI.getGenerativeModel(modelConfig);

        // 2. Thiết lập tham số tạo nội dung (ví dụ: JSON mode cho Quiz)
        const generationConfig = payload.generationConfig || {};

        // 3. Gọi API
        // Lấy nội dung tin nhắn cuối cùng từ mảng contents
        const prompt = payload.contents[0].parts[0].text;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: generationConfig,
        });

        const response = await result.response;
        const text = response.text();

        // 4. Trả về đúng định dạng mà App.js đang chờ (result.candidates[0]...)
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