import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import CategoryMenu from "./category-menu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm ${isOpen ? 'z-[100000]' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src="/attached_assets/Untitled design (1) (1)_1756929348174.png" alt="Mr. Burritos Logo" className="h-12 w-12" />
            <span className="font-display font-bold text-xl text-foreground">Mr. Burritos</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('menu')}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="link-menu"
            >
              Menu
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="link-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="link-contact"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden p-2 text-foreground hover:text-primary"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Category Menu */}
      <AnimatePresence>
        {isOpen && (
          <CategoryMenu 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
            onCategorySelect={() => setIsOpen(false)} 
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
