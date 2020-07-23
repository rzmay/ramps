import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import ThreeDemoScene from '../../scripts/ThreeDemoScene';

interface ThreeDemoFloorProps {
    material: THREE.Material;
    scene?: ThreeDemoScene;
}

function ThreeDemoFloor(props: ThreeDemoFloorProps): React.ReactElement {
  const floorGeometry = new THREE.PlaneGeometry(50, 50, 10, 10);
  const mesh = useRef();

  useEffect(() => {
    if (mesh !== undefined && mesh.current !== undefined) {
      // @ts-ignore
      mesh.current.position.set(0, 0, 0);

      // @ts-ignore
      mesh.current.rotation.x = Math.PI / 2;
    }
  }, []);

  return (
    <mesh
      ref={mesh}
      geometry={floorGeometry}
      material={props.material}
      receiveShadow
    />
  );
}

export default ThreeDemoFloor;
