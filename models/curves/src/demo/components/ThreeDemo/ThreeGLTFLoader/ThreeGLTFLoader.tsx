import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from 'react-three-fiber';

interface ThreeGLTFLoaderProps {
    url: string;
    onLoad?: (ref: React.MutableRefObject<THREE.Group | undefined>) => any;
}

function ThreeGLTFLoader(props: ThreeGLTFLoaderProps): React.ReactElement {
  const gltf = useLoader(GLTFLoader, props.url);
  const ref = useRef<THREE.Group>();

  function setCastShadow(object: THREE.Object3D, castShadow = true) {
    object.children.forEach((child) => {
      child.castShadow = castShadow;
      setCastShadow(child, castShadow);
    });
  }

  useEffect(() => {
    setCastShadow(gltf.scene);
    if (props.onLoad) props.onLoad(ref);
  }, []);

  return (
    <primitive /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
      ref={ref}
      object={gltf.scene}
    />
  );
}

export default ThreeGLTFLoader;
