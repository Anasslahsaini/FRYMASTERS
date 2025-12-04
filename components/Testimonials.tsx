import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const reviews: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Busy Mom & New Chef",
    content: "I finally have self-trust in the kitchen! The 'Fat Burger Bombs' and 'Crispy Coconut Shrimp' are staples in our house now. 600 recipes means I never run out of ideas.",
    rating: 5
  },
  {
    id: 2,
    name: "James T.",
    role: "Verified Buyer",
    content: "The value is incredible. 600 recipes for this price is a steal. I stopped ordering takeout because the 'Thai Beef Stir-Fry' tastes better than my local restaurant.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily R.",
    role: "Passionate Home Cook",
    content: "This book solved my biggest problem: boring healthy food. The 'Air Fried Cod with Basil Vinaigrette' and 'Blueberry Overload French Toast' reignited my passion for cooking.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-orange-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">STORIES OF KITCHEN SUCCESS</h2>
          <p className="text-gray-600 text-lg">Real people solving real problems and finding joy in food again.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-lg relative border border-orange-100 flex flex-col h-full transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <Quote size={40} className="text-brand-orange/20 absolute top-6 right-6" />
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-brand-accent fill-brand-accent" />
                ))}
              </div>
              <h4 className="font-bold text-lg mb-2 text-brand-dark">
                 {review.id === 1 ? "Confidence Restored" : review.id === 2 ? "Incredible Value" : "Passion Reignited"}
              </h4>
              <p className="text-gray-700 italic mb-6 flex-grow leading-relaxed">"{review.content}"</p>
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange font-bold text-sm">
                    {review.name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 text-sm">{review.name}</h4>
                    <p className="text-xs text-brand-orange font-medium uppercase tracking-wide">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;