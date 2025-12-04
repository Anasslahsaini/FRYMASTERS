import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

const apiKey = process.env.API_KEY || '';
// Initialize conditionally to prevent immediate crash if key is missing in some envs
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateRecipe = async (ingredients: string): Promise<Recipe | null> => {
  if (!ai) {
    console.warn("Gemini AI not initialized: No API Key found.");
    return null;
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `Create a delicious, healthy air fryer recipe using the following ingredients: ${ingredients}. 
    Focus on simple preparation and crisp texture, similar to the style of 'Air Fryer Magic' cookbook (Quick & Crispy).
    If the ingredients are nonsense, provide a classic air fryer vegetable or chicken recipe.
    Ensure the recipe is optimized for a standard basket-style air fryer.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Creative name of the dish" },
            ingredients: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of ingredients including quantities"
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Step by step cooking instructions"
            },
            cookingTime: { type: Type.STRING, description: "Total time e.g., '25 mins'" },
            difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" }
          },
          required: ["title", "ingredients", "instructions", "cookingTime", "difficulty"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Recipe;
    }
    return null;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error; // Re-throw to be caught by component
  }
};