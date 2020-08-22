import Particle from '../../Particle';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import ParticleSystem from '../../ParticleSystem';
import DynamicMotionInitializer from '../translation/DynamicMotionInitializer';
import { DynamicVector3Initializer } from '../../helpers/DynamicVector3Initializer';
import RandomBetweenConstants from '../../helpers/RandomBetweenConstants';
import RandomBetweenCurves from '../../helpers/RandomBetweenCurves';
import TimeConversions from '../../helpers/TimeConversions';


class DynamicAngularMotionInitializer extends RampsModule {
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
      const time = TimeConversions.PercentCompletedParticleSystem(this.clock.time, particleSystem);
      particle.angularVelocity = DynamicMotionInitializer.evaluateDynamicVector3Initializer(this.startAngularVelocity, time);
      particle.angularAcceleration = DynamicMotionInitializer.evaluateDynamicVector3Initializer(this.startAngularAcceleration, time);
      particle.angularSpeed = this.startAngularSpeed.evaluate(time);
    }
}

export default DynamicAngularMotionInitializer;
