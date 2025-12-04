import React from 'react';
import { Shield, Smile, Coffee, Heart, Eye } from 'lucide-react';

const contents = [
  {
    icon: <Shield size={32} className="text-brand-orange" />,
    title: "Confidence in the Kitchen",
    description: "Every recipe includes precise times and temperatures. No more guessing, no more burning."
  },
  {
    icon: <Smile size={32} className="text-brand-orange" />,
    title: "Family-Approved Meals",
    description: "From 'Chicken Tenders' to 'Pizza', these are recipes your kids will actually ask for."
  },
  {
    icon: <Coffee size={32} className="text-brand-orange" />,
    title: "More Than Just Dinner",
    description: "Breakfast frittatas, lunch wraps, and even desserts like Molten Cupcakes. Your air fryer can do it all."
  },
  {
    icon: <Heart size={32} className="text-brand-orange" />,
    title: "Healthy Without Trying",
    description: "Get that fried texture you love with 80% less oil. Flavorful, crispy, and guilt-free."
  }
];

const Features: React.FC = () => {
  return (
    <section id="whats-inside" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Origin Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
            <div className="lg:col-span-5">
                <img 
                    src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop" 
                    alt="Cooking in kitchen" 
                    className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
                />
            </div>
            <div className="lg:col-span-7">
                <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Why this book exists</span>
                <h2 className="text-4xl font-display font-bold text-brand-dark mb-6">
                    "I Burnt My First 10 Meals..."
                </h2>
                <div className="prose text-gray-600 text-lg leading-relaxed space-y-4">
                    <p>
                        When I bought my first Air Fryer, I was excited. I thought it was a magic machine. 
                        <strong>It wasn't.</strong> My fries were soggy, my chicken was dry as a bone, and I ended up ordering pizza more often than using the machine.
                    </p>
                    <p>
                        I realized the problem wasn't the machine—it was the instructions. Most recipes online are guesses. 
                        So I spent 18 months testing. I tested temperatures, batters, and timings until I cracked the code.
                    </p>
                    <p>
                        I wrote <strong>Air Fryer Magic</strong> so you don't have to go through that trial and error. 
                        I want you to be a hero in your kitchen from Day 1.
                    </p>
                </div>
            </div>
        </div>

        {/* Sneak Peek - Visual Proof */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-16 mb-24 border border-gray-100">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-display font-bold text-brand-dark flex items-center justify-center gap-3">
                    <Eye className="text-brand-orange" />
                    See For Yourself
                </h3>
                <p className="text-gray-600">Here is exactly what a recipe page looks like inside the book.</p>
            </div>

            <div className="bg-white max-w-4xl mx-auto shadow-[0_0_40px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden border border-gray-200 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="p-8 lg:p-12">
                    <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-brand-orange/20 pb-6 mb-8">
                        <div>
                            <h4 className="font-display text-4xl font-bold text-brand-dark mb-2">Sweet & Hot Chicken Wings</h4>
                            <div className="flex gap-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                <span>Prep: 5 Mins</span>
                                <span>•</span>
                                <span>Cook: 25 Mins</span>
                                <span>•</span>
                                <span>Serves: 4</span>
                            </div>
                        </div>
                        <div className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-xs font-bold mt-4 md:mt-0">
                            FAMILY FAVORITE
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <h5 className="font-bold text-brand-orange mb-4 uppercase tracking-wider text-sm">Ingredients</h5>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gray-400 rounded-full"></span> 8 chicken wings</li>
                                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gray-400 rounded-full"></span> 1 tbsp olive oil</li>
                                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gray-400 rounded-full"></span> 1/3 cup brown sugar</li>
                                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gray-400 rounded-full"></span> 2 tbsp honey</li>
                                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gray-400 rounded-full"></span> 1/3 cup cider vinegar</li>
                                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gray-400 rounded-full"></span> Red pepper flakes</li>
                            </ul>
                        </div>
                        <div className="md:col-span-2">
                            <h5 className="font-bold text-brand-orange mb-4 uppercase tracking-wider text-sm">Instructions</h5>
                            <div className="space-y-4 text-gray-700">
                                <p><span className="font-bold text-brand-dark">1.</span> Cut each chicken wing into three pieces. Discard the small end.</p>
                                <p><span className="font-bold text-brand-dark">2.</span> In a medium bowl, toss the wings with the oil. Transfer to the air fryer basket.</p>
                                <p><span className="font-bold text-brand-dark">3.</span> Cook for 20 minutes at 390°F, shaking the basket twice.</p>
                                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-brand-orange text-sm italic text-gray-600 mt-4">
                                    "Tip: The sauce will caramelize quickly, so keep an eye on it during the last 2 minutes for that perfect sticky glaze."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contents.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="mb-6 p-4 rounded-xl bg-orange-50 w-fit group-hover:bg-brand-orange group-hover:text-white transition-colors">
                {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: "text-brand-orange group-hover:text-white transition-colors" })}
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-brand-dark">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;