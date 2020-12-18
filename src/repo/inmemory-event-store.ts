import { DistributionInscriptionId } from '../domain/distribution-inscription-id';
import { IEventStore } from './event-store';
import { EventBase } from '../events/event';
type Stream = { id: string, events: EventBase[] };

export class InmemoryEventStore implements IEventStore {
    private _store: { [id: string]: EventBase[] } = {};

    constructor(stream: Stream[] = []) {
        stream.map(s => this.save(s.id, s.events));
    }

    get(id: string): EventBase[] {
        return this._store[id] || [];
    }
    save(id: string, events: EventBase[]) {
        
        this._store[id] = [
            ...this.get(id),
            ...events
        ];

    }

}