import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import RandomBetweenConstants from '../../helpers/RandomBetweenConstants';
import RandomBetweenCurves from '../../helpers/RandomBetweenCurves';
import ParticleSystem from '../../ParticleSystem';
import TimeConversions from '../../helpers/TimeConversions';

class DynamicLifetimeInitializer extends RampsModule {
    startLifetime: RandomBetweenConstants | RandomBetweenCurves;

    constructor(
      startLifetime: RandomBetweenConstants | RandomBetweenCurves,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.startLifetime = startLifetime;
    }

    influence(particle: Particle): void {
      // pass
    }

    setup(particle: Particle, particleSystem: ParticleSystem): void {
      const time = TimeConversions.PercentCompletedParticleSystem(this.clock.time, particleSystem);
      particle.lifetime = this.startLifetime.evaluate(time);
    }
}

export default DynamicLifetimeInitializer;
