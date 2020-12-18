import { expect } from "chai";
import { DistributionInscriptionId } from './domain/distribution-inscription-id';
import { EventBus } from './event-bus';
import { EventBase }  from './events/event';
import { DistributionRegisteredEvent } from './events/distributor-registered';
import {IEventHandler} from './readmodel/event-handler';
import { InmemoryEventStore } from './inmemory-event-store';
import { IEventStore } from './event-store';

const email = 'email@inter.net';
const id: DistributionInscriptionId = DistributionInscriptionId.create('1234');

describe(EventBus.name, () => {
    class MockReadModel implements IEventHandler {
        called = false;
        handle(event: EventBase) {
            this.called = true;
        }
    }

    let eventStore: IEventStore;
    let eventBus: EventBus;

    beforeEach(() => {
        eventStore = new InmemoryEventStore([]);
        eventBus = new EventBus(eventStore);
    });

    it('should store events', () => {
        eventBus.publish(id.value, [
            new DistributionRegisteredEvent(id, email)
        ]);

        expect(eventStore.get(id.value).length).equal(1);
    });

    it('should call handlers', () => {

        const mockReadModel = new MockReadModel();
        eventBus.subscribe(mockReadModel);

        eventBus.publish(id.value, [
            new DistributionRegisteredEvent(id, email)
        ]);

        expect(mockReadModel.called).to.be.true;
    });
});