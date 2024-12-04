import { Decal, Float, useTexture } from "@react-three/drei"; 

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#fff"
          roughness={0.4}
          metalness={0.3}
          emissive="#f0f0f0"
          emissiveIntensity={0.1}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1.1}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

export default Ball;
