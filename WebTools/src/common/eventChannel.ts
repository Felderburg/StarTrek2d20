export enum EventIdentity {
  ShowPage,
  HistoryBack,
  UpdateCharacter,
}

export class EventChannel {
  private listeners: { [id: number]: Array<(arg?: unknown) => void> };

  constructor() {
    this.listeners = {};
  }

  signal<T>(id: EventIdentity, arg?: T) {
    const listeners = this.listeners[id];
    if (listeners && listeners.length > 0) {
      listeners.forEach((listen) => {
        listen(arg);
      });
    }
  }

  listen<T>(id: EventIdentity, handler: (arg?: T) => void) {
    const listeners = this.listeners[id];
    if (listeners) {
      listeners.push(handler as (arg?: unknown) => void);
    } else {
      this.listeners[id] = [handler as (arg?: unknown) => void];
    }
  }

  removeAllListeners() {
    this.listeners = {};
  }
}

export const Events = new EventChannel();
