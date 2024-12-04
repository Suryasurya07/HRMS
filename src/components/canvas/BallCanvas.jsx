import { Canvas } from '@react-three/fiber'; // Import Canvas component
import Ball from './Ball'; // Import the Ball component

const BallCanvas = () => {
  return (
    <Canvas>
      {/* Add any other 3D objects or lighting if necessary */}
      <Ball imgUrl="src/assets/herobg.png" />  {/* Pass the texture URL as a prop */}
    </Canvas>
  );
};

export default BallCanvas;
