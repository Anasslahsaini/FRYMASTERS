import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import RecipeGenerator from './components/RecipeGenerator';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Footer from './components/Footer';
import { ShopifyProvider, useShopify } from './components/ShopifyProvider';
import { Download, CheckCircle, ShieldCheck, Heart } from 'lucide-react';

// Wrapper component to access context
const MainContent = () => {
  const { openCheckout } = useShopify();

  return (
    <main className="flex-grow">
      <Hero />
      <Features />
      
      {/* Value Prop Banner */}
      <section className="py-20 bg-brand-orange text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              REIGNITE YOUR PASSION FOR COOKING
            </h2>
            <p className="text-orange-100 text-xl mb-10 max-w-2xl mx-auto">
              You don't need to be a professional chef. You just need the right guide to unlock the value hidden in your kitchen.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
              <div className="flex items-center gap-3 text-lg font-bold bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
                <CheckCircle size={20} className="text-white" />
                Solve Dinner Stress
              </div>
              <div className="flex items-center gap-3 text-lg font-bold bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
                <CheckCircle size={20} className="text-white" />
                Find Your Passion
              </div>
              <div className="flex items-center gap-3 text-lg font-bold bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
                <CheckCircle size={20} className="text-white" />
                Instant Value
              </div>
            </div>
        </div>
      </section>

      <RecipeGenerator />
      <Testimonials />
      <Faq />
      
      {/* Final CTA */}
      <section className="py-24 bg-gray-50 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent"></div>
        
        <div className="max-w-3xl mx-auto px-4 relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-sm border border-green-200">
              <ShieldCheck size={18} />
              100% Satisfaction Guarantee
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-dark mb-6">
              JOIN 12,000+ HOME COOKS
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Stop treating dinner like a chore. Solve the problem of boring meals and invest in a cookbook that pays you back in flavor and time.
            </p>
            
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-md mx-auto transform transition-transform hover:scale-105">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                <span className="text-gray-500 font-medium">Regular Price</span>
                <span className="text-gray-400 line-through font-bold text-xl">$45</span>
              </div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-brand-dark font-bold text-lg">Launch Offer</span>
                <span className="text-brand-orange font-bold text-5xl">$27</span>
              </div>

              <button 
                onClick={openCheckout}
                className="w-full bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg transition-all flex items-center justify-center gap-3 mb-4 group"
              >
                <span>GET THE BOOK</span>
                <Download size={24} className="group-hover:translate-y-1 transition-transform" />
              </button>
              
              <div className="flex justify-center items-center gap-2 text-xs text-gray-400 mt-4">
                <Heart size={12} className="text-red-500 fill-red-500" />
                <span>Made with passion for your kitchen</span>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p>Try it risk-free. Love it or we'll refund you. No questions asked.</p>
            </div>
        </div>
      </section>
    </main>
  );
};

function App() {
  return (
    <ShopifyProvider>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </ShopifyProvider>
  );
}

export default App;