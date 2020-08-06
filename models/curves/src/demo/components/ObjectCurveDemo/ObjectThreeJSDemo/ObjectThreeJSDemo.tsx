import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, extend } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './ObjectThreeJSDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Slider } from 'rsuite';
import { Curve, Modifiers } from '../../../../..';
import 'rsuite/dist/styles/rsuite-default.css';
import ThreeDemoFloor from '../../ThreeDemo/ThreeDemoFloor/ThreeDemoFloor';
import CameraControls from '../../ThreeDemo/CameraControls/CameraControls';
import ThreeDemoHDRI, { loadHDRI } from '../../ThreeDemo/ThreeDemoHDRI/ThreeDemoHDRI';

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import * as images from '../../../assets/images/*.*';
import ThreeDemoCar from './ThreeDemoCar/ThreeDemoCar';

extend({ OrbitControls });

interface ObjectThreeJSDemoProps {
  curve: Curve<object>;
  onTimeChange: (time: number) => void;
  steps?: number;
}

function ObjectThreeJSDemo(props: ObjectThreeJSDemoProps): React.ReactElement {
  const [time, setTime] = useState(0);
  const [hdri, setHDRI] = useState<THREE.Texture>();
  const duration = (props.curve.duration + props.curve.startTime);
  const stepTime = duration / (props.steps ?? 100);

  const [floorMaterial] = useState(new THREE.MeshPhysicalMaterial({
    roughness: 0.65,
    color: 0xc2d5ff,
    normalScale: new THREE.Vector2(1, 1),
    side: THREE.DoubleSide,
  }));

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    // Floor
    function setFloorWrapping(map) {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(3, 3);
    }
    textureLoader.load(images.ground_grey_diff_1k.jpg, (map) => {
      setFloorWrapping(map);
      floorMaterial.map = map;
      floorMaterial.needsUpdate = true;
    });
    textureLoader.load(images.ground_grey_nor_1k.jpg, (map) => {
      setFloorWrapping(map);
      floorMaterial.normalMap = map;
      floorMaterial.needsUpdate = true;
    });
    textureLoader.load(images.ground_grey_rough_1k.jpg, (map) => {
      setFloorWrapping(map);
      floorMaterial.roughnessMap = map;
      floorMaterial.needsUpdate = true;
    });
    textureLoader.load(images.ground_grey_ao_1k.jpg, (map) => {
      setFloorWrapping(map);
      floorMaterial.aoMap = map;
      floorMaterial.needsUpdate = true;
    });
  }, []);

  function onTimeChange(t: number) {
    setTime(t);
    props.onTimeChange(t);
  }

  return (
    <div className="vector3-demo-container">
      <div className="vector3-demo-canvas-container">
        <Canvas className="three-fiber-canvas" shadowMap>
          <pointLight position={[10, 20, 0]} intensity={1} castShadow />
          <CameraControls />
          <ThreeDemoCar
            carSettings={props.curve.evaluate(time)}
          />
          <ThreeDemoFloor material={floorMaterial} />
          <Suspense fallback={null}>
            <ThreeDemoHDRI
              urls={[
                images.q_px.png,
                images.q_nx.png,
                images.q_py.png,
                images.q_ny.png,
                images.q_pz.png,
                images.q_nz.png,
              ]}
              onLoad={setHDRI}
              background
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="time-slider-container">
        <h5>Adjust Time</h5>
        <br />
        <Slider
          defaultValue={props.curve.startTime}
          onChange={onTimeChange}
          step={stepTime}
          progress
          min={props.curve.startTime}
          max={props.curve.endTime}
        />
      </div>
    </div>
  );
}

export default ObjectThreeJSDemo;
