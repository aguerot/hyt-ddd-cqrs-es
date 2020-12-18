import { IEventStore } from './event-store';
import { EventBase } from './events/event';
import { IEventHandler } from './readmodel/event-handler';

export class EventBus {
    private _handlers: IEventHandler[] = [];

    constructor(private _eventstore: IEventStore) {

    }

    publish(id: string, events: EventBase[]) {
        this._eventstore.save(id, events);

        events.forEach(e => {
            this._handlers.forEach(h => {
                h.handle(e);
            });
        });
    }

    subscribe(handler: IEventHandler) {
        this._handlers.push(handler);
    }
}