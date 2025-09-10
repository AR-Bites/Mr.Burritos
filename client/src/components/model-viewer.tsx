import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import model-viewer types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

interface ModelViewerProps {
  isOpen: boolean;
  onClose: () => void;
  modelSrc: string;
  dishName: string;
  poster?: string;
}

export default function ModelViewer({ isOpen, onClose, modelSrc, dishName, poster }: ModelViewerProps) {
  const modelViewerRef = useRef<any>(null);
  
  // Debug logging
  useEffect(() => {
    console.log('ModelViewer render - isOpen:', isOpen, 'dishName:', dishName);
  }, [isOpen, dishName]);

  useEffect(() => {
    // Check if model-viewer is already loaded
    if (customElements.get('model-viewer')) {
      console.log('model-viewer already loaded');
      return;
    }

    // Import model-viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.onload = () => {
      console.log('model-viewer script loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load model-viewer script');
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    // Add error handling for model loading
    const handleModelError = (event: any) => {
      console.error('Model loading error:', event);
    };

    const handleModelLoad = (event: any) => {
      console.log('Model loaded successfully:', event);
    };

    if (modelViewerRef.current) {
      modelViewerRef.current.addEventListener('error', handleModelError);
      modelViewerRef.current.addEventListener('load', handleModelLoad);
    }

    return () => {
      if (modelViewerRef.current) {
        modelViewerRef.current.removeEventListener('error', handleModelError);
        modelViewerRef.current.removeEventListener('load', handleModelLoad);
      }
    };
  }, [isOpen]);

  const handleViewInSpace = () => {
    if (modelViewerRef.current && modelViewerRef.current.canActivateAR) {
      modelViewerRef.current.activateAR();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{zIndex: 9999}}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        style={{zIndex: 9998}}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl h-[80vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{zIndex: 9999}}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="font-display text-2xl font-semibold text-gray-900">
              {dishName} - 3D View
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6">
            <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
              <model-viewer
                ref={modelViewerRef}
                src={modelSrc}
                poster={poster}
                alt={`3D model of ${dishName}`}
                camera-controls
                auto-rotate
                auto-rotate-delay="3000"
                rotation-per-second="0.1rad"
                ar
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="auto"
                camera-orbit="0deg 75deg 1.5m"
                min-camera-orbit="auto auto 0.5m"
                max-camera-orbit="auto auto 3m"
                interaction-prompt="auto"
                loading="eager"
                reveal="auto"
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                  display: 'block'
                }}
                data-testid="model-viewer-3d"
                onLoad={() => console.log('Model loaded:', modelSrc)}
                onError={(e: any) => console.error('Model error:', e, 'URL:', modelSrc)}
              >
              <div slot="progress-bar" className="flex items-center justify-center h-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                />
              </div>
              
              <div slot="poster" className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="text-center">
                  <div className="text-6xl mb-4">🍽️</div>
                  <p className="text-lg font-medium text-muted-foreground">Loading 3D Model...</p>
                </div>
              </div>
            </model-viewer>
            
            {/* AR Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleViewInSpace}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-accent transition-colors"
                  data-testid="button-view-ar"
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  View in Your Space
                </Button>
              </motion.div>
            </div>
            
            {/* Instructions */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-xs">
              <p className="text-sm text-muted-foreground">
                Drag to rotate • Pinch to zoom • Tap "View in Your Space" for AR
              </p>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    );

  return createPortal(modalContent, document.body);
}