
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
// Note: GOOGLE_API_KEY must be set in .env.local
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json(
                { error: 'API key not configured' },
                { status: 500 }
            );
        }

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        // Get the model - using the latest Gemini 3 Flash Preview
        const model = genAI.getGenerativeModel({
            model: 'gemini-3-flash-preview',
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            }
        });

        const promptText = `Write a heartfelt Valentine's Day card message based on this input: "${prompt}".
        Requirements:
        1. Write 2-3 sentences to make it feel like a real letter.
        2. Make it express deep feelings but keep it cute.
        3. Must include a closing phrase at the end like "Happy Valentine's Day" or similar.
        4. No quotes around the output.`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: promptText }] }],
        });
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ message: text });
    } catch (error) {
        console.error('Error generating message:', error);
        // Log environment variable status (don't log the full key for security)
        console.log('API Key configured:', !!process.env.GOOGLE_API_KEY);

        return NextResponse.json(
            {
                error: 'Failed to generate message',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
