import { Recipe } from "../types";

// Hugging Face API Key
const HF_API_KEY = "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";
// Mistral-7B-Instruct API URL
const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

export const generateRecipe = async (ingredients: string): Promise<Recipe | null> => {
  if (!ingredients) return null;

  try {
    // 1. Construct the prompt for the model
    const prompt = `<s>[INST] You are an expert Air Fryer chef. 
Create a detailed recipe using these ingredients: ${ingredients}.

You must output ONLY a valid JSON object. Do not add intro text, markdown formatting, or backticks.

The JSON structure must be exactly this:
{
  "title": "Name of the dish",
  "ingredients": ["qty item", "qty item"],
  "instructions": ["Step 1", "Step 2", "Step 3"],
  "cookingTime": "e.g. 15 mins",
  "difficulty": "Easy" or "Medium"
}
[/INST]`;

    // 2. Call Hugging Face API
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
          do_sample: true,
          return_full_text: false
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // 3. Extract the generated text
    let text = "";
    if (Array.isArray(result) && result[0]?.generated_text) {
      text = result[0].generated_text;
    } else if (result?.generated_text) {
      text = result.generated_text;
    } else {
      throw new Error("No generated text from Hugging Face API");
    }

    // 4. Clean the output to ensure valid JSON
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) {
      throw new Error("Model did not return a valid JSON object");
    }
    text = text.substring(start, end + 1);

    // 5. Parse JSON and return
    return JSON.parse(text) as Recipe;

  } catch (error) {
    console.error("Recipe generation error:", error);
    return null;
  }
};
