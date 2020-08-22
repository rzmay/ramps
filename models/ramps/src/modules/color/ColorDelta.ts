import * as THREE from 'three';
import * as Curves from '../../../../curves';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import { RGBColor } from '../../../../curves/src/interfaces/RGBColor';
import TimeConversions from '../../helpers/TimeConversions';

class ColorDelta extends RampsModule {
    colorOverLife: Curves.Curve<RGBColor>;

    constructor(
      colorOverLife: Curves.Curve<RGBColor>,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.colorOverLife = colorOverLife;
    }

    influence(particle: Particle): void {
      const time = TimeConversions.PercentCompletedParticleLife(this.clock.time, particle);
      const color = this.colorOverLife.evaluate(time);

      particle.color = new THREE.Color(color.r, color.g, color.b);
    }
}

export default ColorDelta;
