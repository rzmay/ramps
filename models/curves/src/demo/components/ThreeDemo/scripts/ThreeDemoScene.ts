import React from 'react';
import * as THREE from 'three';
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class ThreeDemoScene {

  container: React.RefObject<HTMLDivElement>;
  domElement: HTMLCanvasElement | undefined;

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  stats: Stats;

  private _time: number = 0;
  private _startTime: number = 0;
  private _deltaTime: number = 0;
  private _lastFrameTime: number = 0;


  constructor(
    container: React.RefObject<HTMLDivElement>,
    color: THREE.Color = new THREE.Color(0x202020),
  ) {
    console.log('Constructing new scene');
    // DOM
    this.container = container;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = color;


    // Camera
    this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.01,
        5000
    );

    this.scene.add(this.camera);
    this.camera.position.set(0,5,10);
    this.camera.lookAt(this.scene.position);


    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;

    // Stats
    this.stats = Stats();
    this.stats.domElement.className = 'vector3-scene-stats';
    this.stats.domElement.setAttribute('style', '');

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 0.25;
    this.controls.zoomSpeed = 0.75;

    // Skybox
    let skyBoxGeometry = new THREE.BoxGeometry( 4000, 4000, 4000 );
    let skyBoxMaterial = new THREE.MeshBasicMaterial( { color: color, side: THREE.BackSide } );
    let skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );

    this.scene.add(skyBox);
  }

  start() {
    console.log('Starting scene');
    // Add scene to dom
    this.domElement = this.renderer.domElement;
    this.container.current?.appendChild(this.domElement);

    // Add resize listener
    const resize = () => {
      let size: { width: number, height: number };
      if (this.domElement != undefined
          && this.domElement.parentElement != undefined
      ) {
        size = {
          width: this.domElement.parentElement.offsetWidth,
          height: this.domElement.parentElement.offsetHeight,
        };
      } else {
        size = {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      }

      this.camera.aspect = size.width / size.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(size.width, size.height);
    };

    window.addEventListener('resize', resize);
    resize();

    // Add stats
    // this.container.current?.appendChild( this.stats.domElement );

    // Start update loop
    this._startTime = new Date().getTime();
    this._lastFrameTime = this._startTime;
    this._deltaTime = 0;
    window.requestAnimationFrame(() => { this.update(); })
  }

  update() {
    this._time = new Date().getTime();

    // Calculate _deltaTime
    this._deltaTime = this._time - this._lastFrameTime;
    this._lastFrameTime = this._time;

    // Update camera
    this.controls.update();
    this.stats.update();

    // Render
    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(() => { this.update() })
  }
}

export default ThreeDemoScene;
