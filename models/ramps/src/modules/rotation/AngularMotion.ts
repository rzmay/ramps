import * as THREE from 'three';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';

class AngularMotion extends RampsModule {
    angularVelocity: THREE.Vector3;

    angularAcceleration: THREE.Vector3;

    angularSpeed: number;

    constructor(
      angularVelocity: THREE.Vector3,
      angularAcceleration: THREE.Vector3,
      angularSpeed = 1,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.angularVelocity = angularVelocity;
      this.angularAcceleration = angularAcceleration;

      this.angularSpeed = angularSpeed;
    }

    influence(particle: Particle): void {
      particle.angularVelocity.addScaledVector(particle.angularAcceleration, this.clock.deltaTime);
      particle.rotation.addScaledVector(particle.angularVelocity, this.clock.deltaTime * particle.angularSpeed);
    }

    setup(particle: Particle): void {
      particle.angularVelocity = this.angularVelocity;
      particle.angularAcceleration = this.angularAcceleration;
      particle.angularSpeed = this.angularSpeed;
    }
}

export default AngularMotion;
