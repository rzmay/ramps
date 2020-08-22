import RampsModule from '../../RampsModule';
import EmissionShape from '../../components/EmissionShape';
import RampsClock from '../../RampsClock';
import ParticleSystem from '../../ParticleSystem';
import Particle from '../../Particle';
import TimeConversions from '../../helpers/TimeConversions';

type SpawnBurst = {time: number, count: number};

class Emission extends RampsModule {
    source: EmissionShape;
    rate: number;
    bursts: SpawnBurst[];

    private _lastSpawn: number;
    private _nextBurstIndex: number;

    constructor(
      source: EmissionShape = EmissionShape.Sphere,
      rate = 10,
      bursts: SpawnBurst[] = [],
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.source = source;
      this.rate = rate;
      this.bursts = bursts;

      this._lastSpawn = this.clock.time;
      this._nextBurstIndex = 0;
    }

    // Spawn new particles
    influenceSystem(particleSystem: ParticleSystem) {
      // rate
      if (this.clock.time - this._lastSpawn > (1 / this.rate)) {
        this._lastSpawn = this.clock.time;
        this._spawnParticle(particleSystem);
      }

      // bursts
      if (TimeConversions.PercentCompletedParticleSystem(this.clock.time, particleSystem) > this.bursts[this._nextBurstIndex].time) {
        for (let i = 0; i < this.bursts[this._nextBurstIndex].count; i += 1) {
          this._spawnParticle(particleSystem);
        }

        this._nextBurstIndex = (this._nextBurstIndex + 1) % this.bursts.length;
      }
    }

    private _spawnParticle(particleSystem: ParticleSystem) {
      const point = this.source.getPoint();
      const particle = new Particle(
        point.position,
        particleSystem.startRotation,
        particleSystem.startScale,
        particleSystem.startColor,
        particleSystem.startAlpha,
        particleSystem.lifetime,
      );
      particle.velocity = point.normal; // initialize velocity
      particleSystem.addParticle(particle);
    }
}

export default Emission;
