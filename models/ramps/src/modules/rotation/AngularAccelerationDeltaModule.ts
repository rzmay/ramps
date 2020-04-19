import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import Vector3Curve from '../../helpers/Vector3Curve';

class AngularAccelerationDeltaModule extends RampsModule {
    angularAccelerationOverLife: Vector3Curve;

    constructor(
      angularAccelerationOverLife: Vector3Curve,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.angularAccelerationOverLife = angularAccelerationOverLife;
    }

    influence(particle: Particle): void {
      const time = ((this.clock.time * 1000) - particle.startTime) / particle.lifetime;

      particle.angularAcceleration = this.angularAccelerationOverLife.evaluate(time);
      particle.angularVelocity.addScaledVector(particle.angularAcceleration, this.clock.deltaTime);
      particle.rotation.addScaledVector(particle.angularVelocity, this.clock.deltaTime * particle.angularSpeed);
    }

    setup(particle: Particle): void {
      particle.angularAcceleration = this.angularAccelerationOverLife.evaluate(0);
    }
}

export default AngularAccelerationDeltaModule;
