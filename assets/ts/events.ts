import { EventEmitter } from 'eventemitter3';

// https://basarat.gitbooks.io/typescript/docs/tips/singleton.html
export default class Events {

    private eventEmitter: EventEmitter;

    private static instance: Events;

    private constructor() {

        this.eventEmitter = new EventEmitter();
    }

    static getInstance() {
        if (!Events.instance) {
            Events.instance = new Events();
        }
        return Events.instance;
    }

    on(e: string, fn: EventEmitter.ListenerFn, ctx?: any): EventEmitter {

        return this.eventEmitter.on(e, fn, ctx);
    }

    off(e: string, fn?: EventEmitter.ListenerFn, ctx?: any, once?: boolean): EventEmitter {

        return this.eventEmitter.off(e, fn, ctx, once);
    }

    removeAllListeners(event?: string | symbol): EventEmitter {

        return this.eventEmitter.removeAllListeners(event);
    }

    emit(e: string, ...args: Array<any>): boolean {

        return this.eventEmitter.emit(e, ...args);
    }
}