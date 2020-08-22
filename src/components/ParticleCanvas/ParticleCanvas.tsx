import React, { useEffect, useState } from 'react';
import './ParticleCanvas.scss';
import { Canvas } from 'react-three-fiber';
import CameraControls from '../../../models/ThreeDemo/CameraControls/CameraControls';
import ThreeDemoFloor from '../../../models/ThreeDemo/ThreeDemoFloor/ThreeDemoFloor';
import ThreeDemoBox from '../../../models/ThreeDemo/ThreeDemoBox/ThreeDemoBox';

function ParticleCanvas(): React.ReactElement {
  return (
    <Canvas
      className="particle-demo-canvas"
      onCreated={({ gl }) => gl.setClearColor('#202020')}
      shadowMap
    >
      <pointLight position={[10, 20, 0]} intensity={1} castShadow />
      <ambientLight />
      <CameraControls />
      <ThreeDemoFloor width={1000} length={1000} />
    </Canvas>
  );
}

export default ParticleCanvas;
