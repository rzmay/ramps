import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import Vector3Curve from '../../helpers/Vector3Curve';
import TimeConversions from '../../helpers/TimeConversions';

class AngularAccelerationDelta extends RampsModule {
    angularAccelerationOverLife: Vector3Curve;

    constructor(
      angularAccelerationOverLife: Vector3Curve,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.angularAccelerationOverLife = angularAccelerationOverLife;
    }

    influence(particle: Particle): void {
      const time = TimeConversions.PercentCompletedParticleLife(this.clock.time, particle);

      particle.angularAcceleration = this.angularAccelerationOverLife.evaluate(time);
      particle.angularVelocity.addScaledVector(particle.angularAcceleration, this.clock.deltaTime);
      particle.rotation.addScaledVector(particle.angularVelocity, this.clock.deltaTime * particle.angularSpeed);
    }

    setup(particle: Particle): void {
      particle.angularAcceleration = this.angularAccelerationOverLife.evaluate(0);
    }
}

export default AngularAccelerationDelta;
