import { Recipe } from "../types";

// User provided Hugging Face API Key
// Note: In a production environment, this should be in process.env
const HF_API_KEY = "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";
// Using Mistral-7B-Instruct-v0.2 as it follows formatting instructions very well
const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

export const generateRecipe = async (ingredients: string): Promise<Recipe | null> => {
  if (!ingredients) return null;

  try {
    // Constructing a prompt specifically for Mistral Instruct
    const prompt = `<s>[INST] You are an expert chef specializing in Air Fryer recipes.
    Create a delicious, healthy air fryer recipe using these ingredients: ${ingredients}.
    Focus on simple preparation and crisp texture.

    You must output ONLY a valid JSON object. 
    Do not include markdown formatting (like \`\`\`json), backticks, or introductory text.
    
    The JSON schema must be exactly:
    {
      "title": "Creative Dish Name",
      "ingredients": ["quantity item", "quantity item"],
      "instructions": ["Step 1...", "Step 2..."],
      "cookingTime": "e.g. 15 mins",
      "difficulty": "Easy" or "Medium"
    }
    [/INST]`;

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1000, // Ensure enough tokens for the full recipe
          return_full_text: false, // We only want the generated part
          temperature: 0.7, // Creativity balance
          do_sample: true,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("HF API Error:", errText);
      throw new Error(`Hugging Face API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    // HF Inference API returns an array: [{ generated_text: "..." }]
    let text = "";
    if (Array.isArray(result) && result.length > 0) {
        text = result[0]?.generated_text || "";
    } else if (typeof result === 'object' && result.generated_text) {
        text = result.generated_text;
    }

    // cleaning logic to extract JSON if the model chats
    const jsonStartIndex = text.indexOf('{');
    const jsonEndIndex = text.lastIndexOf('}');

    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
      text = text.substring(jsonStartIndex, jsonEndIndex + 1);
    } else {
        console.warn("Could not find JSON brackets in response, attempting cleanup");
        // Fallback cleanup
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    }

    return JSON.parse(text) as Recipe;

  } catch (error) {
    console.error("Error generating recipe with Hugging Face:", error);
    throw error;
  }
};
