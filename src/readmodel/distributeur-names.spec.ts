import { expect } from "chai";

import { DistributionInscriptionId } from '../domain/distribution-inscription-id';
import { DistributionRegisteredEvent } from '../events/distributor-registered';
import { DistributionUnregisteredEvent } from '../events/distributor-unregistered';
import { DistributorNames } from './distributeur-names';

const email = 'email@inter.net';
const id: DistributionInscriptionId = DistributionInscriptionId.create('1234');

describe(DistributorNames.name, () => {
    let readmodel: DistributorNames;
    const registerEvent = new DistributionRegisteredEvent(id, email);

    beforeEach(() => {
        readmodel = new DistributorNames();
    });

    it('should add name on register event', () => {
        readmodel.handle(registerEvent);

        expect(readmodel.getNames(id.value)).length(1);
    });

    it('should remove name on unregister event', () => {
        // set initial condition
        readmodel.handle(registerEvent);

        readmodel.handle(new DistributionUnregisteredEvent(id, email));

        expect(readmodel.getNames(id.value)).length(0);
    });
});