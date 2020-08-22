import RampsClock from './RampsClock';
import Particle from './Particle';
import ParticleSystem from './ParticleSystem';

abstract class RampsModule {
  // Used to keep track of deltaTime (default to singleton)
  clock: RampsClock = RampsClock.singleton;

  constructor(clock: RampsClock | undefined = undefined) {
    this.clock = clock ?? this.clock;
  }

  // Used to update particles each frame
  influence(particle: Particle): void { /* pass */ }

  // Used to update particle system each frame
  influenceSystem(particleSystem: ParticleSystem): void { /* pass */ }

  // Used to set values on particle start
  setup(particle: Particle, particleSystem: ParticleSystem): void { /* pass */ }

  // Used to set values on particle system start
  setupSystem(particleSystem: ParticleSystem): void { /* pass */ }

  // Used to perform logic when a particle is destroyed
  onParticleDestroy(particle: Particle): void { /* pass */ }

  // Used to perform logic when a particle system is destroyed
  onSystemDestroy(particleSystem: ParticleSystem): void { /* pass */ }
}

export default RampsModule;
