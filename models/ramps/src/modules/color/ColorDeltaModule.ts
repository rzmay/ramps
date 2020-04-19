import * as THREE from 'three';
import * as Curves from '../../../../curves';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';

class ColorDeltaModule extends RampsModule {
    colorOverLife: Curves.ColorCurve;

    constructor(
      colorOverLife: Curves.ColorCurve,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.colorOverLife = colorOverLife;
    }

    influence(particle: Particle): void {
      const time = ((this.clock.time * 1000) - particle.startTime) / particle.lifetime;
      const color = this.colorOverLife.evaluate(time);

      particle.color = new THREE.Color(color.r, color.g, color.b);
    }

    setup(particle: Particle): void {
      // pass
    }
}

export default ColorDeltaModule;
