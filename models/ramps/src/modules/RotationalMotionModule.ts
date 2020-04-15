import * as THREE from 'three';
import Particle from '../Particle';
import RampsModule from '../RampsModule';
import RampsClock from '../RampsClock';

class RotationalMotionModule extends RampsModule {
    startAngularVelocity: THREE.Vector3;

    startAngularAcceleration: THREE.Vector3;

    constructor(
      angularVelocity: THREE.Vector3,
      angularAcceleration: THREE.Vector3,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.startAngularVelocity = angularVelocity;
      this.startAngularAcceleration = angularAcceleration;
    }

    influence(particle: Particle): void {
      particle.angularVelocity.addScaledVector(particle.acceleration, this.clock.deltaTime);
      particle.rotation.addScaledVector(particle.velocity, this.clock.deltaTime);
    }

    setup(particle: Particle): void {
      particle.angularVelocity = this.startAngularVelocity;
      particle.angularAcceleration = this.startAngularAcceleration;
    }
}

export default RotationalMotionModule;
