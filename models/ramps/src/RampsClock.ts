class RampsClock {
    time: number;
    startTime: number;
    deltaTime: number;

    static singleton: RampsClock;

    private static _time: number;
    private static _startTime: number;
    private static _deltaTime: number;

    constructor() {
      this.startTime = new Date().getTime() / 1000;

      this.time = new Date().getTime() / 1000;
      this.deltaTime = 0;
    }

    update(): void {
      const time = new Date().getTime() / 1000;

      this.deltaTime = time - this.time;
      this.time = time;
    }

    static start(): void {
      if (this.singleton == null) this.singleton = new RampsClock();
    }

    static update(): void {
      this.start();
      this.singleton.update();
    }

    static get deltaTime() {
      this.start();
      return this.singleton.deltaTime;
    }

    static get time() {
      this.start();
      return this.singleton.time;
    }

    static get startTime() {
      this.start();
      return this.singleton.startTime;
    }
}

export default RampsClock;
