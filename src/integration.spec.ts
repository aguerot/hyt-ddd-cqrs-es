import { expect } from "chai";
import { DistributionInscription } from './domain/distribution-inscription';
import { DistributionInscriptionId } from './domain/distribution-inscription-id';
import { EventBus } from './event-bus';
import { EventBase } from './events/event'
import { DistributionEvents } from './events/events';
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
    let history: DistributionEvents[];

    beforeEach(() => {
        eventStore= [];
        eventBus = new EventBus(eventStore);
        distributorCounter = new DistributorCounter();
        distributorNames = new DistributorNames();
        eventBus.subscribe(distributorCounter);
        eventBus.subscribe(distributorNames);
        history = [];
    });
    
    it('should update counter and names readmodels after aggregate commands', () => {


        history.push(DistributionInscription.startInscription());
        history.push(DistributionInscription.fromEvents(history)
                        .registerDistribution(email));
        history.push(DistributionInscription.fromEvents(history)
                        .registerDistribution(email2));

        eventBus.publish(history);

        expect(distributorCounter.getCounter(id.value)).equal(2);
        expect(distributorNames.getNames(id.value)).length(2);
    });


});
