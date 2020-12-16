import { expect } from "chai";
import { DistributionInscription } from './domain/distribution-inscription';
import { DistributionInscriptionId } from './domain/distribution-inscription-id';
import { EventBus } from './event-bus';
import { EventBase } from './events/event'
import { DistributorCounter } from './readmodel/distributeur-counter';
import { DistributorNames } from './readmodel/distributeur-names';

const email = 'email@inter.net';
const email2 = 'email2@inter.net';
const id: DistributionInscriptionId = DistributionInscriptionId.create('1234');

describe('integration test', () => {

    let eventStore: EventBase[] ;
    let eventBus: EventBus;
    let distributorCounter: DistributorCounter;
    let distributorNames: DistributorNames;

    beforeEach(() => {
        eventStore= [];
        eventBus = new EventBus(eventStore);
        distributorCounter = new DistributorCounter();
        distributorNames = new DistributorNames();
    });
    
    it('should update readmodel after aggregate command', () => {
        eventBus.subscribe(distributorCounter);
        eventBus.subscribe(distributorNames);

        const startedEvent = DistributionInscription.startInscription();
        const registrationEvent = DistributionInscription.fromEvents([startedEvent])
                                    .registerDistribution(email);
        const registrationEvent2 = DistributionInscription.fromEvents([startedEvent, registrationEvent])
                                    .registerDistribution(email2);

        eventBus.publish([
            startedEvent,
            registrationEvent,
            registrationEvent2
        ]);

        expect(distributorCounter.getCounter(id.value)).equal(2);
        expect(distributorNames.getNames(id.value)).length(2);
    });


});