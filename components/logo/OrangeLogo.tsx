import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import IssModel from './IssOrangeTick';

const LogoCanvasOrange = () => {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 60 }}
        >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <IssModel />
            <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={1.0}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
                enablePan={false}
            />
        </Canvas>
    );
};

export default LogoCanvasOrange;
