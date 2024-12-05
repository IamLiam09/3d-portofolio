import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
  const group = useRef();
  const computer = useGLTF("./planet/scene.gltf");
  const { actions, mixer } = useAnimations(computer.animations, group);

  // specific sizes and positions for different device types
  const modelConfig = {
    mobile: {
      scale: 1.5,
      position: [0, -0.5, -2],
      rotation: [-0.001, -0.001, -0.001]
    },
    desktop: {
      scale: 2.5,
      position: [0, -0.5, -1.5],
      rotation: [-0.01, -0.2, -0.1]
    },
    tablet: {
      scale: 2.5,
      position: [0, -0.5, -0.6],
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


    // Initialize advanced techniques
    projectionMapping();
    morphAnimation();
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
		<mesh>
			<hemisphereLight intensity={0.15} groundColor="black" />
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
				scale={isMobile ? 0.7 : 1}
				position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
				rotation={[-0.01, -0.2, -0.1]}
			/>
		</mesh>
	);
};

const ComputersCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 500px)');

		const handleMediaQueryChange = (event) => {
			setIsMobile(event.matches);
		};

		// Older browser compatibility
		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener('change', handleMediaQueryChange);
		} else {
			mediaQuery.addListener(handleMediaQueryChange);
		}

		// Cleanup function to remove the listener
		return () => {
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener('change', handleMediaQueryChange);
			} else {
				mediaQuery.removeListener(handleMediaQueryChange);
			}
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
          autoRotate
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
