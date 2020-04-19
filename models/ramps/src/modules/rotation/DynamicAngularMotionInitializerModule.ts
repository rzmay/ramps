import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import ParticleSystem from '../../ParticleSystem';
import DynamicMotionInitializerModule from '../translation/DynamicMotionInitializerModule';
import { DynamicVector3Initializer } from '../../helpers/DynamicVector3Initializer';
import RandomBetweenConstants from "../../helpers/RandomBetweenConstants";
import RandomBetweenCurves from "../../helpers/RandomBetweenCurves";


class DynamicAngularMotionInitializerModule extends RampsModule {
    startAngularVelocity: DynamicVector3Initializer;
    startAngularAcceleration: DynamicVector3Initializer;

    startAngularSpeed: RandomBetweenConstants | RandomBetweenCurves;

    constructor(
      startAngularVelocity: DynamicVector3Initializer,
      startAngularAcceleration: DynamicVector3Initializer,
      startAngularSpeed: RandomBetweenConstants | RandomBetweenCurves,
      clock: RampsClock | undefined = undefined,
    ) {
      super(clock);

      this.startAngularVelocity = startAngularVelocity;
      this.startAngularAcceleration = startAngularAcceleration;
      this.startAngularSpeed = startAngularSpeed;
    }

    influence(particle: Particle): void {
      // pass
    }

    setup(particle: Particle, particleSystem: ParticleSystem): void {
      const time = ((this.clock.time - particleSystem.startTime) % particleSystem.duration) / particleSystem.duration;
      particle.angularVelocity = DynamicMotionInitializerModule.evaluateDynamicVector3Initializer(this.startAngularVelocity, time);
      particle.angularAcceleration = DynamicMotionInitializerModule.evaluateDynamicVector3Initializer(this.startAngularAcceleration, time);
      particle.angularSpeed = this.startAngularSpeed.evaluate(time);
    }
}

export default DynamicAngularMotionInitializerModule;
