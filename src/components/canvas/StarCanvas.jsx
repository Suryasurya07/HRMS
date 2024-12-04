import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Stars = () => {
    const ref = useRef();

    // Rotate the stars for a dynamic effect
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.x -= 0.0005;
            ref.current.rotation.y -= 0.0005;
        }
    });

    // Generate random star positions
    const generateStars = (count) => {
        const positions = new Float32Array(count * 3); // Each star has x, y, z
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 5; // Range -2.5 to 2.5
        }
        return positions;
    };

    const starPositions = generateStars(5000);

    return (
        <Points ref={ref} positions={starPositions} stride={3}>
            <PointMaterial
                size={0.01}
                sizeAttenuation
                transparent
                depthWrite={false}
                color="#ffffff"
            />
        </Points>
    );
};

const StarCanvas = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 1.5] }}
            style={{
                position: "fixed",  // Fix the canvas to the screen
                top: 0,             // Start at the top of the page
                left: 0,            // Start at the left of the page
                width: "100vw",     // Take up full width of the viewport
                height: "100vh",    // Take up full height of the viewport
                zIndex: -1,         // Put the canvas behind other content
                pointerEvents: "none", // Prevent canvas from blocking interactions
            }}
        >
            <Stars />
        </Canvas>
    );
};

export default StarCanvas;
