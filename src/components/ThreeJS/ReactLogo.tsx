import { Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { IObject } from '@/interface/Components/ThreeJS/Object/Object';
import { memo } from 'react';

const ReactLogo = (props: IObject) => {
  const { nodes, materials } = useGLTF('models/react.glb') as unknown as {
    nodes: {
      'React-Logo_Material002_0': THREE.Mesh;
    };
    materials: {
      'Material.002': THREE.Material;
    };
  };

  return (
    <Float floatIntensity={1}>
      <group position={[8, 8, 0]} scale={0.3} {...props} dispose={null}>
        <mesh
          geometry={nodes['React-Logo_Material002_0'].geometry}
          material={materials['Material.002']}
          position={[0, 0.079, 0.181]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.392, 0.392, 0.527]}
        />
      </group>
    </Float>
  );
};

useGLTF.preload('models/react.glb');

export default memo(ReactLogo);
