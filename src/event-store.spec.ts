import { expect } from "chai";
import { IEventStore } from './event-store';
import { InmemoryEventStore } from './inmemory-event-store';
import { InscriptionStartedEvent }  from './events/inscription-started-event';
import { DistributionRegisteredEvent } from './events/distributor-registered';
import { DistributionInscriptionId } from './domain/distribution-inscription-id';

describe(InmemoryEventStore.name, () => {
    let store: IEventStore;
    const id = DistributionInscriptionId.create('1234');
    const otherId = DistributionInscriptionId.create('6789');
    
    beforeEach(() => {
        store = new InmemoryEventStore([]);
    });

    it('should return empty event list for unknown id', () => {
        const events = store.get('unknown id');
        expect(events).length(0);
    });

    it('should return events for known id', () => {
        const events = [
            new InscriptionStartedEvent(id),
        ];

        store.save(id.value, events);

        const result = store.get(id.value);

        expect(result).length(events.length);
    });

    it('should return only events for given id', () => {
        const events = [
            new InscriptionStartedEvent(id),
        ];

        const otherEvents = [
            new InscriptionStartedEvent(otherId),
            new DistributionRegisteredEvent(otherId, 'email@inter.net'),
        ];

        store.save(id.value, events);
        store.save(otherId.value, otherEvents);
        const result = store.get(id.value);

        expect(result).length(1);
    });
});