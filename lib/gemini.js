const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;

console.log("Gemini Key Loaded:", !!GEMINI_KEY);

if (!GEMINI_KEY) {
  throw new Error("Missing Gemini API Key");
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

export async function analyzeImage(base64Image) {
  try {
    console.log("Image size:", base64Image.length);

    const response = await fetch(GEMINI_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
Analyze this image.

Return ONLY JSON:

{
  "objects": [],
  "context": "",
  "activities": "",
  "recommendations": ""
}
`,
              },

              {
                inline_data: {
                  mime_type: "image/jpeg",

                  data: base64Image,
                },
              },
            ],
          },
        ],
      }),
    });

    console.log("Gemini Status:", response.status);

    const data = await response.json();

    console.log("Gemini Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.log("Gemini Error:", error);

    throw error;
  }
}
