import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { getPreloadedModel, isModelPreloading, prioritizeModelLoading } from "@/hooks/use-model-preloader";

interface AdvancedGLBViewerProps {
  isOpen: boolean;
  onClose: () => void;
  dishName: string;
  modelPath?: string;
}

export default function AdvancedGLBViewer({ isOpen, onClose, dishName, modelPath }: AdvancedGLBViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const [modelStatus, setModelStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [loadingMessage, setLoadingMessage] = useState('Preparing your 3D experience...');
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Handle AR View
  const handleViewInSpace = () => {
    if (modelPath) {
      // For iOS Safari - AR Quick Look
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent)) {
        const link = document.createElement('a');
        link.href = modelPath;
        link.rel = 'ar';
        link.appendChild(document.createElement('img'));
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
      
      // For Android - WebXR or fallback
      if ('xr' in navigator) {
        // Future WebXR implementation
        alert('AR functionality coming soon for Android devices!');
      } else {
        // Fallback: Open model in new tab for AR viewers
        window.open(modelPath, '_blank');
      }
    }
  };

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    setModelStatus('loading');
    setLoadingMessage('Loading your delicious 3D model...');

    // Scene setup - Force solid background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
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
      antialias: !isMobile, // Disable anti-aliasing on mobile for performance
      alpha: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance", // Use dedicated GPU if available
      stencil: false,
      depth: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    renderer.shadowMap.enabled = false;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setClearColor(0xffffff, 1.0);
    renderer.sortObjects = false;
    
    // Performance optimizations
    renderer.info.autoReset = false;
    renderer.getContext().disable(renderer.getContext().DITHER);
    
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Optimized lighting setup - Fewer lights for better performance
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = false; // Disable shadows for performance
    scene.add(mainLight);

    // Reduced number of lights for better performance
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-3, 3, -3);
    scene.add(fillLight);

    // Load GLB model with optimizations
    const loader = new GLTFLoader();
    
    // Add DRACO compression support for faster loading (optional)
    try {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      loader.setDRACOLoader(dracoLoader);
    } catch (error) {
      // DRACO loader is optional - continue without it
      console.log('DRACO loader not available, using standard loading');
    }
    
    // Use caching manager for faster subsequent loads
    THREE.Cache.enabled = true;
    
    if (modelPath) {
      // Check if model is already preloaded
      const preloadedModel = getPreloadedModel(modelPath);
      
      if (preloadedModel) {
        // Use preloaded model instantly!
        console.log('🚀 Using preloaded model instantly!');
        usePreloadedModel(preloadedModel);
        
      } else {
        // Prioritize loading this model since user clicked on it
        setLoadingMessage('Prioritizing your 3D model...');
        console.log('⚡ Prioritizing model loading for user request');
        
        prioritizeModelLoading(modelPath)
          .then((modelGroup) => {
            console.log('🚀 Priority model loaded!');
            usePreloadedModel(modelGroup);
          })
          .catch((error) => {
            console.error('❌ Priority loading failed:', error);
            setModelStatus('error');
          });
      }
    }

    function usePreloadedModel(modelGroup: THREE.Group) {
      setModelStatus('loaded');
      
      // Clone the preloaded model to avoid modifying the cached version
      const clonedModel = modelGroup.clone();
      
      // Create a group to center the model (same as regular loading)
      const group = new THREE.Group();
      group.add(clonedModel);

      // Calculate bounding box and center the model
      const box = new THREE.Box3().setFromObject(clonedModel);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      console.log('📏 Model size:', size);
      console.log('📍 Original center:', center);

      // Center the model using subtract method (same as original)
      clonedModel.position.sub(center);

      // Scale the model to fit nicely in the scene
      const maxDimension = Math.max(size.x, size.y, size.z);
      const targetSize = 3;
      const scale = targetSize / maxDimension;
      group.scale.setScalar(scale);

      console.log('🔧 Group scale:', scale);

      scene.add(group);

      // Force solid materials - No transparency allowed! (same as original)
      clonedModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = false;
          child.receiveShadow = false;
          child.frustumCulled = false;
          
          // FORCE SOLID MATERIALS
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                mat.transparent = false;
                mat.alphaTest = 0;
                mat.opacity = 1.0;
                mat.depthWrite = true;
                mat.depthTest = true;
                mat.side = THREE.FrontSide;
                mat.blending = THREE.NormalBlending;
                if (mat.map) mat.map.flipY = false;
                mat.needsUpdate = true;
              });
            } else {
              child.material.transparent = false;
              child.material.alphaTest = 0;
              child.material.opacity = 1.0;
              child.material.depthWrite = true;
              child.material.depthTest = true;
              child.material.side = THREE.FrontSide;
              child.material.blending = THREE.NormalBlending;
              if (child.material.map) child.material.map.flipY = false;
              child.material.needsUpdate = true;
            }
          }
          
          // Force render order
          child.renderOrder = 0;
        }
      });
      
      // Force the model to be visible
      clonedModel.visible = true;
      clonedModel.matrixAutoUpdate = true;

      // Start optimized animation loop
      let lastTime = 0;
      const targetFPS = isMobile ? 30 : 60;
      const frameInterval = 1000 / targetFPS;
      
      const animate = (currentTime: number) => {
        animationRef.current = requestAnimationFrame(animate);
        
        if (currentTime - lastTime >= frameInterval) {
          renderer.render(scene, camera);
          lastTime = currentTime;
        }
      };
      animate(0);
    }

    function regularLoadModel() {
      if (!modelPath) return;
      
      loader.load(
        modelPath,
        (gltf) => {
          console.log('🎉 Model successfully loaded and rendered!');
          setModelStatus('loaded');
          
          // Optimize model materials for faster rendering
          gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              // Force opacity for transparency issues
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach(mat => {
                    mat.transparent = false;
                    mat.alphaTest = 0;
                    mat.opacity = 1.0;
                  });
                } else {
                  child.material.transparent = false;
                  child.material.alphaTest = 0;
                  child.material.opacity = 1.0;
                }
              }
            }
          });

          // Create a group to center the model
          const group = new THREE.Group();
          group.add(gltf.scene);

          // Calculate bounding box and center the model
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          console.log('📏 Model size:', size);
          console.log('📍 Original center:', center);

          // Center the model
          gltf.scene.position.sub(center);

          // Scale the model to fit nicely in the scene
          const maxDimension = Math.max(size.x, size.y, size.z);
          const targetSize = 3; // Desired size in the scene
          const scale = targetSize / maxDimension;
          group.scale.setScalar(scale);

          console.log('🔧 Group scale:', scale);

          scene.add(group);

          // Force solid materials - No transparency allowed!
          gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = false;
              child.receiveShadow = false;
              child.frustumCulled = false;
              
              // FORCE SOLID MATERIALS
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach(mat => {
                    mat.transparent = false;
                    mat.alphaTest = 0;
                    mat.opacity = 1.0;
                    mat.depthWrite = true;
                    mat.depthTest = true;
                    mat.side = THREE.FrontSide;
                    mat.blending = THREE.NormalBlending;
                    if (mat.map) mat.map.flipY = false;
                    mat.needsUpdate = true;
                  });
                } else {
                  child.material.transparent = false;
                  child.material.alphaTest = 0;
                  child.material.opacity = 1.0;
                  child.material.depthWrite = true;
                  child.material.depthTest = true;
                  child.material.side = THREE.FrontSide;
                  child.material.blending = THREE.NormalBlending;
                  if (child.material.map) child.material.map.flipY = false;
                  child.material.needsUpdate = true;
                }
              }
              
              // Force render order
              child.renderOrder = 0;
            }
          });
          
          // Force the model to be visible
          gltf.scene.visible = true;
          gltf.scene.matrixAutoUpdate = true;

          // Start optimized animation loop with lower FPS on mobile
          let lastTime = 0;
          const targetFPS = isMobile ? 30 : 60; // Lower FPS on mobile for better performance
          const frameInterval = 1000 / targetFPS;
          
          const animate = (currentTime: number) => {
            animationRef.current = requestAnimationFrame(animate);
            
            if (currentTime - lastTime >= frameInterval) {
              renderer.render(scene, camera);
              lastTime = currentTime;
            }
          };
          animate(0);
        },
        (progress) => {
          if (progress.total > 0) {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            if (percent < 30) {
              setLoadingMessage('Starting to load your 3D model...');
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
          console.error('❌ Error loading GLB model:', error);
          setModelStatus('error');
        }
      );
    }

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

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      updateCamera();
      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
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

    // Touch events
    let lastTouchDistance = 0;
    
    const onTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      if (event.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      } else if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        lastTouchDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
        );
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (event.touches.length === 1 && isDragging) {
        const deltaX = event.touches[0].clientX - previousMousePosition.x;
        const deltaY = event.touches[0].clientY - previousMousePosition.y;
        
        targetTheta -= deltaX * 0.01;
        targetPhi = Math.max(0.1, Math.min(Math.PI - 0.1, targetPhi + deltaY * 0.01));
        
        previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      } else if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const touchDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        if (lastTouchDistance > 0) {
          const scaleFactor = touchDistance / lastTouchDistance;
          cameraDistance = Math.max(2, Math.min(10, cameraDistance / scaleFactor));
        }
        
        lastTouchDistance = touchDistance;
      }
    };

    const handleResize = () => {
      if (containerRef.current && renderer) {
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
    };

    // Event listeners
    window.addEventListener('resize', handleResize);
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false });
    renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('wheel', onWheel);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '20px' : '20px'
      }}
      onClick={onClose}
    >
      {/* Modern Mobile Modal */}
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: isMobile ? '20px' : '16px',
          width: isMobile ? '95%' : '80%',
          height: isMobile ? '65vh' : '75vh',
          maxWidth: isMobile ? '380px' : '800px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: isMobile ? '0 20px 60px rgba(0,0,0,0.25)' : '0 8px 32px rgba(0,0,0,0.2)',
          border: isMobile ? '1px solid rgba(0,0,0,0.08)' : 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modern Header */}
        <div style={{
          background: modelStatus === 'loaded' ? 'linear-gradient(135deg, #f0f9f0, #e8f5e8)' : 'linear-gradient(135deg, #fefdf0, #fdf8e8)',
          padding: isMobile ? '6px 12px' : '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: isMobile ? 'none' : '1px solid rgba(0,0,0,0.05)',
          minHeight: isMobile ? '40px' : '48px'
        }}>
          <h2 style={{
            color: '#1a1a1a',
            margin: 0,
            fontSize: isMobile ? '13px' : '16px',
            fontWeight: '600',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.01em'
          }}>
            {dishName}
            {modelStatus === 'loaded' && (
              <span style={{
                marginLeft: '8px',
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#22c55e'
              }} />
            )}
          </h2>
          
          <button
            onClick={onClose}
            style={{
              background: 'rgba(0,0,0,0.05)',
              color: '#666',
              border: 'none',
              borderRadius: '50%',
              width: isMobile ? '28px' : '32px',
              height: isMobile ? '28px' : '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: isMobile ? '14px' : '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'rgba(0,0,0,0.05)';
            }}
          >
            ×
          </button>
        </div>

        {/* Main 3D Container */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: '#ffffff',
            cursor: modelStatus === 'loaded' ? 'grab' : 'default'
          }}
        >
        {modelStatus === 'loading' && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.95)',
            zIndex: 50,
            flexDirection: 'column',
            color: '#333'
          }}>
            <div style={{ 
              fontSize: isMobile ? '32px' : '48px', 
              marginBottom: isMobile ? '15px' : '20px', 
              animation: 'pulse 1.5s infinite' 
            }}>🍽️</div>
            <div style={{ 
              fontWeight: 'bold', 
              color: '#fff',
              textAlign: 'center',
              fontSize: isMobile ? '14px' : '16px'
            }}>{loadingMessage}</div>
            <div style={{ 
              fontSize: isMobile ? '11px' : '13px', 
              marginTop: '8px', 
              color: '#ccc',
              textAlign: 'center',
              maxWidth: isMobile ? '250px' : '300px'
            }}>
              Get ready for an amazing 3D food experience! ✨
            </div>
          </div>
        )}

        {modelStatus === 'error' && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.95)',
            fontSize: isMobile ? '14px' : '16px',
            flexDirection: 'column',
            textAlign: 'center',
            padding: isMobile ? '20px' : '40px',
            zIndex: 50,
            color: '#333'
          }}>
            <div style={{ 
              fontSize: isMobile ? '32px' : '48px', 
              marginBottom: isMobile ? '15px' : '20px' 
            }}>😅</div>
            <div style={{ 
              marginBottom: '10px', 
              fontWeight: 'bold', 
              color: '#ff6b6b',
              fontSize: isMobile ? '14px' : '16px'
            }}>Oops! 3D model couldn't load</div>
            <div style={{ 
              fontSize: isMobile ? '11px' : '13px', 
              color: '#ccc',
              maxWidth: isMobile ? '250px' : '300px'
            }}>
              Don't worry - the food still looks (and tastes) amazing! 🌮✨
            </div>
          </div>
        )}

        </div>

        {/* Modern Bottom Bar */}
        {(
          <div style={{
            background: 'linear-gradient(135deg, #f8fffe, #f0fdf9)',
            padding: isMobile ? '8px 12px' : '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            borderTop: isMobile ? 'none' : '1px solid rgba(0,0,0,0.05)',
            minHeight: isMobile ? '48px' : '52px'
          }}>
            <div style={{
              fontSize: isMobile ? '11px' : '12px',
              color: '#64748b',
              flex: 1,
              fontWeight: '500'
            }}>
              {isMobile ? 'Touch & pinch to interact' : 'Drag to rotate, scroll to zoom'}
            </div>
            
            {modelPath && (
              <button
                onClick={handleViewInSpace}
                style={{
                  background: 'linear-gradient(135deg, #000000, #1a1a1a)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: isMobile ? '12px 20px' : '10px 18px',
                  fontSize: isMobile ? '13px' : '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: isMobile ? '140px' : '120px',
                  transition: 'all 0.15s ease',
                  letterSpacing: '0.01em'
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
    </div>
  );
}