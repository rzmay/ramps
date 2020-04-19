import * as THREE from 'three';
import * as Curves from '../../../../curves';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';

class AlphaDeltaModule extends RampsModule {
    alphaOverLife: Curves.FloatCurve;

    constructor(
      alphaOverLife: Curves.FloatCurve,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.alphaOverLife = alphaOverLife;
    }

    influence(particle: Particle): void {
      const time = ((this.clock.time * 1000) - particle.startTime) / particle.lifetime;

      particle.alpha = this.alphaOverLife.evaluate(time);
    }

    setup(particle: Particle): void {
      // pass
    }
}

export default AlphaDeltaModule;
