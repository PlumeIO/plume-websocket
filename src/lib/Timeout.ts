export default class Timeout {
  readonly min: number;
  readonly callback: () => void;
  instance: NodeJS.Timeout | undefined;
  #startTime: number | undefined;

  constructor(callback: () => void, min: number) {
    this.callback = callback;
    this.min = min;
  }

  start() {
    if (this.instance === undefined) {
      this.instance = setTimeout(this.callback, this.millisec)
      this.#startTime = Date.now()
    }
  }

  stop() {
    if (this.instance) {
      clearTimeout(this.instance);
      this.instance = undefined;
      this.#startTime = undefined;
    }
  }

  restart() {
    if (this.instance) {
      this.stop();
      this.start();
    }
  }

  get startTime() {
    return this.#startTime
  }
  get elapsedTime() {
    if (this.startTime) {
      return this.startTime + Date.now();
    } else return undefined
  }

  get endTime() {
    if (this.startTime) {
      return this.startTime + this.millisec
    } else return undefined
  }

  get remainingTime() {
    if (this.endTime) {
      return this.endTime - Date.now();
    } else return undefined
  }

  get sec() {
    return this.min * 60
  }

  get millisec() {
    return this.sec * 1000;
  }
}
