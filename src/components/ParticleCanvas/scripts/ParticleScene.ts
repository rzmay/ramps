import React from 'react';
import * as THREE from 'three';
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// @ts-ignore
import * as images from '../../../assets/images/*.*';

class ParticleScene {

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
    this.container = container;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = color;


    // Camera
    this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        2,
        5000
    );

    this.scene.add(this.camera);
    this.camera.position.set(0,200,400);
    this.camera.lookAt(this.scene.position);


    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Add resize listener
    window.addEventListener('resize', (e) => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Stats
    this.stats = Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.bottom = '0px';
    this.stats.domElement.style.zIndex = '100';
    this.stats.domElement.style.removeProperty('top');

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Light
    let light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);

    this.scene.add(light);

    // Floor
    console.log(images['checkerboard'].jpg);
    let floorTexture = new THREE.TextureLoader().load(images['checkerboard'].jpg);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 10, 10 );
    let floorMaterial = new THREE.MeshBasicMaterial({ color: 0x444444, map: floorTexture, side: THREE.DoubleSide });
    let floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);

    floor.position.y = -10.5;
    floor.rotation.x = Math.PI / 2;

    this.scene.add(floor);

    // Skybox
    let skyBoxGeometry = new THREE.BoxGeometry( 4000, 4000, 4000 );
    let skyBoxMaterial = new THREE.MeshBasicMaterial( { color: color, side: THREE.BackSide } );
    let skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );

    this.scene.add(skyBox);
  }

  start() {
    // Add scene to dom
    this.domElement = this.renderer.domElement;
    this.container.current?.appendChild(this.domElement);

    // Add stats
    this.container.current?.appendChild( this.stats.domElement );

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

export default ParticleScene;
