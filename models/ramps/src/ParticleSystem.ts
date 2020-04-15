import * as THREE from 'three';
import Particle from './Particle';

interface ParticleSystemSettings {
    duration: number | undefined;
    looping: boolean | undefined;
    lifetime: number | undefined;

    startRotation: THREE.Vector3 | undefined;
    startScale: THREE.Vector3 | undefined;
    startColor: THREE.Color | undefined;
    startAlpha: number | undefined;
}

class ParticleSystem {
    duration: number = 10;

    lifetime: number = 10;

    looping: boolean = true;

    startRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    startScale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);

    startColor: THREE.Color = new THREE.Color();

    startAlpha : number = 1.0;

    constructor(options: ParticleSystemSettings) {
      this.duration = options.duration ?? this.duration;
      this.lifetime = options.lifetime ?? this.lifetime;
      this.looping = options.looping ?? this.looping;

      this.startRotation = options.startRotation ?? this.startRotation;
      this.startScale = options.startScale ?? this.startScale;
      this.startColor = options.startColor ?? this.startColor;
      this.startAlpha = options.startAlpha ?? this.startAlpha;
    }
}

export default ParticleSystem;
