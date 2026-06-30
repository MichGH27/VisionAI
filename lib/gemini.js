const API_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;

if (!API_KEY) {
  throw new Error("Missing EXPO_PUBLIC_GEMINI_KEY in .env");
}

export async function analyzeImage(base64Image: string) {
  // Call Gemini API here using API_KEY
}