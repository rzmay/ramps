import * as THREE from 'three';
import Particle from './Particle';
import RampsModule from './RampsModule';

interface ParticleSystemSettings {
    duration?: number;
    looping?: boolean;
    lifetime?: number;

    startRotation?: THREE.Vector3;
    startScale?: THREE.Vector3;
    startColor?: THREE.Color;
    startAlpha?: number;
}

class ParticleSystem {
    duration = 10;
    lifetime = 10;
    looping = true;

    startRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    startScale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
    startColor: THREE.Color = new THREE.Color();

    startAlpha = 1.0;
    startTime: number;

    particles: Particle[] = [];
    modules: RampsModule[] = [];

    particleHash: { [id: string]: Particle } = {};

    constructor(options: ParticleSystemSettings) {
      this.duration = options.duration ?? this.duration;
      this.lifetime = options.lifetime ?? this.lifetime;
      this.looping = options.looping ?? this.looping;

      this.startRotation = options.startRotation ?? this.startRotation;
      this.startScale = options.startScale ?? this.startScale;
      this.startColor = options.startColor ?? this.startColor;
      this.startAlpha = options.startAlpha ?? this.startAlpha;

      this.startTime = new Date().getTime() / 1000;
    }

    start(): void {
      // Set up system
      this.modules.forEach((m) => m.setupSystem(this));
    }

    update(): void {
      // Update system & particles
      this.modules.forEach((m) => m.influenceSystem(this));
      this.modules.forEach((m) => this.particles.forEach((p) => m.influence(p)));
    }

    addParticle(particle: Particle): void {
      // Add particle to array and hash
      this.particles.push(particle);
      this.particleHash[particle.id] = particle;

      // Set up new particle
      this.modules.forEach((m) => this.particles.forEach((p) => m.setup(p, this)));
    }

    destroyParticle(particleId: Particle | string) {
      // Get definite id
      const id = (particleId instanceof Particle) ? (particleId as Particle).id : particleId;

      // Call particle destruction logic
      this.modules.forEach((m) => m.onParticleDestroy(this.particleHash[id]));

      // Remove particle from array and hash
      // @ts-ignore
      this.particleHash[id] = undefined;
      delete this.particleHash[id];
      this.particles.splice(this.particles.findIndex((p) => p.id !== id), 1);
    }
}

export default ParticleSystem;
