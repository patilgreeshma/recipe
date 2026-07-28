import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;
let model = null;

/**
 * Initialize the Gemini client.
 * Lazy initialization — only creates the client when first called.
 */
function getModel() {
  if (!model) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_google_ai_studio_api_key_here') {
      throw new Error('GEMINI_API_KEY is not configured. Please set it in the .env file.');
    }
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    });
  }
  return model;
}

/**
 * Generate content from Gemini with timeout handling.
 * @param {string} prompt - The full prompt to send
 * @param {number} timeoutMs - Timeout in milliseconds (default 30s)
 * @returns {string} Raw text response from Gemini
 */
export async function generateRecipe(prompt, timeoutMs = 30000) {
  const geminiModel = getModel();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const result = await geminiModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    clearTimeout(timeout);

    const response = result.response;
    const text = response.text();

    if (!text || text.trim().length === 0) {
      throw new Error('Gemini returned an empty response.');
    }

    return text;
  } catch (error) {
    clearTimeout(timeout);

    if (error.name === 'AbortError') {
      throw new Error('Request to Gemini timed out. Please try again.');
    }

    // Handle specific Gemini API errors
    if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    }

    if (error.status === 500 || error.status === 503) {
      throw new Error('Gemini service is temporarily unavailable. Please try again.');
    }

    throw error;
  }
}
