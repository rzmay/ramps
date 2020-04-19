import * as THREE from 'three';
import * as Curves from '../../../../curves';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';

class SpeedDeltaModule extends RampsModule {
    speedOverLife: Curves.FloatCurve;

    constructor(
      speedOverLife: Curves.FloatCurve,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.speedOverLife = speedOverLife;
    }

    influence(particle: Particle): void {
      const time = ((this.clock.time * 1000) - particle.startTime) / particle.lifetime;

      particle.speed = this.speedOverLife.evaluate(time);
    }

    setup(particle: Particle): void {
      particle.speed = this.speedOverLife.evaluate(0);
    }
}

export default SpeedDeltaModule;
