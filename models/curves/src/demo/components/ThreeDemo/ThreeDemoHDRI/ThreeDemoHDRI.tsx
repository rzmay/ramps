import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useLoader, useThree } from 'react-three-fiber';

interface ThreeDemoHDRIProps {
    urls: string[];
    exposure?: number;
    background?: boolean;
}

function ThreeDemoHDRI(props: ThreeDemoHDRIProps): React.ReactElement {
  const { gl, scene } = useThree();
  // @ts-ignore
  const [cubeMap] = useLoader(THREE.CubeTextureLoader, [props.urls]);
  useEffect(() => {
    const gen = new THREE.PMREMGenerator(gl);
    gen.compileEquirectangularShader();
    const hdrCubeRenderTarget = gen.fromCubemap(cubeMap);
    cubeMap.dispose();
    gen.dispose();
    if (props.background ?? true) scene.background = hdrCubeRenderTarget.texture;
    scene.environment = hdrCubeRenderTarget.texture;
    // gl.toneMappingExposure = props.exposure ?? 1.0;
  }, [cubeMap]);

  return (
    <mesh />
  );
}

export default ThreeDemoHDRI;
