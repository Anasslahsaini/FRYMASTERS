import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FaqItem } from '../types';

const faqData: FaqItem[] = [
  {
    question: "How do I download it?",
    answer: "Immediately after purchase, you will receive an email with a secure link to download your PDF cookbook. You can save it to your phone, tablet, or computer instantly."
  },
  {
    question: "Is this a physical book?",
    answer: "No, this is a digital e-book (PDF). No physical product will be shipped, which means you get instant access and don't have to pay for shipping!"
  },
  {
    question: "Are the recipes healthy?",
    answer: "Yes! The book focuses on 'Air Fryer Magic' – achieving crispy textures with significantly less fat and calories compared to traditional deep frying."
  },
  {
    question: "Do I need a specific air fryer model?",
    answer: "No, these recipes are designed to work with any standard basket-style or oven-style air fryer. The introduction includes tips on versatility and cooking times."
  },
  {
    question: "Do I get lifetime access?",
    answer: "Yes. Once you buy it, it's yours forever to keep on your devices."
  },
  {
    question: "Can I view this on my phone?",
    answer: "Yes, the book is formatted as a PDF which is readable on all smartphones (iPhone & Android), tablets, and computers."
  },
  {
    question: "How many recipes are included?",
    answer: "The book contains 600 quick and crispy recipes covering seafood, vegetarian, meat, poultry, and desserts."
  }
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center p-3 bg-brand-orange/10 rounded-full mb-4">
              <HelpCircle className="text-brand-orange" size={24} />
           </div>
           <h2 className="text-3xl font-display font-bold text-brand-dark">FREQUENTLY ASKED QUESTIONS</h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-brand-orange/50"
            >
              <button
                className="w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-white text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-brand-dark text-lg pr-4">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-brand-orange flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`bg-white overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 text-gray-600 border-t border-gray-100 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;