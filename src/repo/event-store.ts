import { EventBase } from '../events/event';

export interface IEventStore {
    save(events: EventBase[]);
}