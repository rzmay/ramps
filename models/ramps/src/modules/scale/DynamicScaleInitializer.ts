import * as THREE from 'three';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import ParticleSystem from '../../ParticleSystem';
import DynamicMotionInitializer from '../translation/DynamicMotionInitializer';
import { DynamicVector3Initializer } from '../../helpers/DynamicVector3Initializer';
import TimeConversions from '../../helpers/TimeConversions';


class DynamicScaleInitializer extends RampsModule {
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
      const time = TimeConversions.PercentCompletedParticleSystem(this.clock.time, particleSystem);
      particle.velocity = DynamicMotionInitializer.evaluateDynamicVector3Initializer(this.startScale, time);
    }

    static evaluateDynamicVector3Initializer(initializer: DynamicVector3Initializer, time: number): THREE.Vector3 {
      return new THREE.Vector3(
        initializer.x.evaluate(time),
        initializer.y.evaluate(time),
        initializer.z.evaluate(time),
      );
    }
}

export default DynamicScaleInitializer;
