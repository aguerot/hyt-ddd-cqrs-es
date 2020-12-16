import { EventBase } from '../events/event';

export interface IEventHandler {
    handle(event: EventBase);
}