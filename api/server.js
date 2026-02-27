const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
    try {
        const { payload } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'Thiếu GEMINI_API_KEY trong file .env' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const modelConfig = { model: 'gemini-1.5-flash' };
        if (payload.systemInstruction) {
            modelConfig.systemInstruction = payload.systemInstruction.parts[0].text;
        }

        const model = genAI.getGenerativeModel(modelConfig);
        const generationConfig = payload.generationConfig || {};
        const prompt = payload.contents[0].parts[0].text;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: generationConfig,
        });

        const response = await result.response;
        const text = response.text();

        return res.status(200).json({
            candidates: [{ content: { parts: [{ text: text }] } }]
        });
    } catch (error) {
        console.error('API Error:', error.message);
        return res.status(500).json({ error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API proxy running on http://localhost:${PORT}`));
