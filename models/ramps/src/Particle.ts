import * as THREE from 'three';

class Particle {
    position: THREE.Vector3;
    rotation: THREE.Vector3;
    scale: THREE.Vector3;

    velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    angularVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    speed: number = 1;

    acceleration: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    angularAcceleration: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    angularSpeed: number = 1;

    color: THREE.Color;
    alpha: number;

    startTime: number;
    lifetime: number;

    constructor(
      position: THREE.Vector3,
      rotation: THREE.Vector3,
      scale: THREE.Vector3,
      color: THREE.Color,
      alpha: number,
      lifetime: number,
    ) {
      this.position = position;
      this.rotation = rotation;
      this.scale = scale;
      this.color = color;
      this.alpha = alpha;

      this.startTime = new Date().getTime();
      this.lifetime = lifetime;
    }
}

export default Particle;
