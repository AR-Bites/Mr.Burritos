import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  onExploreMenu?: () => void;
}

export default function HeroSection({ onExploreMenu }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Aggressively preload video
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay failed, user interaction required
      });
    }
  }, []);

  const handleExploreMenu = () => {
    if (onExploreMenu) {
      onExploreMenu();
    } else {
      const element = document.getElementById('menu');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          zIndex: 1
        }}
      >
        <source src="/attached_assets/f629d15d-f04d-4d38-a0b1-464e22fbd890_1756990736092.mp4" type="video/mp4" />
      </video>
      
      <div className="relative text-center text-white px-4 max-w-4xl mx-auto" style={{ zIndex: 10 }}>
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-black text-6xl md:text-8xl mb-6 relative"
        >
          Taste <span className="text-white">Mexico</span> <br />
          <span className="text-white">in</span> <span className="text-green-700">AUGMENTED REALITY</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 font-black text-white max-w-2xl mx-auto"
        >
          Discover bold Mexican-inspired flavors with interactive 3D models of every delicious dish
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExploreMenu}
          className="bg-white text-red-600 font-black px-10 py-5 rounded-lg text-2xl hover:bg-secondary hover:text-white transition-all duration-300 animate-bounce-gentle"
          data-testid="button-explore-menu"
        >
          Explore Our Menu
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
