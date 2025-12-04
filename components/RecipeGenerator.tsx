import React, { useState } from 'react';
import { Sparkles, ChefHat, Timer, Gauge, Loader2, WifiOff } from 'lucide-react';
import { generateRecipe } from '../services/geminiService';
import { Recipe } from '../types';
import { useShopify } from './ShopifyProvider';

const RecipeGenerator: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { openCheckout } = useShopify();

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      setError("Please enter some ingredients first.");
      return;
    }
    setError('');
    setLoading(true);
    setRecipe(null);
    
    try {
      const result = await generateRecipe(ingredients);
      if (result) {
        setRecipe(result);
      } else {
        setError("Could not generate a recipe. Please check your internet connection or try again.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Failed to fetch")) {
         setError("Network error: Unable to reach the chef. Please check your connection.");
      } else {
         setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-chef" className="py-24 bg-brand-dark relative overflow-hidden scroll-mt-24">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange to-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4 shadow-lg">
            <Sparkles size={16} />
            <span>INCLUDED FREE BONUS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            YOUR PERSONAL KITCHEN ASSISTANT
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Not sure what to cook? Enter 3 ingredients you have in your fridge, and our 
            <span className="text-brand-orange font-bold"> Smart Assistant</span> will instantly create a custom Air Fryer recipe for you.
          </p>
        </div>

        {/* Input Area */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl mb-12">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., Chicken wings, potatoes, broccoli..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 px-4 py-3 md:px-6 md:py-4 outline-none text-base md:text-lg rounded-xl focus:bg-white/5 transition-colors"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-brand-orange hover:bg-orange-600 disabled:bg-gray-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 min-w-[200px]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {loading ? 'THINKING...' : 'GET RECIPE'}
          </button>
        </div>

        {error && (
          <div className="text-red-300 text-center mb-8 bg-red-900/30 p-4 rounded-xl border border-red-500/30 flex items-center justify-center gap-2 animate-pulse">
            <WifiOff size={20} />
            {error}
          </div>
        )}

        {/* Recipe Display */}
        {recipe && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="bg-brand-orange p-6 md:p-8 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">{recipe.title}</h3>
                <div className="flex gap-4 mt-2 text-orange-100 text-sm font-medium">
                  <div className="flex items-center gap-1"><Timer size={16} /> {recipe.cookingTime}</div>
                  <div className="flex items-center gap-1"><Gauge size={16} /> {recipe.difficulty}</div>
                </div>
              </div>
              <ChefHat size={48} className="text-white/80 hidden md:block" />
            </div>
            
            <div className="p-6 md:p-10 grid md:grid-cols-2 gap-10 text-brand-dark">
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center text-white text-xs">1</span>
                  Ingredients
                </h4>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="w-6 h-6 bg-brand-dark rounded-full flex items-center justify-center text-white text-xs">2</span>
                  Instructions
                </h4>
                <ol className="space-y-4">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="flex gap-4 text-gray-700 text-sm md:text-base">
                      <span className="font-bold text-gray-400 font-display text-xl">{i + 1}.</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Want 75+ more recipes like this? 
                <button 
                  onClick={openCheckout}
                  className="text-brand-orange font-bold hover:underline ml-1"
                >
                  Get the Complete Cookbook
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipeGenerator;