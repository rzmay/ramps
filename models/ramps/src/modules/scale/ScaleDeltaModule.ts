import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import Vector3Curve from '../../helpers/Vector3Curve';

class ScaleDeltaModule extends RampsModule {
    scaleOverLife: Vector3Curve;

    constructor(
      scaleOverLife: Vector3Curve,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.scaleOverLife = scaleOverLife;
    }

    influence(particle: Particle): void {
      const time = ((this.clock.time * 1000) - particle.startTime) / particle.lifetime;

      particle.scale = this.scaleOverLife.evaluate(time);
    }

    setup(particle: Particle): void {
      // pass
    }
}

export default ScaleDeltaModule;
