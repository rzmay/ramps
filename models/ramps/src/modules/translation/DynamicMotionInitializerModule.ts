import * as THREE from 'three';
import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import ParticleSystem from '../../ParticleSystem';
import RandomBetweenConstants from '../../helpers/RandomBetweenConstants';
import RandomBetweenCurves from '../../helpers/RandomBetweenCurves';
import { DynamicVector3Initializer } from '../../helpers/DynamicVector3Initializer';


class DynamicMotionInitializerModule extends RampsModule {
    startVelocity: DynamicVector3Initializer;
    startAcceleration: DynamicVector3Initializer;

    startSpeed: RandomBetweenConstants | RandomBetweenCurves;

    constructor(
      startVelocity: DynamicVector3Initializer,
      startAcceleration: DynamicVector3Initializer,
      startSpeed: RandomBetweenConstants| RandomBetweenCurves,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.startVelocity = startVelocity;
      this.startAcceleration = startAcceleration;

      this.startSpeed = startSpeed;
    }

    influence(particle: Particle): void {
      // pass
    }

    setup(particle: Particle, particleSystem: ParticleSystem): void {
      const time = ((this.clock.time - particleSystem.startTime) % particleSystem.duration) / particleSystem.duration;
      particle.velocity = DynamicMotionInitializerModule.evaluateDynamicVector3Initializer(this.startVelocity, time);
      particle.acceleration = DynamicMotionInitializerModule.evaluateDynamicVector3Initializer(this.startAcceleration, time);
      particle.speed = this.startSpeed.evaluate(time);
    }

    static evaluateDynamicVector3Initializer(initializer: DynamicVector3Initializer, time: number): THREE.Vector3 {
      return new THREE.Vector3(
        initializer.x.evaluate(time),
        initializer.y.evaluate(time),
        initializer.z.evaluate(time),
      );
    }
}

export default DynamicMotionInitializerModule;
