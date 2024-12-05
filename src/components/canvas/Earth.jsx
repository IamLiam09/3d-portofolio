import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Earth = ({ isDesktop }) => {
	const earth = useGLTF('./desktop_pc/scene.gltf');

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
				object={earth.scene}
				scale={isDesktop ? 0.4 : 0} // Scale based on device (hidden on mobile/tablet)
				position={isDesktop ? [-0.5, -1, -1] : [0, 0, 0]} // Adjust position for desktop
				rotation={[-0.01, -0.2, -0.1]}
			/>
		</mesh>
	);
};

const EarthCanvas = () => {
	const [isDesktop, setIsDesktop] = useState(true);

	// Detect screen size
	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth > 1024); // Desktop width threshold (for devices larger than 1024px)
		};
		handleResize(); // Check on mount
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<Canvas
			frameloop="demand"
			shadows
			dpr={[1, 2]}
			camera={{
				position: isDesktop ? [20, 3, 5] : [0, 0, 5], // Adjust camera position for desktop vs mobile/tablet
				fov: 25,
			}}
			gl={{ preserveDrawingBuffer: true }}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				{isDesktop && <Earth isDesktop={isDesktop} />} {/* Render Earth only on desktop */}

				<Preload all />
			</Suspense>
		</Canvas>
	);
};

export default EarthCanvas;
