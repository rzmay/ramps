import * as THREE from 'three';
import Particle from '../Particle';
import RampsModule from '../RampsModule';
import RampsClock from '../RampsClock';

class TranslationalMotionModule extends RampsModule {
    startVelocity: THREE.Vector3;

    startAcceleration: THREE.Vector3;

    constructor(
      velocity: THREE.Vector3,
      acceleration: THREE.Vector3,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.startVelocity = velocity;
      this.startAcceleration = acceleration;
    }

    influence(particle: Particle): void {
      particle.velocity.addScaledVector(particle.acceleration, this.clock.deltaTime);
      particle.position.addScaledVector(particle.velocity, this.clock.deltaTime);
    }

    setup(particle: Particle): void {
      particle.velocity = this.startVelocity;
      particle.acceleration = this.startAcceleration;
    }
}

export default TranslationalMotionModule;
