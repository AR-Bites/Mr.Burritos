import { useEffect, useRef, useState } from "react";
import { X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelSrc: string;
  dishName: string;
}

export default function SimpleModal({ isOpen, onClose, modelSrc, dishName }: SimpleModalProps) {
  const modelViewerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load model-viewer script if not already loaded
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      script.onload = () => console.log('model-viewer loaded');
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    // Reset loading state when modal opens
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  const handleViewInSpace = () => {
    if (modelViewerRef.current && modelViewerRef.current.canActivateAR) {
      modelViewerRef.current.activateAR();
    }
  };

  if (!isOpen) return null;

  console.log('SimpleModal rendering with:', { isOpen, modelSrc, dishName });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          width: '90%',
          maxWidth: '1000px',
          height: '80vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
            {dishName} - 3D View
          </h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Model Viewer Container */}
        <div style={{
          flex: 1,
          padding: '20px',
          position: 'relative'
        }}>
          <model-viewer
            ref={modelViewerRef}
            src={modelSrc}
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
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              display: 'block'
            }}
            onLoad={() => {
              console.log('Model loaded in simple modal:', modelSrc);
              setIsLoading(false);
            }}
            onError={(e: any) => {
              console.error('Model error in simple modal:', e);
              setIsLoading(false);
            }}
          >
            {isLoading && (
              <div slot="progress-bar" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                backgroundColor: '#f3f4f6',
                borderRadius: '12px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', marginBottom: '10px' }}>🍽️</div>
                  <div>Loading 3D Model...</div>
                </div>
              </div>
            )}
          </model-viewer>

          {/* AR Button */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <Button 
              onClick={handleViewInSpace}
              className="bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg"
            >
              <Maximize2 className="w-4 h-4 mr-2" />
              View in Your Space
            </Button>
          </div>

          {/* Instructions */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            maxWidth: '300px'
          }}>
            Drag to rotate • Pinch to zoom • Tap "View in Your Space" for AR
          </div>
        </div>
      </div>
    </div>
  );
}