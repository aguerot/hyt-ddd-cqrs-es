import { expect } from "chai";

import { DistributionInscriptionId } from '../domain/distribution-inscription-id';
import { DistributionRegisteredEvent } from '../events/distributor-registered';
import { DistributionUnregisteredEvent } from '../events/distributor-unregistered';
import { DistributorNames } from './distributeur-names';

const email = 'email@inter.net';
const id: DistributionInscriptionId = DistributionInscriptionId.create('1234');

describe(DistributorNames.name, () => {
    it('should increment names', () => {
        const readmodel = new DistributorNames();
        const registerEvent = new DistributionRegisteredEvent(id, email);
        const beforeNames = readmodel.getNames(id.value);
        readmodel.handle(registerEvent);
        const afterNames = readmodel.getNames(id.value);
        expect(afterNames.length - beforeNames.length).equal(1);
    });
    
    it('should decrement names', () => {
        const readmodel = new DistributorNames();
        const registerEvent = new DistributionRegisteredEvent(id, email);
        const unregisterEvent = new DistributionUnregisteredEvent(id, email);
        readmodel.handle(registerEvent);

        const beforeNames = readmodel.getNames(id.value);
        readmodel.handle(unregisterEvent);
        const afterNames = readmodel.getNames(id.value);
    

        expect(afterNames.length - beforeNames.length).equal(-1);
    });
});