import * as THREE from 'three';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import ParticleSystem from '../../ParticleSystem';
import DynamicMotionInitializerModule from '../translation/DynamicMotionInitializerModule';
import { DynamicVector3Initializer } from '../../helpers/DynamicVector3Initializer';


class DynamicScaleInitializerModule extends RampsModule {
    startScale: DynamicVector3Initializer;

    constructor(
      startScale: DynamicVector3Initializer,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.startScale = startScale;
    }

    influence(particle: Particle): void {
      // pass
    }

    setup(particle: Particle, particleSystem: ParticleSystem): void {
      const time = ((this.clock.time - particleSystem.startTime) % particleSystem.duration) / particleSystem.duration;
      particle.velocity = DynamicMotionInitializerModule.evaluateDynamicVector3Initializer(this.startScale, time);
    }

    static evaluateDynamicVector3Initializer(initializer: DynamicVector3Initializer, time: number): THREE.Vector3 {
      return new THREE.Vector3(
        initializer.x.evaluate(time),
        initializer.y.evaluate(time),
        initializer.z.evaluate(time),
      );
    }
}

export default DynamicScaleInitializerModule;
