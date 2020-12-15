import { expect } from "chai";
import { DistributionRegistered } from '../events/distributor-registered';
import { DistributionUnregistered } from '../events/distributor-unregistered';
import { InscriptionStarted } from '../events/inscription-started-event';
import { DistributionInscription } from './distribution-inscription';

describe('DistributionInscription', () => {
    const date = new Date(2020, 12, 20);
    const email = 'email@inter.net';

    describe(InscriptionStarted.name, () => {
        it(`should create ${InscriptionStarted.name}`, () => {
            const newEvent = DistributionInscription.startInscription(date);
            const expectedEvent = new InscriptionStarted(date);
            expect(newEvent.equals(expectedEvent)).to.be.true;
        });
    });


    describe(DistributionRegistered.name, () => {
        it(`should raise ${DistributionRegistered.name}`, () => {
            const distributionInscription = DistributionInscription.fromEvents([
                new InscriptionStarted(date)
            ]);

            const expectedEvent = new DistributionRegistered(email);
            const newEvent = distributionInscription.registerDistribution(email);

            expect(newEvent.equals(expectedEvent)).to.be.true;
        });

        it(`should not raise ${DistributionRegistered.name} if not started`, () => {
            const distributionInscription = DistributionInscription.fromEvents([]);

            const newEvent = distributionInscription.registerDistribution(email);

            expect(newEvent).undefined;
        });

        it(`should not raise ${DistributionRegistered.name} if already registered`, () => {
            const distributionInscription = DistributionInscription.fromEvents([
                new InscriptionStarted(date),
                new DistributionRegistered(email)
            ]);

            const newEvent = distributionInscription.registerDistribution(email);

            expect(newEvent).undefined;
        });
    });


    describe(`${DistributionUnregistered.name}`, () => {
        it(`should raise ${DistributionUnregistered.name}`, () => {

            // history
            const distributionInscription = DistributionInscription.fromEvents([
                new InscriptionStarted(date),
                new DistributionRegistered(email),
            ]);

            const expectedEvent = new DistributionUnregistered(email);
            const newEvent = distributionInscription.unregisterDistribution(email);

            expect(newEvent.equals(expectedEvent)).to.be.true;
        });

        it(`should not raise ${DistributionUnregistered.name} if not started`, () => {

            // history
            const distributionInscription = DistributionInscription.fromEvents([
            ]);

            const newEvent = distributionInscription.unregisterDistribution(email);

            expect(newEvent).undefined;
        });

        it(`should not raise ${DistributionUnregistered.name} if not already registered`, () => {
            // history
            const distributionInscription = DistributionInscription.fromEvents([
                new InscriptionStarted(date),
            ]);

            const newEvent = distributionInscription.unregisterDistribution(email);

            expect(newEvent).undefined;
        });
    });

});
