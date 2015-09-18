import EventEmitter from 'events';

export default class Emitter extends EventEmitter {
  subscribe(event, cb) {
    this.on(event, cb);
    return {
      unsubscribe: () => {
        this.removeListener(event, cb);
      }
    };
  }
}
