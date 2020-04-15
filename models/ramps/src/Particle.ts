import * as THREE from 'three';

class Particle {
    position: THREE.Vector3;
    rotation: THREE.Vector3;
    scale: THREE.Vector3;

    velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    angularVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    acceleration: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    angularAcceleration: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    color: THREE.Color;

    constructor(
      position: THREE.Vector3,
      rotation: THREE.Vector3,
      scale: THREE.Vector3,
      color: THREE.Color,
    ) {
      this.position = position;
      this.rotation = rotation;
      this.scale = scale;
      this.color = color;
    }
}

export default Particle;
