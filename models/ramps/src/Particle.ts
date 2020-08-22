import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';

class Particle {
    position: THREE.Vector3;
    rotation: THREE.Vector3;
    scale: THREE.Vector3;

    velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    angularVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    speed = 1;

    acceleration: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    angularAcceleration: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    angularSpeed = 1;

    color: THREE.Color;
    alpha: number;

    startTime: number;
    lifetime: number;

    id: string;

    constructor(
      position: THREE.Vector3,
      rotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
      scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1),
      color: THREE.Color = new THREE.Color(0xffffff),
      alpha = 1,
      lifetime = 5,
    ) {
      this.position = position;
      this.rotation = rotation;
      this.scale = scale;
      this.color = color;
      this.alpha = alpha;

      this.startTime = new Date().getTime() / 1000;
      this.lifetime = lifetime;

      this.id = uuidv4();
    }
}

export default Particle;
