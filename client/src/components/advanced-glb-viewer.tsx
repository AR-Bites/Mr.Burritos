import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface AdvancedGLBViewerProps {
  modelPath: string | null;
  dishName: string;
  isOpen: boolean;
}

const AdvancedGLBViewer: React.FC<AdvancedGLBViewerProps> = ({ 
  modelPath, 
  dishName, 
  isOpen 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const animationRef = useRef<number | null>(null);
  const [modelStatus, setModelStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [loadingMessage, setLoadingMessage] = useState('Preparing your 3D experience...');
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Direct iOS AR Quick Look - Native AR Experience
  const handleViewInSpace = () => {
    if (!modelPath) {
      alert('3D model not available for AR view');
      return;
    }

    console.log('🔍 Starting native AR for:', dishName);

    // iOS AR Quick Look - Direct to native AR camera
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      console.log('📱 iOS detected - launching native AR Quick Look');
      
      const fullModelPath = window.location.origin + modelPath;
      
      // Create a direct link with rel="ar" - this tells iOS to open AR Quick Look
      const link = document.createElement('a');
      link.href = fullModelPath;
      link.rel = 'ar';
      link.download = dishName.replace(/[^a-zA-Z0-9]/g, '_') + '.usdz';
      
      // iOS requires an img element for AR Quick Look
      const img = document.createElement('img');
      img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      img.alt = dishName;
      link.appendChild(img);
      
      // Trigger the AR Quick Look directly
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('🚀 iOS AR Quick Look launched!');
      return;
    }

    // Android - Google Scene Viewer
    if (/Android/i.test(navigator.userAgent)) {
      console.log('🤖 Android detected - using Google Scene Viewer');
      
      const modelUrl = encodeURIComponent(window.location.origin + modelPath);
      const sceneViewerUrl = `https://arvr.google.com/scene-viewer/1.0?file=${modelUrl}&mode=ar_only&title=${encodeURIComponent(dishName)}`;
      
      window.open(sceneViewerUrl, '_blank');
      console.log('🚀 Google Scene Viewer launched!');
      return;
    }

    // Other devices
    alert('AR viewing requires iOS (iPhone/iPad) or Android with AR support. Please try on a mobile device with Safari or Chrome.');
  };


  useEffect(() => {
    if (!isOpen || !containerRef.current || !modelPath) return;

    console.log('🚀 Initializing 3D viewer for:', dishName);
    setModelStatus('loading');
    setLoadingMessage('Preparing your 3D experience...');

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(3, 2, 3);

    // Renderer setup - Optimized for faster rendering
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // Disable on mobile for performance
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    renderer.setClearColor(0x000000, 0);
    
    // Enable shadows only if not mobile for better performance
    if (!isMobile) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    if (!isMobile) {
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
    }
    scene.add(directionalLight);

    // Additional fill lights
    const fillLight1 = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight1.position.set(-5, 5, -5);
    scene.add(fillLight1);

    const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.2);
    fillLight2.position.set(0, -5, 5);
    scene.add(fillLight2);

    // Load GLB model with better progress tracking and error handling
    const loader = new GLTFLoader();
    console.log(`📦 Loading model: ${modelPath}`);
    
    let loadingDots = '';
    const loadingInterval = setInterval(() => {
      loadingDots = loadingDots.length >= 3 ? '' : loadingDots + '.';
      setLoadingMessage(`Loading your 3D ${dishName}${loadingDots}`);
    }, 500);

    loader.load(
      modelPath,
      (gltf) => {
        clearInterval(loadingInterval);
        console.log('✅ Model loaded successfully');
        
        const model = gltf.scene;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Scale to fit nicely in view
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        model.scale.setScalar(scale);
        
        // Center the model
        model.position.sub(center.multiplyScalar(scale));
        
        // Enable shadows on model if not mobile
        if (!isMobile) {
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
        }
        
        scene.add(model);
        setModelStatus('loaded');
        console.log('🎨 Model added to scene');
      },
      (progress) => {
        if (progress.lengthComputable) {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          if (percent < 30) {
            setLoadingMessage(`Loading ${percent}%... Getting your ${dishName} ready!`);
          } else if (percent < 70) {
            setLoadingMessage(`Loading ${percent}%... Looking good!`);
          } else {
            setLoadingMessage(`Loading ${percent}%... Almost there!`);
          }
          console.log(`📊 Loading progress: ${percent}%`);
        } else {
          setLoadingMessage('Downloading 3D model...');
        }
      },
      (error) => {
        clearInterval(loadingInterval);
        console.error('❌ Error loading GLB model:', error);
        setModelStatus('error');
      }
    );

    // Mouse/Touch controls for orbiting
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraDistance = Math.sqrt(camera.position.x ** 2 + camera.position.y ** 2 + camera.position.z ** 2);
    
    // Smooth camera interpolation
    let targetTheta = Math.atan2(camera.position.x, camera.position.z);
    let targetPhi = Math.acos(camera.position.y / cameraDistance);
    let currentTheta = targetTheta;
    let currentPhi = targetPhi;

    const updateCamera = () => {
      // Smooth interpolation
      currentTheta += (targetTheta - currentTheta) * 0.1;
      currentPhi += (targetPhi - currentPhi) * 0.1;
      
      camera.position.x = cameraDistance * Math.sin(currentPhi) * Math.sin(currentTheta);
      camera.position.y = cameraDistance * Math.cos(currentPhi);
      camera.position.z = cameraDistance * Math.sin(currentPhi) * Math.cos(currentTheta);
      camera.lookAt(0, 0, 0);
    };

    // Optimized animation loop with frame rate limiting
    let lastTime = 0;
    const frameInterval = 1000 / 30; // 30 FPS cap for better performance
    
    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);
      
      if (currentTime - lastTime >= frameInterval) {
        updateCamera();
        if (rendererRef.current && sceneRef.current) {
          rendererRef.current.render(sceneRef.current, camera);
        }
        lastTime = currentTime;
      }
    };

    // Mouse events
    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        
        targetTheta -= deltaX * 0.01;
        targetPhi = Math.max(0.1, Math.min(Math.PI - 0.1, targetPhi + deltaY * 0.01));
        
        previousMousePosition = { x: event.clientX, y: event.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      cameraDistance = Math.max(2, Math.min(10, cameraDistance + event.deltaY * 0.01));
    };

    // Touch events for mobile
    let lastTouchDistance = 0;
    
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        previousMousePosition = { x: touch.clientX, y: touch.clientY };
        isDragging = true;
      } else if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) + 
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        lastTouchDistance = distance;
        isDragging = false;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      
      if (event.touches.length === 1 && isDragging) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - previousMousePosition.x;
        const deltaY = touch.clientY - previousMousePosition.y;
        
        targetTheta -= deltaX * 0.01;
        targetPhi = Math.max(0.1, Math.min(Math.PI - 0.1, targetPhi + deltaY * 0.01));
        
        previousMousePosition = { x: touch.clientX, y: touch.clientY };
      } else if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const touchDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) + 
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        if (lastTouchDistance > 0) {
          const scaleFactor = touchDistance / lastTouchDistance;
          cameraDistance = Math.max(2, Math.min(10, cameraDistance / scaleFactor));
        }
        
        lastTouchDistance = touchDistance;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      lastTouchDistance = 0;
    };

    // Handle resize
    const handleResize = () => {
      if (containerRef.current && renderer) {
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
    };

    // Add event listeners
    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel);
    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', handleResize);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      // Cleanup
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Remove event listeners
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      
      // Cleanup Three.js
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }
    };
  }, [isOpen, modelPath, dishName, isMobile]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '15px 20px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{dishName}</h2>
        <button
          onClick={() => window.history.back()}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ✕ Close
        </button>
      </div>

      {/* Main 3D Viewer */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />

        {/* Loading State */}
        {modelStatus === 'loading' && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textAlign: 'center',
              zIndex: 10
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                borderTop: '3px solid #ff6b6b',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 15px'
              }}
            />
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{loadingMessage}</p>
            <p style={{ margin: '5px 0 0', fontSize: '14px', opacity: 0.8 }}>
              Preparing your 3D experience...
            </p>
          </div>
        )}

        {/* Error State */}
        {modelStatus === 'error' && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textAlign: 'center',
              zIndex: 10
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>😕</div>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
              Oops! Something went wrong
            </p>
            <p style={{ margin: '10px 0', fontSize: '14px', opacity: 0.8 }}>
              We couldn't load the 3D model for {dishName}.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '10px'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Controls overlay */}
        {modelStatus === 'loaded' && (
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '15px 25px',
              borderRadius: '25px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* AR Button - Only show on mobile */}
            {isMobile && (
              <button
                onClick={handleViewInSpace}
                style={{
                  background: 'linear-gradient(135deg, #000000, #1a1a1a)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: isMobile ? '12px 18px' : '14px 22px',
                  borderRadius: '20px',
                  fontSize: isMobile ? '13px' : '15px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
                  target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.background = 'linear-gradient(135deg, #000000, #1a1a1a)';
                  target.style.transform = 'translateY(0)';
                }}
              >
                View in Your Space
              </button>
            )}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AdvancedGLBViewer;
