import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { memo, useRef, useState } from 'react';
import { Float, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { IObject } from '@/interface/Components/ThreeJS/Object/Object';

const Cube = ({ ...props } : IObject) => {
  const { nodes } = useGLTF('models/cube.glb') as unknown as {
    nodes: {
      Cube: THREE.Mesh;
    };
  };;

  const texture = useTexture('textures/cube.png');

  const cubeRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    if (cubeRef.current) {
      gsap
      .timeline({
        repeat: -1,
        repeatDelay: 0.5,
      })
      .to(cubeRef.current.rotation, {
        y: hovered ? '+=2' : `+=${Math.PI * 2}`,
        x: hovered ? '+=2' : `-=${Math.PI * 2}`,
        duration: 2.5,
        stagger: {
          each: 0.15,
        },
      });
    }
  });

  return (
    <Float floatIntensity={2}>
      <group position={[9, -4, 0]} rotation={[2.6, 0.8, -1.8]} scale={0.74} dispose={null} {...props}>
        <mesh
          ref={cubeRef}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          onPointerEnter={() => setHovered(true)}>
          <meshMatcapMaterial matcap={texture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
};

useGLTF.preload('models/cube.glb');

export default memo(Cube);