import * as THREE from 'three';
import * as Curves from '../../../../curves';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import TimeConversions from '../../helpers/TimeConversions';

class SpeedDelta extends RampsModule {
    speedOverLife: Curves.Curve<number>;

    constructor(
      speedOverLife: Curves.Curve<number>,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.speedOverLife = speedOverLife;
    }

    influence(particle: Particle): void {
      const time = TimeConversions.PercentCompletedParticleLife(this.clock.time, particle);

      particle.speed = this.speedOverLife.evaluate(time);
    }

    setup(particle: Particle): void {
      particle.speed = this.speedOverLife.evaluate(0);
    }
}

export default SpeedDelta;
