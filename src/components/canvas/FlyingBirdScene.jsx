import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';

// Bird component to animate the 3D bird
const Bird = ({ startPosition, endPosition, onAnimationComplete }) => {
  const { scene } = useGLTF('./bird/bee.glb');  // Assuming you have a 3D bird model at this path
  const birdRef = useRef();
  const [animationFinished, setAnimationFinished] = useState(false);

  // Provide default values if startPosition or endPosition is undefined
  const defaultStartPosition = startPosition || { x: 0, y: 0, z: 0 };
  const defaultEndPosition = endPosition || { x: 5, y: 5, z: -5 };

  // Use framer-motion to animate the bird in 3D space
  const birdAnimation = {
    x: [defaultStartPosition.x, defaultEndPosition.x],
    y: [defaultStartPosition.y, defaultEndPosition.y],
    z: [defaultStartPosition.z, defaultEndPosition.z],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      onComplete: () => {
        setAnimationFinished(true);
        onAnimationComplete();
      }
    }
  };

  return (
    <motion.group
      ref={birdRef}
      {...birdAnimation}
    >
      <primitive object={scene} scale={0.5} />  {/* Scale and render the bird model */}
    </motion.group>
  );
};

const FlyingBirdScene = ({ startPosition, endPosition, onAnimationComplete }) => {
  return (
    <Canvas>
      {/* Add a simple ambient light and a directional light to illuminate the scene */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      
      {/* Bird component with animation */}
      <Bird 
        startPosition={startPosition} 
        endPosition={endPosition} 
        onAnimationComplete={onAnimationComplete} 
      />
    </Canvas>
  );
};

export default FlyingBirdScene;
