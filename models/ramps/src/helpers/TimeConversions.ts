import ParticleSystem from '../ParticleSystem';
import Particle from '../Particle';

class TimeConversions {
  static PercentCompletedParticleSystem(time: number, particleSystem: ParticleSystem) {
    return ((time - particleSystem.startTime) % particleSystem.duration) / particleSystem.duration;
  }

  static PercentCompletedParticleLife(time: number, particle: Particle) {
    return (time - particle.startTime) / particle.lifetime;
  }
}

export default TimeConversions;
