import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from "./Iss";


const LogoCanvas = () => {
    return (
        <Canvas>
            <OrbitControls enableZoom={false} autoRotate maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
            <ambientLight />
            <Model />
        </Canvas>
    )
}

export default LogoCanvas
