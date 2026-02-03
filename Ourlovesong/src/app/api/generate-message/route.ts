
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
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        // Construct the system prompt
        // We want the output to be a Valentine's card message.
        const systemPrompt = `You are a romantic poet and expert at writing Valentine's Day cards. 
    Write a SHORT, heartfelt, and personal message for a Valentine's Day card based on the user's request.
    Keep it under 50 words. Do not include quotes around the message. 
    User request: "${prompt}"`;

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
