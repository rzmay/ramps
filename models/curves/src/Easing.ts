import Perlin from './helpers/Perlin';

class Easing {
  /* Static properties */
  static linear = Easing.polynomial(1);
  static quadratic = Easing.polynomial(2);
  static cubic = Easing.polynomial(3);
  static quartic = Easing.polynomial(4);
  static quintic = Easing.polynomial(5);

  static sinusoidal = new Easing((t) => 1 - Math.cos(t * Math.PI * 0.5));
  static halfSine = new Easing((t) => 0.5 * (1 - Math.cos(t * Math.PI)));

  static circular = new Easing((t) => 1 - Math.sqrt(1 - t ** 2));

  static elastic = new Easing((t) => {
    if (t === 0) {
      return 0;
    } else if (t === 1) {
      return 1;
    } else {
      return -(2 ** (10 * (t - 1))) * Math.sin((t - 1.1) * 5 * Math.PI);
    }
  });

  /* Properties */
  in: (t: number)=>number;

  /* Methods */
  constructor(inFunction: (t: number)=>number) {
    this.in = inFunction;
  }

  out(t: number): number {
    return -this.in(-t + 1) + 1;
  }

  inOut(t: number) {
    return t < 0.5 ? (0.5 * this.in(t * 2)) : (0.5 * this.out((t - 0.5) * 2) + 0.5);
  }

  inverse(): Easing {
    return new Easing((t: number) => this.out(t));
  }

  /* Static methods */
  static interpolate(inFunction: Easing, outFunction: Easing, t: number, smoothing: number = 0.25) {
    let smoothEasing = Easing.polynomial(1/smoothing);
    let easedTime = Easing.inOut(smoothEasing, smoothEasing, t);
    return ((outFunction.inOut(t) * easedTime) + (inFunction.inOut(t) * (1 - easedTime)));
  }

  static inOut(inFunction: Easing, outFunction: Easing, t: number): number {
    return t < 0.5 ? (0.5 * inFunction.in(t * 2)) : (0.5 * outFunction.out((t - 0.5) * 2) + 0.5);
  }

  static polynomial(degree: number = 2): Easing {
    return new Easing((t) => t ** degree);
  }

  static exponential(base: number = 1024): Easing {
    return new Easing((t) => (t === 0 ? 0 : base ** (t - 1)));
  }

  static back(intensity: number = 1.70158): Easing {
    return new Easing((t) => (t ** 2) * ((intensity + 1) * t - intensity));
  }

  static stepped(steps: number = 3): Easing {
    // eslint-disable-next-line no-bitwise
    return new Easing((t) => ((t * steps) | 0) / steps);
  }

  static wiggle(amplitude: number = 0.1, waves: number = 3) {
    return new Easing((t) => t + Math.sin(t * Math.PI * 2 * Math.ceil(waves)) * amplitude);
  }

  static noise(amplitude: number = 0.1, frequency: number = 1, margin = 0.1, seed: number = 0) {
    const perlin = new Perlin(seed);
    return new Easing((t) => {
      let multiplier = 1;
      if (t < margin) {
        multiplier = t / margin;
      } else if (t > (1 - margin)) {
        multiplier = (t - (1 - margin)) / margin;
      }

      return t + (perlin.noise(t * frequency, 0, 0) * amplitude * multiplier) - (0.5 * amplitude * multiplier);
    });
  }
}

export default Easing;
