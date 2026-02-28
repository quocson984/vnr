const express = require('express');
const { GoogleGenAI } = require('@google/genai');
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
            candidates: [{ content: { parts: [{ text: text }] } }]
        });
    } catch (error) {
        console.error('API Error:', error.message);
        return res.status(500).json({ error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API proxy running on http://localhost:${PORT}`));
