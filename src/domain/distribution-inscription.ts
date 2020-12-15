
import { DistributionRegistered } from '../events/distributor-registered';
import { InscriptionStarted } from '../events/inscription-started-event';
import { Event } from '../events/event'
import { DistributionUnregistered } from '../events/distributor-unregistered';
import { DistributionInscriptionProjection } from './distribution-inscription-projection';
import { DistributionEvents } from '../events/events';

export class DistributionInscription {

    private _projection: DistributionInscriptionProjection;

    constructor(private events: DistributionEvents[]) {
        this._projection = DistributionInscriptionProjection.fromEvents(events);
    }

    registerDistribution(email: string) {
        if (!this._projection.started) {
            return;
        }

        if (this._projection.registeredNames.includes(email)) {
            return;
        }

        return new DistributionRegistered(email);
    }

    unregisterDistribution(email: string) {
        if (this._projection.registeredNames.every(e => e !== email)) {
            return;
        }

        return new DistributionUnregistered(email);
    }

    static startInscription(date: Date) {
        return new InscriptionStarted(date);
    }
}