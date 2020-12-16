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

    it('should increment counter', () => {
        const beforeCounter = readmodel.getCounter(id.value);
        readmodel.handle(registerEvent);
        const afterCounter = readmodel.getCounter(id.value);

        expect(afterCounter - beforeCounter).equal(1);
    });

    it('should decrement counter', () => {
        readmodel.handle(registerEvent);
        const beforeCounter = readmodel.getCounter(id.value);
        readmodel.handle(unregisterEvent);
        const afterCounter = readmodel.getCounter(id.value);

        expect(afterCounter - beforeCounter).equal(-1);
    });
});