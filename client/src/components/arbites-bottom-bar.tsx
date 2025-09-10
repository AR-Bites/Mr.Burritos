import { Instagram, Phone } from "lucide-react";
import arbitesLogo from "@assets/ARbitesLogoBGremoved_1757368198123.png";

export default function ArbitesBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2 ml-16">
          <span className="text-gray-600 text-sm font-medium">Powered By</span>
          <img 
            src={arbitesLogo} 
            alt="ARbites Logo" 
            className="h-8 w-auto"
          />
        </div>
        
        <span className="text-gray-400 text-lg">|</span>
        
        <div className="flex items-center space-x-3 mr-16">
          <a 
            href="tel:0790753376"
            className="hover:scale-110 transition-transform"
            data-testid="link-phone"
          >
            <Phone className="h-5 w-5 text-green-600" />
          </a>
          <a 
            href="https://instagram.com/ar.bitesjo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
            data-testid="link-arbites-instagram"
          >
            <Instagram className="h-5 w-5 text-purple-600" />
          </a>
        </div>
      </div>
    </div>
  );
}
