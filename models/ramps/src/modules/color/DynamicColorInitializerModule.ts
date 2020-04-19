import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import ParticleSystem from '../../ParticleSystem';
import RandomBetweenColors from '../../helpers/RandomBetweenColors';
import RandomBetweenColorCurves from '../../helpers/RandomBetweenColorCurves';

class DynamicColorInitializerModule extends RampsModule {
    startColor: RandomBetweenColors | RandomBetweenColorCurves;

    constructor(
      startColor: RandomBetweenColors | RandomBetweenColorCurves,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.startColor = startColor;
    }

    influence(particle: Particle): void {
      // pass
    }

    setup(particle: Particle, particleSystem: ParticleSystem): void {
      const time = ((this.clock.time - particleSystem.startTime) % particleSystem.duration) / particleSystem.duration;
      particle.color = this.startColor.evaluate(time);
    }
}

export default DynamicColorInitializerModule;
