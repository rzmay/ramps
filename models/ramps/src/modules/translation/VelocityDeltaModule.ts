import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import Vector3Curve from '../../helpers/Vector3Curve';

class VelocityDeltaModule extends RampsModule {
    velocityOverLife: Vector3Curve;

    constructor(
      velocityOverLife: Vector3Curve,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.velocityOverLife = velocityOverLife;
    }

    influence(particle: Particle): void {
      const time = ((this.clock.time * 1000) - particle.startTime) / particle.lifetime;

      particle.velocity = this.velocityOverLife.evaluate(time);
      particle.position.addScaledVector(particle.angularVelocity, this.clock.deltaTime * particle.speed);
    }

    setup(particle: Particle): void {
      particle.angularVelocity = this.velocityOverLife.evaluate(0);
    }
}

export default VelocityDeltaModule;
