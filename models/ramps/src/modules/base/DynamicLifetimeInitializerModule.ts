import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import RandomBetweenConstants from '../../helpers/RandomBetweenConstants';
import RandomBetweenCurves from '../../helpers/RandomBetweenCurves';
import ParticleSystem from '../../ParticleSystem';

class DynamicLifetimeInitializerModule extends RampsModule {
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
      const time = ((this.clock.time - particleSystem.startTime) % particleSystem.duration) / particleSystem.duration;
      particle.lifetime = this.startLifetime.evaluate(time);
    }
}

export default DynamicLifetimeInitializerModule;
