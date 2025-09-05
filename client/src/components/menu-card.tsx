import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdvancedGLBViewer from "@/components/advanced-glb-viewer";
import { getModelPath, hasModel } from "@/data/model-mapping";
import type { MenuItem } from "@/data/menu-data";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const [show3D, setShow3D] = useState(false);
  
  const modelPath = getModelPath(item.id);
  const has3DModel = hasModel(item.id);

  const renderSpiceLevel = () => {
    return (
      <div className="flex items-center space-x-1">
        <span className="text-sm text-muted-foreground mr-2">Spice Level:</span>
        {[1, 2, 3].map((level) => (
          <Flame
            key={level}
            className={`w-4 h-4 ${
              level <= item.spiceLevel
                ? "text-accent spice-indicator active"
                : "text-gray-300 spice-indicator"
            }`}
          />
        ))}
      </div>
    );
  };


  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100"
      >
        
        {/* Content Section */}
        <div className="p-4">
          {/* Title, Price and 3D Button */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 leading-tight" data-testid={`text-item-name-${item.id}`}>
                {item.name}
              </h3>
              {!item.isAvailable && (
                <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium mt-1">
                  Unavailable
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 ml-2">
              <span className="text-red-600 font-bold text-lg" data-testid={`text-item-price-${item.id}`}>
                {item.price}
              </span>
              {has3DModel && (
                <Button
                  onClick={() => {
                    console.log('Opening 3D view for:', item.name, 'Model path:', modelPath);
                    setShow3D(true);
                  }}
                  size="sm"
                  className="bg-black/80 text-white hover:bg-black border-0 rounded-md px-3 py-1 text-xs font-medium"
                  data-testid={`button-view-3d-${item.id}`}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  3D
                </Button>
              )}
            </div>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2" data-testid={`text-item-description-${item.id}`}>
            {item.description}
          </p>
          
          {/* Bottom Section */}
          <div className="flex items-center justify-between">
            {/* Spice Level */}
            <div className="flex items-center">
              {[1, 2, 3].map((level) => (
                <Flame
                  key={level}
                  className={`w-4 h-4 ${
                    level <= item.spiceLevel
                      ? "text-red-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            
            {/* Dietary Badges */}
            <div className="flex gap-1">
              {item.isVegetarian && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">🌱</span>
              )}
              {item.isVegan && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">🌿</span>
              )}
              {item.isGlutenFree && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">GF</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* 3D Model Viewer */}
      {has3DModel && modelPath && (
        <AdvancedGLBViewer
          isOpen={show3D}
          onClose={() => setShow3D(false)}
          dishName={item.name}
          modelPath={modelPath}
        />
      )}
    </>
  );
}
