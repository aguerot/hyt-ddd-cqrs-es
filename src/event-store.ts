import { EventBase } from './events/event';

export interface IEventStore {
    get(id: string): EventBase[];

    save(id: string, events: EventBase[]);
}