import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Global cache for preloaded models
const modelCache = new Map<string, THREE.Group>();
const loadingPromises = new Map<string, Promise<THREE.Group>>();
const priorityQueue: string[] = [];
let currentlyLoading: string | null = null;

// Global loader instance
let globalLoader: GLTFLoader | null = null;

function initializeLoader() {
  if (!globalLoader) {
    globalLoader = new GLTFLoader();
    
    // Add DRACO compression support
    try {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      globalLoader.setDRACOLoader(dracoLoader);
    } catch (error) {
      console.log('DRACO loader not available, using standard loading');
    }
    
    // Enable caching
    THREE.Cache.enabled = true;
  }
  return globalLoader;
}

function loadNextModel() {
  if (currentlyLoading || priorityQueue.length === 0) {
    return;
  }

  const modelPath = priorityQueue.shift()!;
  
  // Skip if already cached or loading
  if (modelCache.has(modelPath) || loadingPromises.has(modelPath)) {
    // Continue to next model
    setTimeout(loadNextModel, 10);
    return;
  }

  currentlyLoading = modelPath;
  const loader = initializeLoader();

  // Start loading and cache the promise
  const loadPromise = new Promise<THREE.Group>((resolve, reject) => {
    loader.load(
      modelPath,
      (gltf) => {
        // Clone the scene to avoid modifying the original
        const modelGroup = gltf.scene.clone();
        
        // Optimize the cloned model
        modelGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = false;
            child.receiveShadow = false;
            child.frustumCulled = false;
            
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
          }
        });

        // Cache the processed model
        modelCache.set(modelPath, modelGroup);
        console.log(`🚀 Preloaded model: ${modelPath}`);
        resolve(modelGroup);
      },
      (progress) => {
        // Only show progress for priority loads
        if (priorityQueue[0] === modelPath) {
          const percent = Math.round((progress.loaded / (progress.total || 1)) * 100);
          if (percent % 25 === 0) { // Only log every 25%
            console.log(`⚡ Priority loading: ${percent}%`);
          }
        }
      },
      (error) => {
        console.error(`❌ Failed to preload model: ${modelPath}`, error);
        reject(error);
      }
    );
  });

  // Cache the loading promise
  loadingPromises.set(modelPath, loadPromise);

  // Clean up and continue to next model when done
  loadPromise.finally(() => {
    loadingPromises.delete(modelPath);
    currentlyLoading = null;
    // Load next model in queue
    setTimeout(loadNextModel, 100);
  });
}

export function useModelPreloader(modelPaths: string[]) {
  useEffect(() => {
    // Add models to queue (only new ones)
    modelPaths.forEach(modelPath => {
      if (modelPath && 
          !modelCache.has(modelPath) && 
          !loadingPromises.has(modelPath) &&
          !priorityQueue.includes(modelPath)) {
        priorityQueue.push(modelPath);
      }
    });

    // Start loading if not already loading
    if (!currentlyLoading) {
      setTimeout(loadNextModel, 10);
    }
  }, [modelPaths]);

  // Return function to get cached model
  const getCachedModel = (modelPath: string): THREE.Group | null => {
    return modelCache.get(modelPath) || null;
  };

  // Return function to check if model is loading
  const isModelLoading = (modelPath: string): boolean => {
    return loadingPromises.has(modelPath);
  };

  return { getCachedModel, isModelLoading };
}

// Export cache access functions for use in components
export const getPreloadedModel = (modelPath: string): THREE.Group | null => {
  return modelCache.get(modelPath) || null;
};

export const isModelPreloading = (modelPath: string): boolean => {
  return loadingPromises.has(modelPath);
};

// Function to prioritize loading a specific model (when user clicks 3D view)
export const prioritizeModelLoading = (modelPath: string): Promise<THREE.Group> => {
  // If already cached, return immediately
  if (modelCache.has(modelPath)) {
    return Promise.resolve(modelCache.get(modelPath)!);
  }

  // If already loading, return existing promise
  if (loadingPromises.has(modelPath)) {
    return loadingPromises.get(modelPath)!;
  }

  // Move to front of queue for priority loading
  const index = priorityQueue.indexOf(modelPath);
  if (index > -1) {
    priorityQueue.splice(index, 1);
  }
  priorityQueue.unshift(modelPath);

  // If nothing is currently loading, start immediately
  if (!currentlyLoading) {
    setTimeout(loadNextModel, 10);
  }

  // Create and return a promise for this model
  const loader = initializeLoader();
  const loadPromise = new Promise<THREE.Group>((resolve, reject) => {
    // Check if it gets loaded by the queue system
    const checkLoaded = () => {
      if (modelCache.has(modelPath)) {
        resolve(modelCache.get(modelPath)!);
      } else if (loadingPromises.has(modelPath)) {
        // Wait for current loading to complete
        loadingPromises.get(modelPath)!.then(resolve).catch(reject);
      } else {
        // Not loading yet, check again
        setTimeout(checkLoaded, 50);
      }
    };
    checkLoaded();
  });

  return loadPromise;
};