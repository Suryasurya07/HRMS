import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Environment, Stage } from "@react-three/drei";
import Loader from "../../components/Layout/Loader";


// Earth component to load and display the Earth model
const Earth = () => {
  const { scene, nodes, materials } = useGLTF("./planet/scene.gltf"); // Load GLTF model of the Earth
  return (
    <primitive
      object={scene} // Use the 3D model scene
      scale={2.5} // Scale the model to 2.5 times its original size
      position-y={0}
      position-x={0} // Position the Earth along the y-axis
      rotation-y={0} // Set rotation along y-axis
      dispose={null} // To avoid auto-disposal of objects, useful for large models
    />
  );
};

// EarthCanvas component that wraps the 3D scene and camera
const EarthCanvas = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoader = (loadingState) => {
    setIsLoading(loadingState);
  };

  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]} // High resolution on retina screens
      gl={{ preserveDrawingBuffer: true }} // Keep the image buffer for screenshots
      camera={{
        fov: 75, // Field of view
        near: 0.1, // Near clipping plane
        far: 200, // Far clipping plane
        position: [-4, 3, 6], // Camera position in 3D space
      }}
    >
      {/* Suspense to show a loader while the GLTF model is loading */}
      <Suspense fallback={<Loader />}>
        {/* OrbitControls allow rotating and zooming with mouse */}
        <OrbitControls
          autoRotate // Auto-rotate the Earth
          enableZoom={false} // Allow zoom
          maxPolarAngle={Math.PI / 2} // Limit vertical camera angle
          minPolarAngle={Math.PI / 3} // Limit vertical camera angle (prevent camera from going below Earth)
        />

        {/* Environment map for better lighting and reflections */}
        {/* <Environment preset="sunset" background /> Use preset lighting */}
        
        {/* Stage component for better lighting around the Earth */}
        <Stage intensity={0.8} environment="sunset">
          <Earth /> {/* Render the Earth model */}
        </Stage>

        {/* Preload all assets */}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
