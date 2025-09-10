import { motion } from "framer-motion";
import { MapPin, Phone, Globe, Instagram } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-red-600 text-white py-12" id="contact">
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
              <img src="/attached_assets/Untitled design (1) (1)_1756929348174.png" alt="Mr. Burritos Logo" className="h-16 w-16" loading="lazy" />
              <div className="flex flex-col">
                <span className="mr-burritos-logo font-bold text-2xl">MR.BURRITOS</span>
                <span className="mr-burritos-tagline text-lg">MEXICAN GRILL & BURGERS</span>
              </div>
            </div>
            <p className="text-white mb-6 max-w-md">
              Experience the bold flavors of Mexican-inspired cuisine with our signature burritos, tacos, and more. Every dish is made with love and the freshest ingredients.
            </p>
            
          </motion.div>


          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-white" data-testid="text-address">Abdoun | Mecca st.dawood complex | Behind JU</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-white" data-testid="text-phone">06 222 4333</span>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="h-5 w-5 text-primary mt-0.5" />
                <a 
                  href="https://mrburritos.eshopshub.com/mrburritos_en/mrburritos-offers.html?fbclid=PAVERFWAMqizRleHRuA2FlbQIxMQABp2YGPrmJ77WtICZyczegZQOZBgQCytRSRE9i204meostTiActUVpSpOILbp8_aem_ddG8elXqBVD5bliUx1XpmA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-200 transition-colors break-all"
                  data-testid="link-website"
                >
                  Visit Our Website
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="h-5 w-5 text-primary" />
                <a 
                  href="https://instagram.com/mr.burritos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-200 transition-colors"
                  data-testid="link-instagram"
                >
                  @mr.burritos
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-red-800 mt-8 pt-8 text-center"
        >
          <p className="text-white">
            © 2025 Mr. Burritos. All Rights Reserved.
          </p>
        </motion.div>
      </div>

    </footer>
  );
}
