import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { useShopify } from './ShopifyProvider';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCheckout } = useShopify();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "What's Inside", href: '#whats-inside' },
    { name: 'Bonuses', href: '#bonuses' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className={`font-display font-bold text-2xl tracking-tighter ${isScrolled ? 'text-brand-dark' : 'text-white'}`}>
              FRY <span className="text-brand-orange">MASTERS</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`text-sm font-semibold uppercase tracking-wide hover:text-brand-orange transition-colors cursor-pointer ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={openCheckout}
              className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <Download size={18} />
              GET ACCESS
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={24} color={isScrolled ? '#000' : '#fff'} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col items-center space-y-4 animate-fade-in-down border-t border-gray-100 h-screen">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-gray-800 font-medium text-lg hover:text-brand-orange py-2"
              onClick={(e) => handleScrollTo(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => { openCheckout(); setIsMobileMenuOpen(false); }}
            className="bg-brand-orange text-white px-8 py-3 rounded-full font-bold w-3/4 mx-auto flex justify-center items-center gap-2 mt-4"
          >
            <Download size={20} />
            GET INSTANT ACCESS
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;