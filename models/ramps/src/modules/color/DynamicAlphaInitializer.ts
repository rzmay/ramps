import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import RandomBetweenConstants from '../../helpers/RandomBetweenConstants';
import RandomBetweenCurves from '../../helpers/RandomBetweenCurves';
import ParticleSystem from '../../ParticleSystem';
import TimeConversions from '../../helpers/TimeConversions';

class DynamicAlphaInitializer extends RampsModule {
    startAlpha: RandomBetweenConstants | RandomBetweenCurves;

    constructor(
      startAlpha: RandomBetweenConstants | RandomBetweenCurves,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.startAlpha = startAlpha;
    }

    influence(particle: Particle): void {
      // pass
    }

    setup(particle: Particle, particleSystem: ParticleSystem): void {
      const time = TimeConversions.PercentCompletedParticleSystem(this.clock.time, particleSystem);
      particle.lifetime = this.startAlpha.evaluate(time);
    }
}

export default DynamicAlphaInitializer;
