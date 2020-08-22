import * as THREE from 'three';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';

class TranslationalMotion extends RampsModule {
    startVelocity: THREE.Vector3;

    startAcceleration: THREE.Vector3;

    speed = 1;

    constructor(
      velocity: THREE.Vector3,
      acceleration: THREE.Vector3,
      speed = 1,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.startVelocity = velocity;
      this.startAcceleration = acceleration;
      this.speed = speed;
    }

    influence(particle: Particle): void {
      particle.velocity.addScaledVector(particle.acceleration, this.clock.deltaTime * particle.speed);
      particle.position.addScaledVector(particle.velocity, this.clock.deltaTime * particle.speed);
    }

    setup(particle: Particle): void {
      particle.speed = this.speed;
      particle.velocity = this.startVelocity;
      particle.acceleration = this.startAcceleration;
    }
}

export default TranslationalMotion;
