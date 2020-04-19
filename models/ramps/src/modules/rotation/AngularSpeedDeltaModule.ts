import * as THREE from 'three';
import * as Curves from '../../../../curves';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';

class AngularSpeedDeltaModule extends RampsModule {
    angularSpeedOverLife: Curves.FloatCurve;

    constructor(
      angularSpeedOverLife: Curves.FloatCurve,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.angularSpeedOverLife = angularSpeedOverLife;
    }

    influence(particle: Particle): void {
      const time = ((this.clock.time * 1000) - particle.startTime) / particle.lifetime;

      particle.angularSpeed = this.angularSpeedOverLife.evaluate(time);
    }

    setup(particle: Particle): void {
      particle.angularSpeed = this.angularSpeedOverLife.evaluate(0);
    }
}

export default AngularSpeedDeltaModule;
