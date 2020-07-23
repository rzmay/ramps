import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, Dom, useFrame, extend, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Vector3ThreeJSDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Slider, RangeSlider } from 'rsuite';
import { Curve, Modifiers } from '../../../../..';
import 'rsuite/dist/styles/rsuite-default.css';
import { Vector3 } from '../../../../interfaces/Vector3';
import ThreeDemoFloor from '../../ThreeDemo/ThreeDemoObject/ThreeDemoFloor/ThreeDemoFloor';

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import * as images from '../../../assets/images/*.*';
import CameraControls from '../../ThreeDemo/ThreeDemoObject/CameraControls/CameraControls';
import ThreeDemoBox from '../../ThreeDemo/ThreeDemoObject/ThreeDemoBox/ThreeDemoBox';
import ThreeDemoHDRI from '../../ThreeDemo/ThreeDemoHDRI/ThreeDemoHDRI';

extend({ OrbitControls });

interface Vector3ThreeJSDemoProps {
    curve: Curve<Vector3>;
    steps?: number;
}

function Vector3ThreeJSDemo(props: Vector3ThreeJSDemoProps): React.ReactElement {
  const [time, setTime] = useState(0);
  const duration = (props.curve.duration + props.curve.startTime);
  const stepTime = duration / (props.steps ?? 100);

  const [floorMaterial] = useState(new THREE.MeshPhysicalMaterial({
    roughness: 0.8,
    color: 0xffd9e5,
    normalScale: new THREE.Vector2(1, 1),
    side: THREE.DoubleSide,
  }));

  const [boxMaterial] = useState(new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
  }));

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    // Floor
    function setFloorWrapping(map) {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(8, 8);
    }
    textureLoader.load(images.cobblestone_square_diff_1k.jpg, (map) => {
      setFloorWrapping(map);
      floorMaterial.map = map;
      floorMaterial.needsUpdate = true;
    });
    textureLoader.load(images.cobblestone_square_Nor_1k.jpg, (map) => {
      setFloorWrapping(map);
      floorMaterial.normalMap = map;
      floorMaterial.needsUpdate = true;
    });
    textureLoader.load(images.cobblestone_square_rough_1k.jpg, (map) => {
      setFloorWrapping(map);
      floorMaterial.roughnessMap = map;
      floorMaterial.needsUpdate = true;
    });
    textureLoader.load(images.cobblestone_square_AO_1k.jpg, (map) => {
      setFloorWrapping(map);
      floorMaterial.aoMap = map;
      floorMaterial.needsUpdate = true;
    });
    textureLoader.load(images.cobblestone_square_spec_1k.jpg, (map) => {
      setFloorWrapping(map);
      floorMaterial.metalnessMap = map;
      floorMaterial.needsUpdate = true;
    });

    // Box
    function setBoxWrapping(map) {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set(0.25, 0.25);
    }
    textureLoader.load(images.castle_brick_07_diff_1k.jpg, (map) => {
      setBoxWrapping(map);
      boxMaterial.map = map;
      boxMaterial.needsUpdate = true;
    });
    textureLoader.load(images.castle_brick_07_nor_1k.jpg, (map) => {
      setBoxWrapping(map);
      boxMaterial.normalMap = map;
      boxMaterial.needsUpdate = true;
    });
    textureLoader.load(images.castle_brick_07_rough_1k.jpg, (map) => {
      setBoxWrapping(map);
      boxMaterial.roughnessMap = map;
      boxMaterial.needsUpdate = true;
    });
    textureLoader.load(images.castle_brick_07_ao_1k.jpg, (map) => {
      setBoxWrapping(map);
      boxMaterial.aoMap = map;
      boxMaterial.needsUpdate = true;
    });
  }, []);

  return (
    <div className="vector3-demo-container">
      <div className="vector3-demo-canvas-container">
        <Canvas className="three-fiber-canvas" shadowMap>
          <pointLight position={[0, 10, 0]} intensity={1} castShadow />
          <CameraControls />
          <ThreeDemoFloor material={floorMaterial} />
          <ThreeDemoBox
            material={boxMaterial}
            position={
              (() => {
                const pos = props.curve.evaluate(time);
                return [pos.x, pos.y, pos.z];
              })()
            }
          />
          <Suspense fallback={null}>
            <ThreeDemoHDRI
              urls={[
                images.px.png,
                images.nx.png,
                images.py.png,
                images.ny.png,
                images.pz.png,
                images.nz.png,
              ]}
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
          onChange={setTime}
          step={stepTime}
          progress
          min={props.curve.startTime}
          max={props.curve.endTime}
        />
      </div>
    </div>
  );
}

export default Vector3ThreeJSDemo;
