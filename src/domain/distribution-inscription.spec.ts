import { expect } from "chai";
import { DistributionRegisteredEvent } from '../events/distributor-registered';
import { DistributionUnregisteredEvent } from '../events/distributor-unregistered';
import { InscriptionStartedEvent } from '../events/inscription-started-event';
import { DistributionInscription } from './distribution-inscription';
import { DistributionInscriptionId } from './distribution-inscription-id';

describe('DistributionInscription', () => {
    const date = new Date(2020, 12, 20);
    const email = 'email@inter.net';
    const id: DistributionInscriptionId = DistributionInscriptionId.create('1234');

    it('should have an id once started', () => {
        const distributionInscription = DistributionInscription.fromEvents([
            new InscriptionStartedEvent(id, date)
        ]);

        expect(distributionInscription.id.value).equal(id.value);
    });

    it('should not have an id if not started', () => {
        const distributionInscription = DistributionInscription.fromEvents([
        ]);

        expect(distributionInscription.id).undefined;
    });

    describe(InscriptionStartedEvent.name, () => {
        it(`should create ${InscriptionStartedEvent.name}`, () => {
            const newEvent = DistributionInscription.startInscription(date);
            const expectedEvent = new InscriptionStartedEvent(id, date);
            expect(newEvent.equals(expectedEvent)).to.be.true;
        });
    });


    describe(DistributionRegisteredEvent.name, () => {
        it(`should raise ${DistributionRegisteredEvent.name}`, () => {
            const distributionInscription = DistributionInscription.fromEvents([
                new InscriptionStartedEvent(id, date)
            ]);

            const expectedEvent = new DistributionRegisteredEvent(email);
            const newEvent = distributionInscription.registerDistribution(email);

            expect(newEvent.equals(expectedEvent)).to.be.true;
        });

        it(`should not raise ${DistributionRegisteredEvent.name} if not started`, () => {
            const distributionInscription = DistributionInscription.fromEvents([]);

            const newEvent = distributionInscription.registerDistribution(email);

            expect(newEvent).undefined;
        });

        it(`should not raise ${DistributionRegisteredEvent.name} if already registered`, () => {
            const distributionInscription = DistributionInscription.fromEvents([
                new InscriptionStartedEvent(id, date),
                new DistributionRegisteredEvent(email)
            ]);

            const newEvent = distributionInscription.registerDistribution(email);

            expect(newEvent).undefined;
        });
    });


    describe(`${DistributionUnregisteredEvent.name}`, () => {
        it(`should raise ${DistributionUnregisteredEvent.name}`, () => {

            // history
            const distributionInscription = DistributionInscription.fromEvents([
                new InscriptionStartedEvent(id, date),
                new DistributionRegisteredEvent(email),
            ]);

            const expectedEvent = new DistributionUnregisteredEvent(email);
            const newEvent = distributionInscription.unregisterDistribution(email);

            expect(newEvent.equals(expectedEvent)).to.be.true;
        });

        it(`should not raise ${DistributionUnregisteredEvent.name} if not started`, () => {

            // history
            const distributionInscription = DistributionInscription.fromEvents([
            ]);

            const newEvent = distributionInscription.unregisterDistribution(email);

            expect(newEvent).undefined;
        });

        it(`should not raise ${DistributionUnregisteredEvent.name} if not already registered`, () => {
            // history
            const distributionInscription = DistributionInscription.fromEvents([
                new InscriptionStartedEvent(id, date),
            ]);

            const newEvent = distributionInscription.unregisterDistribution(email);

            expect(newEvent).undefined;
        });
    });

});
