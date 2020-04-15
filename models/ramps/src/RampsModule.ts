import RampsClock from './RampsClock';
import Particle from './Particle';

abstract class RampsModule {
  // Used to keep track of deltaTime (default to singleton)
  clock: RampsClock = RampsClock.singleton;

  constructor(clock: RampsClock | undefined = undefined) {
    this.clock = clock ?? this.clock;
  }

  // Used to set values on particle start
  abstract setup(Particle): void;

  // Used to update particles each frame
  abstract influence(Particle): void;

  execute(particles: Particle[]) {
    particles.forEach((particle) => { this.influence(particle); });
  }
}

export default RampsModule;
