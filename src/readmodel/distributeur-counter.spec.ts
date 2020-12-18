import { expect } from "chai";
import { DistributionInscriptionId } from '../domain/distribution-inscription-id';
import { DistributionRegisteredEvent } from '../events/distributor-registered';
import { DistributionUnregisteredEvent } from '../events/distributor-unregistered';
import { DistributorCounter } from './distributeur-counter';

describe('DistributionCounter', () => {
    const email = 'email@inter.net';
    const id: DistributionInscriptionId = DistributionInscriptionId.create('1234');
    let  readmodel: DistributorCounter;
    let  registerEvent: DistributionRegisteredEvent;
    let  unregisterEvent: DistributionUnregisteredEvent;

    beforeEach(() => {
        readmodel = new DistributorCounter();
        registerEvent = new DistributionRegisteredEvent(id, email);
        unregisterEvent = new DistributionUnregisteredEvent(id, email);
    });

    it('should increment counter on register event', () => {
        readmodel.handle(registerEvent);

        expect(readmodel.getCounter(id.value)).equal(1);
    });

    it('should decrement counter on unregister event', () => {
        // readmodel.handle(registerEvent);
        readmodel.handle(unregisterEvent);

        expect(readmodel.getCounter(id.value)).equal(-1);
    });
});