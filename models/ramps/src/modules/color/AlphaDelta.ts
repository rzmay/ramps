import * as THREE from 'three';
import * as Curves from '../../../../curves';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import TimeConversions from '../../helpers/TimeConversions';

class AlphaDelta extends RampsModule {
    alphaOverLife: Curves.Curve<number>;

    constructor(
      alphaOverLife: Curves.Curve<number>,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.alphaOverLife = alphaOverLife;
    }

    influence(particle: Particle): void {
      const time = TimeConversions.PercentCompletedParticleLife(this.clock.time, particle);

      particle.alpha = this.alphaOverLife.evaluate(time);
    }
}

export default AlphaDelta;
