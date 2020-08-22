import * as THREE from 'three';
import * as Curves from '../../../../curves';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import TimeConversions from '../../helpers/TimeConversions';

class AngularSpeedDelta extends RampsModule {
    angularSpeedOverLife: Curves.Curve<number>;

    constructor(
      angularSpeedOverLife: Curves.Curve<number>,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.angularSpeedOverLife = angularSpeedOverLife;
    }

    influence(particle: Particle): void {
      const time = TimeConversions.PercentCompletedParticleLife(this.clock.time, particle);

      particle.angularSpeed = this.angularSpeedOverLife.evaluate(time);
    }

    setup(particle: Particle): void {
      particle.angularSpeed = this.angularSpeedOverLife.evaluate(0);
    }
}

export default AngularSpeedDelta;
