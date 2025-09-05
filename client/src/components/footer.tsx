import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Heart } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-white py-12" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <img src="/attached_assets/Untitled design (1) (1)_1756929348174.png" alt="Mr. Burritos Logo" className="h-16 w-16" />
              <span className="font-display font-bold text-2xl">Mr. Burritos</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience the bold flavors of Mexican-inspired cuisine with our signature burritos, tacos, and more. Every dish is made with love and the freshest ingredients.
            </p>
            
            <div className="flex space-x-4">
              <button 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                data-testid="button-facebook"
              >
                <span className="sr-only">Facebook</span>
                📘
              </button>
              <button 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                data-testid="button-instagram"
              >
                <span className="sr-only">Instagram</span>
                📷
              </button>
              <button 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                data-testid="button-twitter"
              >
                <span className="sr-only">Twitter</span>
                🐦
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('menu')}
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="link-footer-menu"
                >
                  Menu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="link-footer-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-primary transition-colors">
                  Reservations
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-primary transition-colors">
                  Catering
                </button>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-300" data-testid="text-address">123 Flavor Street, Taste City</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-300" data-testid="text-phone">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-300" data-testid="text-email">hello@mrburritos.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-8 pt-8 text-center"
        >
          <p className="text-gray-300 flex items-center justify-center">
            &copy; 2024 Mr. Burritos. All rights reserved. Made with{" "}
            <Heart className="h-4 w-4 text-primary mx-1" />
            for food lovers.
          </p>
        </motion.div>
      </div>

    </footer>
  );
}
