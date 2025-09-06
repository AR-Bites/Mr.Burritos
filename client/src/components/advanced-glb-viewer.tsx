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

  // AR Code Style Experience - Button Click → Instant AR Camera
  const handleViewInSpace = async () => {
    if (!modelPath) {
      alert('3D model not available for AR view');
      return;
    }

    console.log('🔍 Starting AR Code style experience for:', dishName);

    try {
      // Request camera permission (like AR Code app does)
      console.log('📷 Requesting camera access...');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Back camera for AR
          width: { ideal: 1920, min: 1280 },
          height: { ideal: 1080, min: 720 }
        }
      });

      console.log('✅ Camera access granted! Launching AR experience...');
      
      // Immediately launch full-screen AR camera (like AR Code)
      launchARCodeExperience(stream);

    } catch (error) {
      console.error('❌ Camera access denied:', error);
      alert('Camera access is required for AR. Please allow camera access to view your 3D model in space!');
    }
  };

  // Launch AR Code Style Experience - Full Screen AR Camera
  const launchARCodeExperience = (stream: MediaStream) => {
    console.log('🚀 Launching AR Code style experience!');
    
    // Create full-screen AR overlay (like AR Code app)
    const arOverlay = document.createElement('div');
    arOverlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: black; z-index: 999999; display: flex; flex-direction: column;
    `;
    
    // Camera video background
    const video = document.createElement('video');
    video.srcObject = stream;
    video.style.cssText = `
      width: 100%; height: 100%; object-fit: cover;
    `;
    video.autoplay = true;
    video.playsInline = true;
    
    // 3D canvas overlay for AR model
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    `;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Three.js AR scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent
    
    // AR lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(5, 10, 5);
    scene.add(light);
    
    // Load 3D model for AR
    const loader = new GLTFLoader();
    let arModel: THREE.Group | null = null;
    
    loader.load(modelPath!, (gltf) => {
      console.log('✅ 3D model loaded for AR Code experience');
      
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const scale = 0.4 / Math.max(size.x, size.y, size.z); // Perfect AR size
      model.scale.setScalar(scale);
      model.position.set(0, -0.3, -1.2); // Position in front of camera
      
      arModel = new THREE.Group();
      arModel.add(model);
      scene.add(arModel);
      
      console.log('🍔 3D model placed in AR space!');
    });
    
    // AR Code style close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute; top: 30px; right: 30px; z-index: 1000000;
      width: 50px; height: 50px; border-radius: 25px;
      background: rgba(0,0,0,0.7); color: white; border: 2px solid white;
      font-size: 20px; font-weight: bold; cursor: pointer;
    `;
    closeBtn.onclick = () => {
      stream.getTracks().forEach(track => track.stop());
      document.body.removeChild(arOverlay);
      console.log('🔚 AR Code experience ended');
    };
    
    // AR Code style instructions
    const instructions = document.createElement('div');
    instructions.innerHTML = `
      <div style="
        color: white; text-align: center; padding: 15px 20px;
        background: rgba(0,0,0,0.8); border-radius: 20px;
        border: 2px solid rgba(255,255,255,0.3);
      ">
        <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: bold;">🍔 ${dishName}</h3>
        <p style="margin: 0; font-size: 14px; opacity: 0.9;">Move your phone to explore in AR</p>
      </div>
    `;
    instructions.style.cssText = `
      position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
      z-index: 1000000; max-width: 320px;
    `;
    
    // Assemble AR experience
    arOverlay.appendChild(video);
    arOverlay.appendChild(canvas);
    arOverlay.appendChild(closeBtn);
    arOverlay.appendChild(instructions);
    document.body.appendChild(arOverlay);
    
    // AR animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gentle rotation for realism
      if (arModel) {
        arModel.rotation.y += 0.008;
      }
      
      renderer.render(scene, camera);
    };
    animate();
    
    console.log('🎬 AR Code experience launched successfully!');
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

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    if (!isMobile) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced lighting
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

    const fillLight1 = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight1.position.set(-5, 5, -5);
    scene.add(fillLight1);

    const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.2);
    fillLight2.position.set(0, -5, 5);
    scene.add(fillLight2);

    // Load GLB model
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
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        model.scale.setScalar(scale);
        
        model.position.sub(center.multiplyScalar(scale));
        
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

    // Mouse/Touch controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraDistance = Math.sqrt(camera.position.x ** 2 + camera.position.y ** 2 + camera.position.z ** 2);
    
    let targetTheta = Math.atan2(camera.position.x, camera.position.z);
    let targetPhi = Math.acos(camera.position.y / cameraDistance);
    let currentTheta = targetTheta;
    let currentPhi = targetPhi;

    const updateCamera = () => {
      currentTheta += (targetTheta - currentTheta) * 0.1;
      currentPhi += (targetPhi - currentPhi) * 0.1;
      
      camera.position.x = cameraDistance * Math.sin(currentPhi) * Math.sin(currentTheta);
      camera.position.y = cameraDistance * Math.cos(currentPhi);
      camera.position.z = cameraDistance * Math.sin(currentPhi) * Math.cos(currentTheta);
      camera.lookAt(0, 0, 0);
    };

    let lastTime = 0;
    const frameInterval = 1000 / 30;
    
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

    // Event handlers
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

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      
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

        {/* AR Code Style Button */}
        {modelStatus === 'loaded' && isMobile && (
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100
            }}
          >
            <button
              onClick={handleViewInSpace}
              style={{
                background: 'linear-gradient(135deg, #007AFF, #0051D5)',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(0, 122, 255, 0.4)',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 12px 25px rgba(0, 122, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 8px 20px rgba(0, 122, 255, 0.4)';
              }}
            >
              <span style={{ fontSize: '18px' }}>📱</span>
              View in Your Space
            </button>
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
