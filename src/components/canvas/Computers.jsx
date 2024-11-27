import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Preload, 
  useGLTF, 
  useAnimations 
} from "@react-three/drei";
import * as THREE from 'three';

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const group = useRef();
  const computer = useGLTF("./morph/scene.gltf");
  const { actions, mixer } = useAnimations(computer.animations, group);

  // specific sizes and positions for different device types
  const modelConfig = {
    mobile: {
      scale: 0.8,
      position: [0, -2.5, -2],
      rotation: [-0.001, -0.001, -0.001]
    },
    desktop: {
      scale: 1.5,
      position: [0, -2, -1.5],
      rotation: [-0.01, -0.2, -0.1]
    },
    tablet: {
      scale: 1,
      position: [0, -3, -0.6],
      rotation: [-0.01, -0.2, -0.1]
    }
  };

  // configuration based on screen size
  const config = isMobile 
    ? (window.innerWidth <= 500 ? modelConfig.mobile : modelConfig.tablet)
    : modelConfig.desktop;

  // Advanced Manipulation Techniques
  useEffect(() => {
    // Projection Mapping Simulation
    const projectionMapping = () => {
      computer.scene.traverse((child) => {
        if (child.isMesh) {
          // a spherical environment map
          const renderTarget = new THREE.WebGLCubeRenderTarget(256);
          const cubeCamera = new THREE.CubeCamera(1, 1000, renderTarget);
          
          // environment mapping
          child.material.envMap = renderTarget.texture;
          child.material.reflectivity = 0.5;
        }
      });
    };

    // Morph Target Manipulation
    const morphAnimation = () => {
      if (computer.scene.morphTargetDictionary) {
        const morphTargets = Object.keys(computer.scene.morphTargetDictionary);
        morphTargets.forEach((targetName, index) => {
          // Cycle through morph targets
          const influence = Math.sin(Date.now() * 0.001 * (index + 1)) * 0.5 + 0.5;
          computer.scene.morphTargetInfluences[index] = influence;
        });
      }
    };

    // Fossil Reconstruction Simulation
    const fragmentReconstruction = () => {
      computer.scene.traverse((child) => {
        if (child.isMesh) {
          // Simulate fragment reconstruction
          child.geometry.computeBoundingBox();
          const boundingBox = child.geometry.boundingBox;
          
          // a shader material to visualize reconstruction
          child.material = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
              boundingMin: { value: boundingBox.min },
              boundingMax: { value: boundingBox.max }
            },
            vertexShader: `
              uniform float time;
              uniform vec3 boundingMin;
              uniform vec3 boundingMax;
              varying vec3 vPosition;
              
              void main() {
                vPosition = position;
                vec3 animatedPosition = position + normal * sin(time + length(position)) * 0.1;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(animatedPosition, 1.0);
              }
            `,
            fragmentShader: `
              uniform float time;
              varying vec3 vPosition;
              
              void main() {
                float reconstructionProgress = sin(time) * 0.5 + 0.5;
                gl_FragColor = vec4(1.0, reconstructionProgress, 0.0, 1.0);
              }
            `
          });
        }
      });
    };

    // Rigid Body Physics Simulation
    const rigidBodySimulation = () => {
      computer.scene.traverse((child) => {
        if (child.isMesh) {
          // Add simple physics-like movement
          child.userData.velocity = new THREE.Vector3(
            Math.random() * 0.01 - 0.005,
            Math.random() * 0.01 - 0.005,
            Math.random() * 0.01 - 0.005
          );
        }
      });
    };

    // Initialize advanced techniques
    projectionMapping();
    morphAnimation();
    fragmentReconstruction();
    rigidBodySimulation();
  }, [computer.scene]);

  // Animated physics and morph targets
  useFrame((state, delta) => {
    // Update mixer for animations
    mixer?.update(delta);

    // Simulated physics-like movement
    computer.scene.traverse((child) => {
      if (child.isMesh && child.userData.velocity) {
        child.position.add(child.userData.velocity);
        
        // Boundary checking
        const boundingBox = new THREE.Box3().setFromObject(child);
        if (
          boundingBox.max.x > 10 || boundingBox.min.x < -10 ||
          boundingBox.max.y > 10 || boundingBox.min.y < -10 ||
          boundingBox.max.z > 10 || boundingBox.min.z < -10
        ) {
          child.userData.velocity.negate();
        }
      }
    });
  });

  return (
    <group ref={group}>
      <hemisphereLight intensity={0.15} groundColor='white' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />

      <primitive
        object={computer.scene}
        scale={config.scale}
        position={config.position}
        rotation={config.rotation}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width <= 500) {
        setDeviceType('mobile');
      } else if (width <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ 
        position: deviceType === 'mobile' 
          ? [15, 3, 5]  
          : [20, 3, 5], 
        fov: deviceType === 'mobile' ? 30 : 25 
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={deviceType !== 'desktop'} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;