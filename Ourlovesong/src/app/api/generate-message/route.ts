
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

        // Get the model

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            generationConfig: {
                maxOutputTokens: 50, // Force brevity to speed up generation
                temperature: 0.7,
            }
        });

        // Construct a very simple system prompt for speed and genericness
        const systemPrompt = `Write a short, generic, and sweet Valentine's Day card message based on this theme: "${prompt}".
        Keep it under 30 words. One sentence is best. No formatting.`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ message: text });
    } catch (error) {
        console.error('Error generating message:', error);
        // Log environment variable status (don't log the full key for security)
        console.log('API Key configured:', !!process.env.GOOGLE_API_KEY);
        if (process.env.GOOGLE_API_KEY) {
            console.log('API Key length:', process.env.GOOGLE_API_KEY.length);
        }

        return NextResponse.json(
            {
                error: 'Failed to generate message',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
