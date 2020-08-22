import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import Vector3Curve from '../../helpers/Vector3Curve';
import TimeConversions from '../../helpers/TimeConversions';

class ScaleDelta extends RampsModule {
    scaleOverLife: Vector3Curve;

    constructor(
      scaleOverLife: Vector3Curve,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.scaleOverLife = scaleOverLife;
    }

    influence(particle: Particle): void {
      const time = TimeConversions.PercentCompletedParticleLife(this.clock.time, particle);

      particle.scale = this.scaleOverLife.evaluate(time);
    }

    setup(particle: Particle): void {
      // pass
    }
}

export default ScaleDelta;
