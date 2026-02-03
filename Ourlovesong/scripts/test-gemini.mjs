import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local manually
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '../.env.local');

let apiKey = process.env.GOOGLE_API_KEY;

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    for (const line of lines) {
        if (line.startsWith('GOOGLE_API_KEY=')) {
            apiKey = line.split('=')[1].trim();
            break;
        }
    }
}

if (!apiKey) {
    console.error('Error: GOOGLE_API_KEY is missing');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const models = [
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-2.5-pro-experimental',
    'gemini-3.0-flash',
    'gemini-3.0-pro',
    'gemini-2.0-flash' // Keep as fallback
];

async function testModels() {
    for (const modelName of models) {
        console.log(`\nTesting model: ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const prompt = "Hi";
            const result = await model.generateContent(prompt);
            const response = await result.response;
            console.log(`SUCCESS with ${modelName}:`, response.text());
            return; // Exit on first success
        } catch (error) {
            console.error(`Failed with ${modelName}: ${error.status} ${error.statusText}`);
            if (error.status !== 404) {
                console.error('Full error:', error);
            }
        }
    }
    console.error('\nAll models failed.');
}

testModels();
