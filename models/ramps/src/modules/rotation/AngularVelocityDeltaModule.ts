import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import Vector3Curve from '../../helpers/Vector3Curve';

class AngularVelocityDeltaModule extends RampsModule {
    angularVelocityOverLife: Vector3Curve;

    constructor(
      angularVelocityOverLife: Vector3Curve,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.angularVelocityOverLife = angularVelocityOverLife;
    }

    influence(particle: Particle): void {
      const time = ((this.clock.time * 1000) - particle.startTime) / particle.lifetime;

      particle.angularVelocity = this.angularVelocityOverLife.evaluate(time);
      particle.rotation.addScaledVector(particle.angularVelocity, this.clock.deltaTime * particle.angularSpeed);
    }

    setup(particle: Particle): void {
      particle.angularVelocity = this.angularVelocityOverLife.evaluate(0);
    }
}

export default AngularVelocityDeltaModule;
