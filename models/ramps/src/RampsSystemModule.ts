import RampsClock from './RampsClock';
import ParticleSystem from './ParticleSystem';

abstract class RampsSystemModule {
    // Used to keep track of deltaTime (default to singleton)
    clock: RampsClock = RampsClock.singleton;

    constructor(clock: RampsClock | undefined = undefined) {
      this.clock = clock ?? this.clock;
    }

    // Used to set values or execute code on particle system start
    abstract setup(particleSystem: ParticleSystem): void;

    // Used to update particles each frame
    abstract influence(particleSystem: ParticleSystem): void;
}

export default RampsSystemModule;
