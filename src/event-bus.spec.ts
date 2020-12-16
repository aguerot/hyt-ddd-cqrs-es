import { expect } from "chai";
import { DistributionInscriptionId } from './domain/distribution-inscription-id';
import { DistributorNames } from './readmodel/distributeur-names';
import { EventBus } from './event-bus';
import { EventBase }  from './events/event';
import { DistributionRegisteredEvent } from './events/distributor-registered';
import {IEventHandler} from './readmodel/event-handler';

const email = 'email@inter.net';
const id: DistributionInscriptionId = DistributionInscriptionId.create('1234');

describe(EventBus.name, () => {
    class MockReadModel implements IEventHandler {
        called = false;
        handle(event: EventBase) {
            this.called = true;
        }
    }

    it('should store events', () => {
        const eventStore: EventBase[] = [];

        const eventBus = new EventBus(eventStore);

        eventBus.publish([
            new DistributionRegisteredEvent(id, email)
        ]);

        expect(eventStore.length).equal(1);
    });

    it('should call handlers', () => {
        const eventStore: EventBase[] = [];

        const eventBus = new EventBus(eventStore);

        const mockReadModel = new MockReadModel();
        eventBus.subscribe(mockReadModel);

        eventBus.publish([
            new DistributionRegisteredEvent(id, email)
        ]);

        expect(mockReadModel.called).to.be.true;
    });
});